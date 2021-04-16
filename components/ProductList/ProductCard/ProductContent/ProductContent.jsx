import { makeStyles } from '@material-ui/core/styles';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { useMutation, gql } from '@apollo/client';
import { ADD_CART } from '../../../../lib/api';

const useStyles = makeStyles({
  content: {
    padding: '8px',
    textAlign: 'left'
  },
  title: {
    height: '32px'
  },
  priceRow: props => ({
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: props.inCart ? 'flex-end' : 'space-between',
    alignItems: 'center',
    marginTop: '16px',
    color: '#3f51b5'
  })
});

export default function ProductContent (props) {
  const { product, inCart } = props;
  const [addToCart, { data }] = useMutation(ADD_CART);
  console.log(data);
  console.log(inCart)
  const size = 25;
  const classes = useStyles(props);
  console.log(classes)
  return (
    <div className={classes.content}>
      <div className={classes.title}>
        {product.title}
      </div>
      <div className={classes.priceRow}>
        <span>${product.price}</span>
        {/* <span onClick={(addToCart({ variables: { productId: product.id } }))}> */}
        <span>
          <AddShoppingCartIcon fontSize="small" color="primary"/>
        </span>
      </div>
    </div>
  )
}
