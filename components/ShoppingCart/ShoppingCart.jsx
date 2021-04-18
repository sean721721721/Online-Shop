import { makeStyles } from '@material-ui/core/styles';
import { useCartContext, useProductContext } from '../../contexts';
import ProductCard from '../ProductList/ProductCard/ProductCard';

const useStyles = makeStyles({
  shoppingCart: {
    marginTop: '56px',
    '& > div': {
      border: 'none',
      borderBottom: '.5px solid #ccc',
      padding: '8px 0px'
    }
  }
});

export default function ShoppingCart () {
  const cartItems = useCartContext();
  const products = useProductContext();
  console.log('carItems: ', cartItems)
  console.log('products: ', products)
  if (!cartItems || !products) {
    return <div/>
  }
  const ProductCards = cartItems.map(item => {
    const inCartProduct = products.find(product => product.id === item.productId);
    return (
      <ProductCard
        key={inCartProduct.title}
        product={inCartProduct}
        inCart={true}
        amount={item.amount}
        cartId={item.id}
      />
    )
  })

  const classes = useStyles();
  return (
      <div className={classes.shoppingCart}>
        {ProductCards}
      </div>
  );
}
