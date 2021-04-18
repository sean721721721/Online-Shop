import Image from 'next/image';
import ProductContent from './ProductContent/ProductContent';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  productCard: props => ({
    backgroundColor: '#fff',
    borderRadius: '5px',
    border: '1px solid lightgrey',
    boxSizing: 'border-box',
    display: props.inCart ? 'flex' : 'block'
  }),
  productImage: props => ({
    flex: props.inCart ? 1 : ''
  })
});
export default function ProductCard (props) {
  const { product, inCart, cartId } = props;
  const imgName = product.img.split('/')[2];
  const classes = useStyles(props);
  return (
      <div className={classes.productCard}>
        <div className={classes.productImage}>
          <Image
            src={`/assets/${imgName}`}
            width={182}
            height={182}
          />
        </div>
        <ProductContent product={product} inCart={inCart} amount={props.amount} cartId={cartId}/>
      </div>
  );
}
