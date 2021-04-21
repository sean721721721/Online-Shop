import { makeStyles } from '@material-ui/core/styles';
import PulseLoader from 'react-spinners/PulseLoader';
import ProductCard from '../ProductList/ProductCard/ProductCard';
import { Cart, Product } from '../../server/interface';
import { useLoadingContext } from '../../contexts';

const useStyles = makeStyles({
  shoppingCart: {
    marginTop: '56px',
    marginBottom: '56px',
    '& > div': {
      border: 'none',
      borderBottom: '.5px solid #ccc',
      padding: '8px'
    }
  },
  loaderDiv: {
    position: 'fixed',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%,-50%)'
  }
});

interface ShoppingCartProps {
  cartItems: Cart[],
  products: Product[],
}

export default function ShoppingCart (props: ShoppingCartProps) {
  const { cartItems, products } = props;
  const { isLoading } = useLoadingContext();
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
        <div className={classes.loaderDiv}>
          <PulseLoader color={'gray'} loading={isLoading} size={36}/>
        </div>
        {ProductCards}
      </div>
  );
}
