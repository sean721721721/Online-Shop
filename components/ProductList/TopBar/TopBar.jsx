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
  }
});

export default function TopBar () {
  const classes = useStyles();
  return (
    <AppBar color="default" position="fixed">
      <Toolbar className={classes.menu}>
        <IconButton edge="start" color="primary" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" color="primary">
          PetPet
        </Typography>
        <Link href="/cart">
          <ShoppingCartIcon color="primary"/>
        </Link>
      </Toolbar>
    </AppBar>
  )
}
