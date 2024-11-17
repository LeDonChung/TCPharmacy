package vn.edu.iuh.fit.pharmacy.service;

import org.apache.mahout.cf.taste.common.TasteException;
import vn.edu.iuh.fit.pharmacy.utils.response.MedicineResponse;

import java.io.IOException;
import java.util.List;

public interface RecommendService {
    public void buildModel() throws IOException;
    List<MedicineResponse> getRecommendations(List<Long> medicineIds);
    List<MedicineResponse> getTopRecommendationByUserId(Long userId, Integer top) throws IOException, TasteException;
}
