import { makeStyles } from '@material-ui/core/styles';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import AddBoxIcon from '@material-ui/icons/AddBox';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import { useMutation } from '@apollo/client';
import { ADD_CART, LIST_CART, UPDATE_CART } from '../../../../lib/api';
import { useCartContext } from '../../../../contexts';

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
  }
});

export default function ProductContent (props) {
  const { product, inCart, amount, cartId } = props;
  const [addToCart] = useMutation(ADD_CART);
  const [updateCartItem] = useMutation(UPDATE_CART);
  const cartItems = useCartContext()
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
        <div><IndeterminateCheckBoxIcon onClick={() => updateCart('minus')}/></div>
        <div>{amount}</div>
        <div><AddBoxIcon onClick={() => updateCart('plus')}/></div>
      </div>
    : '';
  const showAddOrDeleteIcon = inCart
    ? <DeleteForeverIcon color="disabled" onClick={() => updateCart('delete')}/>
    : <AddShoppingCartIcon fontSize="small" color="primary" onClick={() => updateCart('add')}/>

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
