import { BrandModel } from "./BrandModel";
import { CategoryModel } from "./CategoryModel";
import { MedicineImageModel } from "./MedicineImageModel";
import { TagModel } from "./TagModel";

export class MedicineModel {
  id: number;
  price: number;
  init: string;
  specifications: string;
  desShort: string;
  name: string;
  star: number;
  reviews: number;
  discount: number;
  quantity: number;
  des: string;
  status: number;
  medicineImages: MedicineImageModel[];
  sku: string;
  slug: string;
  primaryImage: string;
  brand: BrandModel;
  tags: TagModel[];
  category: CategoryModel;
  constructor(id?: number, price?: number, init?: string, specifications?: string, desShort?: string, name?: string, star?: number, reviews?: number, discount?: number, quantity?: number, des?: string, status?: number, medicineImages?: MedicineImageModel[], sku?: string, slug?: string, primaryImage?: string, brand?: BrandModel, tags?: TagModel[], category?: CategoryModel) {
    
    this.id = id || 0;
    this.price = price || 0;
    this.init = init || '';
    this.specifications = specifications || '';
    this.desShort = desShort || '';
    this.name = name || '';
    this.star = star || 0;
    this.reviews = reviews || 0;
    this.discount = discount || 0;
    this.quantity = quantity || 0;
    this.des = des || '';
    this.status = status || 0;
    this.medicineImages = medicineImages || [];
    this.sku = sku || '';
    this.slug = slug || '';
    this.primaryImage = primaryImage || '';
    this.brand = brand || new BrandModel();
    this.tags = tags || [];
    this.category = category || new CategoryModel();
  }
}