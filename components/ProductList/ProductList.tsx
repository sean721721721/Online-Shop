import React from 'react';
import ProductCard from './ProductCard/ProductCard';
import { makeStyles } from '@material-ui/core/styles';
import PulseLoader from 'react-spinners/PulseLoader';
import { useProductContext, useLoadingContext } from '../../contexts';
import { Product } from 'server/interface';

const useStyles = makeStyles({
	productList: {
		display: 'grid',
		marginTop: '64px',
		gridTemplateColumns: '1fr 1fr',
		gridGap: '4px',
		gridAutoFlow: 'row',
		justifyContent: 'center',
	},
});

function ProductList() {
	const products = useProductContext();
	const { isLoading } = useLoadingContext() || {};
	const classes = useStyles();
	if (!products || products === []) {
		return <div />;
	}
	const productCards = products.map((product: Product) => {
		return <ProductCard key={product.id} product={product} inCart={false} />;
	});

	return (
		<React.Fragment>
			<div className={classes.productList}>
				{productCards}
				<div className="loader">
					<PulseLoader color={'gray'} loading={isLoading} size={36} />
				</div>
			</div>
		</React.Fragment>
	);
}

export default ProductList;
