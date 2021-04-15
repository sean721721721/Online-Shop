export interface Cart {
	id: number;
	amount: number;
	productId: number;
}

export interface Product {
	id: number;
	title: string;
	price: number;
	img: string;
}