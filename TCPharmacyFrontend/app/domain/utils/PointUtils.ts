export class PoitUtils {
    private static pointsPerVND: number = 0.001;  // Tỷ lệ quy đổi điểm

    static calculatePoints(price: number): number {
        // Lấy phần nguyên của giá trị 
        return Math.floor(price * PoitUtils.pointsPerVND);
    }

    static calculatePrice(points: number): number {
        return points;
    }
}
