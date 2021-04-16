import Image from 'next/image';
import ProductContent from './ProductContent/ProductContent';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  productCard: {
    backgroundColor: '#fff',
    borderRadius: '5px',
    border: '1px solid lightgrey',
    boxSizing: 'border-box'
  }
});
export default function ProductCard (props) {
  const { product, inCart } = props;
  const imgName = product.img.split('/')[2];
  const classes = useStyles();
  return (
      <div className={classes.productCard}>
        <Image
          src={`/assets/${imgName}`}
          width={182}
          height={182}
        />
        <ProductContent product={product} inCart={inCart}/>
      </div>
  );
}
