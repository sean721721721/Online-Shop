import { makeStyles } from '@material-ui/core/styles';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import AddBoxIcon from '@material-ui/icons/AddBox';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import { useMutation } from '@apollo/client';
import { ADD_CART, UPDATE_CART } from '../../../../lib/api';

const useStyles = makeStyles({
  content: props => ({
    flex: props.inCart ? 2 : '',
    display: 'flex',
    padding: '8px',
    textAlign: 'left',
    flexFlow: 'column',
    justifyContent: 'space-between',
    overflow: 'hidden'
  }),
  title: {
    // height: '32px',
    lineHeight: '1.5em',
    maxHeight: '3em',
    overflow: 'hidden',
  },
  priceRow: props => ({
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-around',
    fontSize: '24px',
    // justifyContent: props.inCart ? 'flex-end' : 'space-between',
    alignItems: 'center',
    marginTop: '16px',
    marginRight: '0px',
    color: '#3f51b5',
  }),
  amountDiv: {
    display: 'flex',
    color: 'grey',
    columnGap: '4px',
    alignItems: 'center',
    '& > div': {
      display: 'flex',
      alignItems: 'center',
    }
  }
});

export default function ProductContent (props) {
  console.log(props);
  const { product, inCart, amount, cartId } = props;
  const [addToCart, { itemAfterAdd }] = useMutation(ADD_CART);
  const [updateCartItem, { itemAfterUpdate }] = useMutation(UPDATE_CART);

  function updateItemAmount (type) {
    console.log(type, cartId, amount);
    switch (type) {
      case 'plus':
        updateCartItem({
          variables: {
            id: cartId,
            amount: amount + 1
          }
        });
        break;
      case 'minus':
        updateCartItem({
          variables: {
            id: cartId,
            amount: amount - 1
          }
        });
        break;
      default:
        break;
    }
  }

  const classes = useStyles(props);
  const amountDiv = amount
    ? <div className={classes.amountDiv}>
          <div><IndeterminateCheckBoxIcon onClick={() => updateItemAmount('minus')}/></div>
          <div>{amount}</div>
          <div><AddBoxIcon onClick={() => updateItemAmount('plus')}/></div>
        </div>
    : '';
  return (
    <div className={classes.content}>
      <div className={classes.title}>
        {product.title}
      </div>
      <div className={classes.priceRow}>
        <div>${product.price}</div>
        {amountDiv}
        <div>
          {inCart ? <DeleteForeverIcon color="disabled" /> : <AddShoppingCartIcon fontSize="small" color="primary"/>}
        </div>
      </div>
    </div>
  )
}
