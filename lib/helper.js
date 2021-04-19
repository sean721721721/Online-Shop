export function sliceProductsBy (products, amount) {
  const sortedProducts = sortProductById(products);
  const slicedProducts = sortedProducts.slice(0, amount);
  return slicedProducts;
}

function sortProductById (products) {
  const copyProducts = products.slice();
  return copyProducts.sort((a, b) => a.id - b.id);
}

export function totalPrice (cartItems, products) {
  if (!products || !cartItems || cartItems.length === 0) {
    return 0;
  }
  return cartItems.map(item => {
    const inCartProduct = products.find(
      product => product.id === item.productId);
    return inCartProduct.price * item.amount;
  }).reduce((prev, next) => prev + next, 0);
}
