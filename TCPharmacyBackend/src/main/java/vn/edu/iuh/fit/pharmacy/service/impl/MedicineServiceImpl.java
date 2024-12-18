package vn.edu.iuh.fit.pharmacy.service.impl;

import org.apache.mahout.cf.taste.common.TasteException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import vn.edu.iuh.fit.pharmacy.POJOs.Medicine;
import vn.edu.iuh.fit.pharmacy.exceptions.MedicineException;
import vn.edu.iuh.fit.pharmacy.mappers.MedicineMapper;
import vn.edu.iuh.fit.pharmacy.repositories.MedicineRepository;
import vn.edu.iuh.fit.pharmacy.service.MedicineService;
import vn.edu.iuh.fit.pharmacy.service.RecommendService;
import vn.edu.iuh.fit.pharmacy.utils.response.MedicineResponse;

import java.io.IOException;
import java.util.List;

@Service
public class MedicineServiceImpl implements MedicineService {
    @Autowired
    private MedicineRepository medicineRepository;
    @Autowired
    private MedicineMapper medicineMapper;
    @Autowired
    private RecommendService recommendService;
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

    @Override
    public List<MedicineResponse> getRecommendations(List<Long> medicineIds) {
        return recommendService.getRecommendations(medicineIds);
    }

    @Override
    public List<MedicineResponse> getTopRecommendationByUserId(Long userId, Integer top) throws IOException, TasteException {
        return recommendService.getTopRecommendationByUserId(userId, top);
    }
}
