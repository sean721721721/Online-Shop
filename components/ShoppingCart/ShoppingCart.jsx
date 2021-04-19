import { makeStyles } from '@material-ui/core/styles';
import { useCartContext, useProductContext } from '../../contexts';
import ProductCard from '../ProductList/ProductCard/ProductCard';

const useStyles = makeStyles({
  shoppingCart: {
    marginTop: '56px',
    marginBottom: '56px',
    '& > div': {
      border: 'none',
      borderBottom: '.5px solid #ccc',
      padding: '8px'
    }
  }
});

export default function ShoppingCart (props) {
  // const cartItems = useCartContext();
  // const products = useProductContext();
  const { cartItems, products } = props;
  console.log('carItems: ', cartItems)
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
