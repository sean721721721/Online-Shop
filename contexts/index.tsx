import { createContext, useContext, useState, useEffect, Dispatch, SetStateAction, PropsWithChildren } from 'react';
import { useQuery } from '@apollo/client';
import { LIST_CART, LIST_PRODUCT } from '../lib/api';
import { sliceProductsBy } from '../lib/helper';
import { AMOUNT_OF_SHOWING_PRODUCTS } from '../lib/constants';
import { CartItems, ProductItems } from '../server/interface';

const AppContext = createContext({});

interface Loading {
	isLoading: boolean;
	setIsLoading: Dispatch<SetStateAction<boolean>>;
}

interface AppContext {
	cartItems?: CartItems;
	productItems?: ProductItems;
	loading?: Loading;
}

export function AppWrapper(props: PropsWithChildren<unknown>) {
	const { children } = props;
	const { data: cartItems } = useQuery<CartItems>(LIST_CART);
	const { data: productItems } = useQuery<ProductItems>(LIST_PRODUCT);
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
	const appContext: AppContext = useContext(AppContext);
	if (!appContext.cartItems) {
		return [];
	}
	return appContext.cartItems.listCart;
}

export function useProductContext() {
	const appContext: AppContext = useContext(AppContext);
	const { productItems } = appContext;
	if (!productItems || !productItems.listProduct) return [];
	const slicebProduct = sliceProductsBy(productItems.listProduct, AMOUNT_OF_SHOWING_PRODUCTS);
	return slicebProduct;
}

export function useLoadingContext() {
	const appContext: AppContext = useContext(AppContext);
	return appContext.loading;
}
