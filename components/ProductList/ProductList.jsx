import React from 'react';
import ProductCard from './ProductCard/ProductCard';
import { makeStyles } from '@material-ui/core/styles';
import { useProductContext } from '../../contexts';

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
  const products = useProductContext();
  console.log(products)
  if (!products) {
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
      </div>
    </React.Fragment>
  );
}

export default ProductList;
