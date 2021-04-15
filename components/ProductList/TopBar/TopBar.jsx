import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Link from 'next/link';

const useStyles = makeStyles({
  menu: {
    justifyContent: 'space-between'
  },
  menuButton: {
    marginRight: '16px'
  }
});

export default function TopBar () {
  const classes = useStyles();
  return (
    <AppBar color="default" position="fixed">
      <Toolbar className={classes.menu}>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6">
          Online Shopping
        </Typography>
        <Link href="/cart">
          <ShoppingCartIcon fontSize="small"/>
        </Link>
      </Toolbar>
    </AppBar>
  )
}
