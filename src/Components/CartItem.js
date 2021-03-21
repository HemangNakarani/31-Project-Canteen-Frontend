import React from 'react'
import { useCartContext } from '../Context/CartContext'
import {Button,Typography,Paper,makeStyles,CardContent,IconButton,
        useTheme, Grid} from '@material-ui/core'
import {AddCircleOutlineRounded,RemoveCircleOutlineRounded} from "@material-ui/icons"

const useStyles = makeStyles((theme) => ({
  root:{
    marginTop:16,
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width:'100%',
    padding: 16
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

const CartItem = ({ id, img, title, price, amount , desc}) => {
  const { remove, toggleAmount } = useCartContext()
  const classes = useStyles()
  const theme = useTheme()

  return (
    <Paper variant="outlined" className={classes.root}>
      <Grid container alignItems="center" direction="row">
         <Grid item md={3} sm={3} xs={12}>
            <img
             className={classes.cover}
              src={img}
              title={title}
              alt={title}
            />
         </Grid>
        <Grid item md={9} sm={9} xs={12}>
          <div>
            <CardContent>
              <Typography component="h5" variant="h5">
                {title}
              </Typography>
              <Typography variant="subtitle1" color="secondary">
              $ {price}
              </Typography>
              <Typography variant="caption" color="textSecondary">
              {desc}
              </Typography>
            </CardContent>
            <div className={classes.controls}>
              <IconButton aria-label="inc" onClick={() => toggleAmount(id, 'inc')}>
                {theme.direction === 'rtl' ? <RemoveCircleOutlineRounded /> : <AddCircleOutlineRounded />}
              </IconButton>
              <Typography variant="h5" color="textPrimary">
              {amount}
              </Typography>
              <IconButton aria-label="dec" onClick={() => toggleAmount(id, 'dec')}>
                {theme.direction === 'rtl' ? <AddCircleOutlineRounded /> : <RemoveCircleOutlineRounded />}
              </IconButton>
              <Button variant="contained" color="primary" onClick={() => remove(id)} style={{marginLeft:"16px"}}>
                Remove
              </Button>
            </div>
          </div>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default CartItem
