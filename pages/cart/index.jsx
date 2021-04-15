import React from 'react';
import ShoppingCart from '../../components/ShoppingCart/ShoppingCart';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const useStyles = makeStyles({
  menuButton: {
    marginRight: '16px'
  },
  title: {
    // fontFamily: 'Noto Sans TC, sans-serif'
  }
});

export default function Cart () {
  const classes = useStyles();
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
      <ShoppingCart/>
    </React.Fragment>
  )
}
