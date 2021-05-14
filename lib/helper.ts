import { CartProduct, ProductType } from 'server/interface';

export function sliceProductsBy (products: ProductType[], amount: number) {
  console.log(products, amount);
  const sortedProducts = sortProductById(products);
  const slicedProducts = sortedProducts.slice(0, amount);
  return slicedProducts;
}

function sortProductById (products: ProductType[]) {
  const copyProducts = products.slice();
  return copyProducts.sort((a, b) => a.id - b.id);
}

export function totalPrice (cartItems: CartProduct[], products: ProductType[]) {
  if (!products || !cartItems || cartItems.length === 0) {
    return 0;
  }
  return cartItems.map(item => {
    const inCartProduct = products.find(
      product => product.id === item.productId) || 0;
      const price = inCartProduct ? inCartProduct.price : 0;
    return price * item.amount;
  }).reduce((prev, next) => prev + next, 0);
}
