export class PoitUtils {
    private static pointsPerVND: number = 0.01;  // Tỷ lệ quy đổi điểm

    static calculatePoints(price: number): number {
        return price * PoitUtils.pointsPerVND;
    }
}
