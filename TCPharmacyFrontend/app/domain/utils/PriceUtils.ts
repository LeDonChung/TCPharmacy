export class PriceUtils {
    static formatPrice(price: number): string {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    static calculateSalePrice(price: number, discount: number): number {
        return price - (price * discount / 100);
    }
}