import { createContext, useContext, useState, useEffect, ReactNode, Dispatch, SetStateAction } from 'react';
import { useQuery } from '@apollo/client';
import { LIST_CART, LIST_PRODUCT } from '../lib/api';
import { sliceProductsBy } from '../lib/helper';
import { AMOUNT_OF_SHOWING_PRODUCTS } from '../lib/constants';
import { Cart, Product } from '../server/interface';

const AppContext = createContext({});

interface wrapperProps {
	children: ReactNode;
}

interface cartProduct extends Cart {
	__typename: string;
}

interface cartItems {
	listCart: cartProduct[];
}

interface productItem extends Product {
	__typename: string;
}

interface loading {
	isLoading: boolean;
	setIsLoading: Dispatch<SetStateAction<boolean>>;
}

interface appContext {
	cartItems?: cartItems;
	productItems?: { listProduct: productItem[] };
	loading?: loading;
}

export function AppWrapper(props: wrapperProps) {
	const { children } = props;
	console.log(children);
	const { data: cartItems } = useQuery(LIST_CART);
	const { data: productItems } = useQuery(LIST_PRODUCT);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const loading = { isLoading, setIsLoading };

	useEffect(() => {
		setIsLoading(false);
	}, [cartItems]);

	if (!productItems || !cartItems) {
		return <div />;
	}
	return <AppContext.Provider value={{ cartItems, productItems, loading }}>{children}</AppContext.Provider>;
}

export function useCartContext() {
	const appContext: appContext = useContext(AppContext);
	if (!appContext.cartItems) {
		return [];
	}
	console.log(appContext);
	console.log(appContext.cartItems);
	return appContext.cartItems.listCart;
}

export function useProductContext() {
	const appContext: appContext = useContext(AppContext);
	const { productItems } = appContext;
	if (!productItems || !productItems.listProduct) return [];
	const slicebProduct = sliceProductsBy(productItems.listProduct, AMOUNT_OF_SHOWING_PRODUCTS);
	return slicebProduct;
}

export function useLoadingContext() {
	const appContext: appContext = useContext(AppContext);
	return appContext.loading;
}
