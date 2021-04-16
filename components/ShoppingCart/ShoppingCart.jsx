import { useCartContext, useProductContext } from '../../contexts';
import ProductCard from '../ProductList/ProductCard/ProductCard';

export default function ShoppingCart () {
  const cartItems = useCartContext();
  console.log(cartItems)
  if (!cartItems) {
    return <div/>
  }
  const products = useProductContext();
  console.log(products);
  const ProductContents = cartItems.map(item => {
    const inCartProduct = products.find(product => product.id === item.productId);
    return (
      <ProductCard key={inCartProduct.title} product={inCartProduct} inCart={true}/>
    )
  })
  return (
      <div className="shopping-cart">
        Shopping cart
        {ProductContents}
      </div>
  );
}
