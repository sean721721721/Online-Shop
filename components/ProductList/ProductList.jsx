import React from 'react';
import ProductCard from './ProductCard/ProductCard';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  productList: {
    display: 'grid',
    marginTop: '64px',
    gridTemplateColumns: '1fr 1fr',
    gridGap: '4px',
    gridAutoFlow: 'row',
    justifyContent: 'center'
  }
});

function ProductList () {
  const classes = useStyles();
  return (
    <React.Fragment>
      <div className={classes.productList}>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
      </div>
    </React.Fragment>
  );
}

export default ProductList;
