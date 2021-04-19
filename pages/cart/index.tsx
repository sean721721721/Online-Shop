import ShoppingCart from '../../components/ShoppingCart/ShoppingCart';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { useCartContext, useProductContext } from '../../contexts';
import { totalPrice } from '../../lib/helper';
import React from 'react';

const useStyles = makeStyles({
  menuButton: {
    marginRight: '16px'
  },
  title: {
    color: '#3f51b5'
  },
  bottomNav: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'rgb(50,169,255)',
    color: 'white',
    fontSize: '26px'
  }
});

export default function Cart () {
  const classes = useStyles();
  const cartItems = useCartContext() ? useCartContext() : [];
  const products = useProductContext();
  const total = totalPrice(cartItems, products);
  return (
    <React.Fragment>
      <AppBar color="default" position="fixed">
        <Toolbar>
          <Link href="/product">
            <ArrowBackIosIcon className={classes.menuButton}/>
          </Link>
          <Typography variant="h6" className={classes.title}>
            <span>購物車</span>
          </Typography>
        </Toolbar>
      </AppBar>
      <ShoppingCart cartItems={cartItems} products={products}/>
      <BottomNavigation className={classes.bottomNav}>
        <Link href="/checkoutSuccess">
          <div>前往結帳(${total})</div>
        </Link>
      </BottomNavigation>
    </React.Fragment>
  )
}
