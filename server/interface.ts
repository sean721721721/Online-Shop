export interface Cart {
  id: number;
  amount: number;
  productId: number;
}

export interface CartProduct extends Cart {
	__typename: string;
}

export interface CartItems {
	listCart: CartProduct[];
}

export interface Product {
  id: number;
  title: string;
  price: number;
  img: string;
}

export interface ProductType extends Product {
	__typename: string;
}

export interface ProductItems {
	listProduct: ProductType[];
}
