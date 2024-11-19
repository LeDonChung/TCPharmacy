package vn.edu.iuh.fit.pharmacy.api;

import com.google.gson.annotations.SerializedName;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.Map;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ThreadRunRequest {
    @SerializedName(value="assistant_id")
    private String assistantId;

    @SerializedName(value="tools")
    private List<Map<String, Object>> tools;
}
