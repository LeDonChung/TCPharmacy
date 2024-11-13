package vn.edu.iuh.fit.pharmacy.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.edu.iuh.fit.pharmacy.POJOs.Medicine;
import vn.edu.iuh.fit.pharmacy.exceptions.MedicineException;
import vn.edu.iuh.fit.pharmacy.mappers.MedicineMapper;
import vn.edu.iuh.fit.pharmacy.repositories.MedicineRepository;
import vn.edu.iuh.fit.pharmacy.service.MedicineService;
import vn.edu.iuh.fit.pharmacy.utils.response.MedicineResponse;

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
}
