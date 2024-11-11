package vn.edu.iuh.fit.pharmacy;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;
import vn.edu.iuh.fit.pharmacy.POJOs.*;
import vn.edu.iuh.fit.pharmacy.api.*;
import vn.edu.iuh.fit.pharmacy.repositories.*;

import java.util.*;
import java.util.stream.Collectors;

@SpringBootTest
public class RenderTest {
    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private RoleRepository roleRepository;

    @Test
    public void renderRole() {
        List<Role> roles = new ArrayList<>();
        roles.add(Role.builder().code("ROLE_PATIENT").name("ROLE_PATIENT").build());
        roles.add(Role.builder().name("ROLE_DOCTOR").code("ROLE_DOCTOR").build());
        roles.add(Role.builder().code("ROLE_ADMIN").name("ROLE_ADMIN").build());

        roleRepository.saveAllAndFlush(roles);
    }

    @Autowired
    private TagGroupRepository tagGroupRepository;

    @Autowired
    private BrandRepository brandRepository;

    @Test
    public void renderBrand() {
        List<String> brands = List.of(
                "new-nordic",
                "jpanwell",
                "brauer",
                "Vitabiotics",
                "pro-mum",
                "nunest",
                "okamoto",
                "pearlie-white",
                "kamicare",
                "kingphar",
                "fuji",
                "duy-thanh",
                "nutrimed",
                "uright-facare",
                "decumar",
                "sagami",
                "agimexpharm",
                "janssen",
                "pharbaco",
                "bilim-ilac",
                "medicraft",
                "fixderma",
                "crevil",
                "la-beauty",
                "terrapharm",
                "medinova",
                "mega-we-care",
                "garnier",
                "stella-pharm"
        );


        List<BrandAPI> brandAPIS = new ArrayList<>();

        for (String brand : brands) {
            ResponseEntity<BrandAPI> response = restTemplate.getForEntity("https://nhathuoclongchau.com.vn/_next/data/4spj1LZ8XwtF7o1Jr_Lan/thuong-hieu/" + brand + ".json", BrandAPI.class);
            BrandAPI brandAPI = response.getBody();
            brandAPIS.add(brandAPI);
        }

        List<Brand> brandsToSave = brandAPIS.stream().map(brandAPI ->
                Brand.builder()
                        .title(brandAPI.pageProps.getInfoBrand().getBrand())
                        .image(brandAPI.pageProps.getInfoBrand().getLogoBrand())
                        .build()

        ).toList();


        brandRepository.saveAllAndFlush(brandsToSave);
    }

    @Test
    public void renderTag() {
        List<TagGroup> tagGroups = new ArrayList<>();

        // First TagGroup: "Đối tượng sử dụng"
        TagGroup group1 = TagGroup.builder()
                .groupName("Đối tượng sử dụng")
                .des("Đối tượng sử dụng")
                .build();

        List<Tag> tagsForGroup1 = new ArrayList<>();
        tagsForGroup1.add(Tag.builder().title("Trẻ em").des("Trẻ em").tagGroup(group1).build());
        tagsForGroup1.add(Tag.builder().title("Tất cả").des("Tất cả").tagGroup(group1).build());
        tagsForGroup1.add(Tag.builder().title("Phụ nữ có thai").des("Phụ nữ có thai").tagGroup(group1).build());
        tagsForGroup1.add(Tag.builder().title("Phụ nữ cho con bú").des("Phụ nữ cho con bú").tagGroup(group1).build());
        tagsForGroup1.add(Tag.builder().title("Người lớn").des("Người lớn").tagGroup(group1).build());
        tagsForGroup1.add(Tag.builder().title("Người trưởng thành").des("Người trưởng thành").tagGroup(group1).build());
        tagsForGroup1.add(Tag.builder().title("Người cao tuổi").des("Người cao tuổi").tagGroup(group1).build());

        group1.setTags(tagsForGroup1);
        tagGroups.add(group1);

        // Second TagGroup: "Gợi ý hôm nay"
        TagGroup group2 = TagGroup.builder()
                .groupName("Gợi ý hôm nay")
                .des("Gợi ý hôm nay")
                .build();

        List<Tag> tagsForGroup2 = new ArrayList<>();
        tagsForGroup2.add(Tag.builder().title("Đặc quyền").des("Đặc quyền").tagGroup(group2).build());
        tagsForGroup2.add(Tag.builder().title("Tìm kiếm nhiều").des("Tìm kiếm nhiều").tagGroup(group2).build());
        tagsForGroup2.add(Tag.builder().title("Sản phẩm mới").des("Sản phẩm mới").tagGroup(group2).build());
        tagsForGroup2.add(Tag.builder().title("Vitamin tổng hợp").des("Vitamin tổng hợp").tagGroup(group2).build());

        group2.setTags(tagsForGroup2);
        tagGroups.add(group2);

        tagGroupRepository.saveAllAndFlush(tagGroups);
    }

    @Test
    public void renderCategories() {

        ResponseEntity<ClazzAPI> response = restTemplate.getForEntity("https://nhathuoclongchau.com.vn/_next/data/4spj1LZ8XwtF7o1Jr_Lan/thuc-pham-chuc-nang/sinh-ly-noi-tiet-to.json?slug=thuc-pham-chuc-nang&slug=sinh-ly-noi-tiet-to", ClazzAPI.class);
        ClazzAPI clazzAPI = response.getBody();

        List<CategoryAPI> level01 = clazzAPI.getMasterLayoutDataProps().getMenu();

        List<CategoryAPI> level02 = new ArrayList<>();
        for (CategoryAPI categoryAPI : level01) {
            level02.addAll(categoryAPI.getChildren());
        }

        List<CategoryAPI> level03 = new ArrayList<>();
        for (CategoryAPI categoryAPI : level02) {
            if (categoryAPI.getChildren() != null)
                level03.addAll(categoryAPI.getChildren());
        }


        for (CategoryAPI categoryLevel01 : level01) {
            if (categoryLevel01.getImage() == null)
                continue;

            String image = categoryLevel01.getImage().getUrl();
            if (image == null) continue;

            Category category1 = Category.builder()
                    .title(categoryLevel01.getName())
                    .level(1)
                    .icon(image)
                    .fullPathSlug(categoryLevel01.getFullPathSlug())
                    .build();

            Category categoryNewLevel01 = categoryRepository.saveAndFlush(category1);

            if (categoryLevel01.getChildren() != null) {
                for (CategoryAPI categoryLevel02 : categoryLevel01.getChildren()) {
                    if (categoryLevel02.getImage() == null)
                        continue;

                    String image2 = categoryLevel02.getImage().getUrl();
                    if (image2 == null) continue;

                    Category category2 = Category.builder()
                            .title(categoryLevel02.getName())
                            .level(2)
                            .icon(image2)
                            .parent(categoryNewLevel01)
                            .fullPathSlug(categoryLevel02.getFullPathSlug())
                            .build();

                    Category categoryNewLevel02 = categoryRepository.saveAndFlush(category2);

                    if (categoryLevel02.getChildren() != null) {
                        for (CategoryAPI categoryLevel03 : categoryLevel02.getChildren()) {
                            if (categoryLevel03.getImage() == null)
                                continue;

                            String image3 = categoryLevel03.getImage().getUrl();
                            if (image3 == null) continue;

                            Category category3 = Category.builder()
                                    .title(categoryLevel03.getName())
                                    .level(3)
                                    .icon(image3)
                                    .parent(categoryNewLevel02)
                                    .fullPathSlug(categoryLevel03.getFullPathSlug())
                                    .build();

                            Category categoryNewLevel03 = categoryRepository.saveAndFlush(category3);
                        }
                    }
                }
            }

        }
    }

    @Test
    public void renderFix() {

        ResponseEntity<ClazzAPI> response = restTemplate.getForEntity("https://nhathuoclongchau.com.vn/_next/data/4spj1LZ8XwtF7o1Jr_Lan/thuc-pham-chuc-nang/sinh-ly-noi-tiet-to.json?slug=thuc-pham-chuc-nang&slug=sinh-ly-noi-tiet-to", ClazzAPI.class);
        ClazzAPI clazzAPI = response.getBody();

        List<CategoryAPI> level01 = clazzAPI.getMasterLayoutDataProps().getMenu();
        List<CategoryAPI> level02 = new ArrayList<>();
        for (CategoryAPI categoryAPI : level01) {
            level02.addAll(categoryAPI.getChildren());
        }
        List<CategoryAPI> level03 = new ArrayList<>();
        for (CategoryAPI categoryAPI : level02) {
            if (categoryAPI.getChildren() != null)
                level03.addAll(categoryAPI.getChildren());
        }
        List<CategoryAPI> result = new ArrayList<>(level01);
        result.addAll(level02);
        result.addAll(level03);

        for (CategoryAPI categoryAPI : result) {
            Category category = categoryRepository.findByFullPathSlug(categoryAPI.getFullPathSlug());
            if(category != null) {
                category.setIcon(categoryAPI.getImage().getUrl());
                categoryRepository.saveAndFlush(category);
            }
        }
    }

    @Autowired
    private MedicineRepository medicineRepository;

    @Autowired
    private TagRepository tagRepository;
    @Test public void renderMedicine01() {

        List<Category> categories = categoryRepository.findAll();
        categories = categories.stream().filter(category -> category.getId() > 128).toList();
        List<Brand> brands = brandRepository.findAll();

        List<Tag> tags = tagRepository.findAll();

        for (Category category : categories) {
            String url = "https://nhathuoclongchau.com.vn/_next/data/4spj1LZ8XwtF7o1Jr_Lan" + category.getFullPathSlug() + ".json";
            ResponseEntity<MedicineRootAPI> response = restTemplate.getForEntity(url, MedicineRootAPI.class);

            // CategoryAPI
            MedicineRootAPI clazzAPI = response.getBody();

            if (clazzAPI.getPageProps() != null && clazzAPI.getPageProps().getViewData() != null && clazzAPI.getPageProps().getViewData().getProducts() != null
                    && !clazzAPI.getPageProps().getViewData().getProducts().isEmpty()) {

                for (ProductAPI productAPI : clazzAPI.getPageProps().getViewData().getProducts()) {
                    String urlProduct = "https://nhathuoclongchau.com.vn/_next/data/4spj1LZ8XwtF7o1Jr_Lan/products/" + productAPI.getSlug() + ".json";
                    ResponseEntity<MedicineRootAPI> response2 = restTemplate.getForEntity(urlProduct, MedicineRootAPI.class);

                    MedicineRootAPI clazzAPIProduct = response2.getBody();

                    // ADD MEDICINE
                    if (clazzAPIProduct.getPageProps() != null && clazzAPIProduct.getPageProps().getProduct() != null) {
                        MedicineAPI medicineAPI = clazzAPIProduct.getPageProps().getProduct();
                        Optional<Medicine> medicineOptional = medicineRepository.findBySku(medicineAPI.getSku());
                        if (medicineOptional.isPresent()) {
                            continue;
                        }

                        Medicine medicine = Medicine.builder()
                                .category(category)
                                .sku(medicineAPI.getSku())
                                .des(medicineAPI.getDescription())
                                .desShort(medicineAPI.getShortDescription())
                                .primaryImage(medicineAPI.getPrimaryImage())
                                .status(1)
                                .specifications(medicineAPI.getSpecification())
                                .name(medicineAPI.getWebName())
                                .quantity(100)
                                .build();
                        // List Medical Image
                        List<MedicineImage> medicineImages = new ArrayList<>();
                        if (medicineAPI.getSecondaryImages() != null) {
                            for (String image : medicineAPI.getSecondaryImages()) {
                                MedicineImage medicineImage = MedicineImage.builder()
                                        .url(image)
                                        .medicine(medicine)
                                        .build();
                                medicineImages.add(medicineImage);
                            }
                        }

                        // Brand
                        int indexBrand = new Random().nextInt(brands.size());

                        medicine.setBrand(brands.get(indexBrand));

                        // Tags
                        int numberOfTags = new Random().nextInt(4) + 1;


                        Set<Tag> selectedTags = new HashSet<>();
                        for (int i = 0; i < numberOfTags; i++) {

                            int randomIndex = new Random().nextInt(tags.size());

                            selectedTags.add(tags.get(randomIndex));
                        }

                        // Discount
                        int discount = new Random().nextInt(70);

                        // Star
                        int star = new Random().nextInt(5);

                        // Review
                        int review = new Random().nextInt(100);


                        // Price
                        // Unit
                        if(!medicineAPI.getPrices().isEmpty()) {
                            PriceAPI priceAPI = medicineAPI.getPrices().get(0);
                            medicine.setInit(priceAPI.getMeasureUnitName());
                            medicine.setPrice(priceAPI.getPrice());
                        }


                        medicine.setReviews(review);
                        medicine.setStar(star);
                        medicine.setDiscount(discount);
                        medicine.setTags(selectedTags);
                        medicine.setMedicineImages(medicineImages);
                        medicineRepository.saveAndFlush(medicine);
                    }
                }
            }

            System.out.println("Done category: " + category.getId());
        }
    }

    @Test
    public void renderUsers() {

    }
}
