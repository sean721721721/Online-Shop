import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { useMutation } from '@apollo/client';
import { ADD_CART, LIST_CART, UPDATE_CART } from '../../../../lib/api';
import { useCartContext } from '../../../../contexts';
import { Product } from 'server/interface';

const useStyles = makeStyles({
  content: props => ({
    flex: props.inCart ? 2 : '',
    display: 'flex',
    textAlign: 'left',
    flexFlow: 'column',
    justifyContent: 'space-between',
    overflow: 'hidden'
  }),
  title: props => ({
    lineHeight: '1.3em',
    maxHeight: '3.9em',
    overflow: 'hidden',
    paddingLeft: props.inCart ? '0' : '8px'
  }),
  priceRow: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-around',
    fontSize: '22px',
    alignItems: 'center',
    marginTop: '16px',
    marginRight: '0px',
    marginBottom: '8px',
    color: '#3f51b5',
    '& > div': {
      flex: 2,
      display: 'flex',
      justifyContent: 'center'
    },
    '& > div:nth-child(3)': {
      flex: 1
    }
  },
  amountDiv: {
    display: 'flex',
    color: 'grey',
    columnGap: '4px',
    alignItems: 'center',
    '& > div': {
      display: 'flex',
      alignItems: 'center'
    }
  },
  iconButtom: {
    padding: '4px'
  }
});

interface ProductContentProps {
  product: Product,
  inCart: Boolean,
  amount: number,
  cartId: string,
}

export default function ProductContent (props: ProductContentProps) {
  const { product, inCart, amount, cartId } = props;
  const [addToCart] = useMutation(ADD_CART);
  const [updateCartItem] = useMutation(UPDATE_CART);
  const cartItems = useCartContext();
  const cartItem = cartItems && cartItems.find(
    item => item.productId === product.id);
  function updateCart (type) {
    switch (type) {
      case 'plus':
        updateCartItem({
          variables: { id: cartId, amount: amount + 1 }
        });
        break;
      case 'minus':
        updateCartItem({
          variables: { id: cartId, amount: amount - 1 },
          refetchQueries: [{ query: LIST_CART }]
        });
        break;
      case 'delete':
        updateCartItem({
          variables: { id: cartId, amount: 0 },
          refetchQueries: [{ query: LIST_CART }]
        });
        break;
      case 'add':
        if (cartItem && cartItem.amount) {
          updateCartItem({
            variables: { id: cartItem.id, amount: cartItem.amount + 1 }
          });
        } else {
          addToCart({
            variables: { productId: product.id, amount: 1 },
            refetchQueries: [{ query: LIST_CART }]
          })
        }
        break;
      default:
        break;
    }
  }

  const classes = useStyles(props);
  const amountDiv = amount
    ? <div className={classes.amountDiv}>
        <div>
          <IconButton
            color="default"
            className={classes.iconButtom}
            aria-label="delete"
            onClick={() => updateCart('minus')}>
            <RemoveIcon/>
          </IconButton>
        </div>
        <div>{amount}</div>
        <div>
          <IconButton
            color="default"
            className={classes.iconButtom}
            aria-label="delete"
            onClick={() => updateCart('plus')}>
            <AddIcon/>
          </IconButton>
        </div>
      </div>
    : '';
  const showAddOrDeleteIcon = inCart
    ? <IconButton
        className={classes.iconButtom}
        aria-label="delete"
        onClick={() => updateCart('delete')}>
        <DeleteForeverIcon color="disabled"/>
      </IconButton>
    : <Fab
        color="primary"
        size="small"
        onClick={() => updateCart('add')}>
        <AddShoppingCartIcon fontSize="small" color="inherit"/>
      </Fab>

  return (
    <div className={classes.content}>
      <div className={classes.title}>
        {product.title}
      </div>
      <div className={classes.priceRow}>
        <div>${product.price}</div>
        {amountDiv}
        <div>
          {showAddOrDeleteIcon}
        </div>
      </div>
    </div>
  )
}
