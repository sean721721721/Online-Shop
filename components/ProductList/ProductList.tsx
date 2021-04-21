import React from 'react';
import ProductCard from './ProductCard/ProductCard';
import { makeStyles } from '@material-ui/core/styles';
import PulseLoader from 'react-spinners/PulseLoader';
import { useProductContext, useLoadingContext } from '../../contexts';

const useStyles = makeStyles({
  productList: {
    display: 'grid',
    marginTop: '64px',
    gridTemplateColumns: '1fr 1fr',
    gridGap: '4px',
    gridAutoFlow: 'row',
    justifyContent: 'center'
  },
  loaderDiv: {
    position: 'fixed',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%,-50%)'
  }
});

function ProductList () {
  const products = useProductContext();
  const { isLoading } = useLoadingContext();
  if (!products || products === []) {
    return <div/>
  }
  const productCards = products.map(product => {
    return <ProductCard key={product.id} product={product} inCart={false}/>
  })

  const classes = useStyles();
  return (
    <React.Fragment>
      <div className={classes.productList}>
        {productCards}
        <div className={classes.loaderDiv}>
          <PulseLoader color={'gray'} loading={isLoading} size={36}/>
        </div>
      </div>
    </React.Fragment>
  );
}

export default ProductList;
