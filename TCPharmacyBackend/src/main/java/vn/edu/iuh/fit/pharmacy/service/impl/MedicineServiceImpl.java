package vn.edu.iuh.fit.pharmacy.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import vn.edu.iuh.fit.pharmacy.POJOs.Brand;
import vn.edu.iuh.fit.pharmacy.POJOs.Category;
import vn.edu.iuh.fit.pharmacy.POJOs.Medicine;
import vn.edu.iuh.fit.pharmacy.POJOs.Tag;
import vn.edu.iuh.fit.pharmacy.exceptions.MedicineException;
import vn.edu.iuh.fit.pharmacy.mappers.MedicineMapper;
import vn.edu.iuh.fit.pharmacy.repositories.BrandRepository;
import vn.edu.iuh.fit.pharmacy.repositories.CategoryRepository;
import vn.edu.iuh.fit.pharmacy.repositories.MedicineRepository;
import vn.edu.iuh.fit.pharmacy.repositories.TagRepository;
import vn.edu.iuh.fit.pharmacy.service.MedicineService;
import vn.edu.iuh.fit.pharmacy.utils.FeatureEncoder;
import vn.edu.iuh.fit.pharmacy.utils.response.MedicineResponse;

import java.util.AbstractMap;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class MedicineServiceImpl implements MedicineService {
    @Autowired
    private MedicineRepository medicineRepository;
    @Autowired
    private MedicineMapper medicineMapper;
    @Override
    public MedicineResponse getMedicineById(Long medicineId) throws MedicineException {
        Medicine medicine = medicineRepository.findById(medicineId).orElse(null);
        if(medicine == null)
            throw new MedicineException("Thuốc không tồn tại.");
        return medicineMapper.toDto(medicine);
    }

    @Override
    public List<MedicineResponse> getMedicineByTagId(Long tagId) {
        List<Medicine> medicines = medicineRepository.findAllByTagId(tagId, PageRequest.of(0, 10)).getContent();
        return medicines.stream().map(medicine -> medicineMapper.toDto(medicine)).toList();
    }

    @Override
    public List<MedicineResponse> getMedicineByTags(List<Long> tagIds) {
        List<Medicine> medicines = medicineRepository.findAllByTagIds(tagIds, PageRequest.of(0, 10)).getContent();
        return medicines.stream().map(medicine -> medicineMapper.toDto(medicine)).toList();
    }

    @Override
    public List<MedicineResponse> getMedicineByCategoryId(Long categoryId, Integer page, Integer size){
        List<Medicine> medicines = medicineRepository.findByCategoryId(categoryId, PageRequest.of(page, size)).getContent();
        return medicines.stream().map(medicine -> medicineMapper.toDto(medicine)).toList();
    }

    @Override
    public List<MedicineResponse> getMedicineByMedicineName(String medicineName, Integer page, Integer size) {
        List<Medicine> medicines = medicineRepository.findByMedicineName(medicineName, PageRequest.of(page, size)).getContent();
        return medicines.stream().map(medicine -> medicineMapper.toDto(medicine)).toList();
    }
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private BrandRepository brandRepository;
    @Autowired
    private TagRepository tagRepository;
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
}
