package vn.edu.iuh.fit.pharmacy.service.impl;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVPrinter;
import org.apache.mahout.cf.taste.common.TasteException;
import org.apache.mahout.cf.taste.impl.model.file.FileDataModel;
import org.apache.mahout.cf.taste.impl.neighborhood.NearestNUserNeighborhood;
import org.apache.mahout.cf.taste.impl.recommender.GenericItemBasedRecommender;
import org.apache.mahout.cf.taste.impl.recommender.GenericUserBasedRecommender;
import org.apache.mahout.cf.taste.impl.similarity.PearsonCorrelationSimilarity;
import org.apache.mahout.cf.taste.impl.similarity.TanimotoCoefficientSimilarity;
import org.apache.mahout.cf.taste.model.DataModel;
import org.apache.mahout.cf.taste.neighborhood.UserNeighborhood;
import org.apache.mahout.cf.taste.recommender.RecommendedItem;
import org.apache.mahout.cf.taste.similarity.ItemSimilarity;
import org.apache.mahout.cf.taste.similarity.UserSimilarity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.edu.iuh.fit.pharmacy.POJOs.*;
import vn.edu.iuh.fit.pharmacy.mappers.MedicineMapper;
import vn.edu.iuh.fit.pharmacy.repositories.*;
import vn.edu.iuh.fit.pharmacy.service.RecommendService;
import vn.edu.iuh.fit.pharmacy.utils.FeatureEncoder;
import vn.edu.iuh.fit.pharmacy.utils.response.MedicineResponse;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class RecommendServiceImpl implements RecommendService {

    @Autowired
    private MedicineRepository medicineRepository;
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private BrandRepository brandRepository;
    @Autowired
    private TagRepository tagRepository;
    @Autowired
    private MedicineMapper medicineMapper;
    @Autowired
    private UserRepository userRepository;
    @Override
    public void buildModel() throws IOException {
        List<User> users = userRepository.findAll();
        File dir = new File("src/main/resources");
        if (!dir.exists()) {
            dir.mkdirs();
        }

        try (CSVPrinter csvPrinter = new CSVPrinter(new FileWriter("src/main/resources/rules.csv"), CSVFormat.DEFAULT)) {
            for (User user : users) {
                for (Medicine medicine : user.getLikes()) {
                    csvPrinter.printRecord(user.getId(), medicine.getId(), 1);
                }
            }
        } catch (IOException e) {
            throw new IOException("Error writing to CSV file", e);
        }
    }
    @Override
    public List<MedicineResponse> getRecommendations(List<Long> medicineIds) {
        // Lấy tất cả sản phẩm đã chọn từ DB
        List<Medicine> selectedProducts = medicineRepository.findAllById(medicineIds);

        // Lấy tất cả các sản phẩm, danh mục, thương hiệu và thẻ từ DB
        List<Medicine> allMedicines = medicineRepository.findAll();
        List<Category> allCategories = categoryRepository.findAll();
        List<Brand> allBrands = brandRepository.findAll();
        List<Tag> allTags = tagRepository.findAll();

        // Lấy tất cả các đặc trưng
        List<String> allCategoryTitles = allCategories.stream().map(Category::getTitle).toList();
        List<String> allBrandTitles = allBrands.stream().map(Brand::getTitle).toList();
        List<String> allTagTitles = allTags.stream().map(Tag::getTitle).toList();

        // Kết hợp tất cả các đặc trưng thành một danh sách chung
        List<String> allFeatures = new ArrayList<>();
        allFeatures.addAll(allCategoryTitles);
        allFeatures.addAll(allBrandTitles);
        allFeatures.addAll(allTagTitles);

        List<Medicine> recommendedProducts = new ArrayList<>();

        // Lặp qua danh sách các sản phẩm đã chọn
        for (Medicine selectedProduct : selectedProducts) {
            // Mã hóa sản phẩm đã chọn
            Map<String, Integer> encodedSelectedProduct = FeatureEncoder.encodeProduct(selectedProduct, allFeatures);

            // Lưu danh sách độ tương đồng
            List<Map.Entry<Medicine, Double>> similarityList = new ArrayList<>();

            // Lặp qua tất cả các sản phẩm khác
            for (Medicine product : allMedicines) {
                // Kiểm tra nếu không phải là sản phẩm đã chọn
                if (!product.getId().equals(selectedProduct.getId())) {
                    // Mã hóa sản phẩm khác
                    Map<String, Integer> encodedProduct = FeatureEncoder.encodeProduct(product, allFeatures);

                    // Tính toán độ tương đồng giữa sản phẩm đã chọn và sản phẩm khác
                    double similarity = FeatureEncoder.cosineSimilarity(encodedSelectedProduct, encodedProduct);

                    // Thêm vào danh sách độ tương đồng
                    similarityList.add(new AbstractMap.SimpleEntry<>(product, similarity));
                }
            }

            // Sắp xếp theo độ tương đồng giảm dần và lấy top 10
            similarityList.sort((entry1, entry2) -> Double.compare(entry2.getValue(), entry1.getValue()));

            // Lấy top 10 sản phẩm có độ tương đồng cao nhất
            int top = Math.min(10, similarityList.size());
            for (int i = 0; i < top; i++) {
                recommendedProducts.add(similarityList.get(i).getKey());
            }
        }

        // Trả về danh sách các sản phẩm gợi ý
        return recommendedProducts.stream().map(medicineMapper::toDto).collect(Collectors.toList());
    }

    @Override
    public List<MedicineResponse> getTopRecommendationByUserId(Long userId, Integer top) throws IOException, TasteException {
        DataModel model = new FileDataModel(new File("src/main/resources/rules.csv"));

        // Kiểm tra xem userId có tồn tại trong model hay không
        boolean userExists = false;
        Iterator<Long> userIterator = model.getUserIDs();
        while (userIterator.hasNext()) {
            if (userIterator.next().equals(userId)) {
                userExists = true;
                break;
            }
        }

        // Nếu userId không tồn tại trong model, trả về danh sách rỗng
        if (!userExists) {
            return new ArrayList<>(); // Trả về danh sách rỗng nếu không tìm thấy userId trong model
        }

        // User-based Collaborative Filtering
        UserSimilarity userSimilarity = new PearsonCorrelationSimilarity(model);
        UserNeighborhood neighborhood = new NearestNUserNeighborhood(5, userSimilarity, model);
        GenericUserBasedRecommender userBasedRecommender = new GenericUserBasedRecommender(model, neighborhood, userSimilarity);
        List<RecommendedItem> userBasedRecommendations = userBasedRecommender.recommend(userId, 20);

        // Item-based Collaborative Filtering
        ItemSimilarity itemSimilarity = new TanimotoCoefficientSimilarity(model);
        GenericItemBasedRecommender itemBasedRecommender = new GenericItemBasedRecommender(model, itemSimilarity);
        List<RecommendedItem> itemBasedRecommendations = itemBasedRecommender.recommend(userId, 20);

        // Kết hợp kết quả từ cả hai thuật toán
        Map<Long, Float> combinedRecommendations = new HashMap<>();

        for (RecommendedItem item : userBasedRecommendations) {
            combinedRecommendations.merge(item.getItemID(), item.getValue(), Float::sum);
        }

        for (RecommendedItem item : itemBasedRecommendations) {
            combinedRecommendations.merge(item.getItemID(), item.getValue(), Float::sum);
        }

        // Sắp xếp kết quả theo giá trị tổng hợp và lấy top N
        Set<Long> medicineIds = combinedRecommendations.entrySet()
                .stream()
                .sorted(Map.Entry.<Long, Float>comparingByValue().reversed())
                .limit(top)
                .map(Map.Entry::getKey)
                .collect(Collectors.toSet());

        return medicineRepository.findAllById(medicineIds).stream().map(medicineMapper::toDto).collect(Collectors.toList());
    }
}
