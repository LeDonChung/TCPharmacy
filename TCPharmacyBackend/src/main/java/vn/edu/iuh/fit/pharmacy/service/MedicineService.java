package vn.edu.iuh.fit.pharmacy.service;

import vn.edu.iuh.fit.pharmacy.exceptions.MedicineException;
import vn.edu.iuh.fit.pharmacy.utils.response.MedicineResponse;

public interface MedicineService {
    MedicineResponse getMedicineById(Long medicineId) throws MedicineException;
}
