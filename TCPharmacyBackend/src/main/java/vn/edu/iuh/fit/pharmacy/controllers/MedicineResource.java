package vn.edu.iuh.fit.pharmacy.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import vn.edu.iuh.fit.pharmacy.exceptions.MedicineException;
import vn.edu.iuh.fit.pharmacy.service.MedicineService;
import vn.edu.iuh.fit.pharmacy.utils.response.MedicineResponse;

@RestController
@RequestMapping("/medicines")
public class MedicineResource {
    @Autowired
    private MedicineService medicineService;

    @GetMapping("/{medicineId}")
    public ResponseEntity<MedicineResponse> getMedicineById(@PathVariable Long medicineId) throws MedicineException {
        return ResponseEntity.ok(
                medicineService.getMedicineById(medicineId)
        );
    }
}
