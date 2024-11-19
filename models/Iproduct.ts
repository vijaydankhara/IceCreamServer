export interface IProduct {
  title: string;
  description: string;
  productImage: string[];
  discount: string;
  price: number;
  slashPrice: number;
  category: string;
  size: String[];
  color: String[];
  isDelete?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}