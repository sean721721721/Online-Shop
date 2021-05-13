import Image from 'next/image';
import ProductContent from './ProductContent/ProductContent';
import { makeStyles } from '@material-ui/core/styles';
import { Product } from 'server/interface';

const useStyles = makeStyles({
  productCard: (props: ProductCardProps) => ({
    backgroundColor: '#fff',
    borderRadius: '5px',
    border: '1px solid lightgrey',
    boxSizing: 'border-box',
    display: props.inCart ? 'flex' : 'block',
    columnGap: props.inCart ? '4px' : '',
  }),
  productImage: props => ({
    flex: props.inCart ? 1 : '',
  }),
});

interface ProductCardProps {
  product: Product;
  inCart: boolean;
  cartId?: number;
  amount?: number;
}

export default function ProductCard (props: ProductCardProps) {
  const { product, inCart, cartId, amount } = props;
  const imgName = product.img.split('/')[2];
  const classes = useStyles(props);
  return (
      <div className={classes.productCard}>
        <div className={classes.productImage}>
          <Image
            src={`/assets/${imgName}`}
            width={185}
            height={185}
          />
        </div>
        <ProductContent product={product} inCart={inCart} amount={amount} cartId={cartId}/>
      </div>
  );
}
