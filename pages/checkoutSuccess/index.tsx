import { makeStyles } from '@material-ui/core/styles';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { useMutation } from '@apollo/client';
import { ADD_ORDER, LIST_CART } from '../../lib/api';
import React, { useEffect } from 'react';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    fontSize: '32px',
    height: '100%'
  },
  toolBar: {
    display: 'flex',
    flexDirection: 'row-reverse'
  },
  menuButton: {
    marginLeft: '16px'
  }
})

export default function checkoutSuccess () {
  const classes = useStyles();
  const [addOrder] = useMutation(ADD_ORDER);
  useEffect(() => {
    addOrder({ refetchQueries: [{ query: LIST_CART }] });
  });
  return (
    <React.Fragment>
      <AppBar color="default" position="fixed">
        <Toolbar className={classes.toolBar}>
          <Link href="/product">
            <ArrowForwardIosIcon className={classes.menuButton}/>
          </Link>
          <Typography variant="h6">
            <span>繼續逛逛</span>
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.root}>
        <CheckCircleIcon color="primary" fontSize="large"/>
        <div>已完成結帳</div>
      </div>
    </React.Fragment>
  )
}
