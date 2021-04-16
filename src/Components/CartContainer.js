import React, { Fragment } from 'react'
import CartItem from './CartItem'
import { useCartContext } from '../Context/CartContext'
import {Button,Typography,Grid,Container,Divider,Box,makeStyles, Paper} from '@material-ui/core'
import {sendMessage} from '../Layouts/User';

const useStyles = makeStyles((theme) => ({
  divider:{
    marginTop:32,
    marginBottom:16
  },
  total:{
    padding:8,
  },
}));

const CartContainer = () => {
  const { cart, total, clearCart,loading } = useCartContext()
  const classes = useStyles()

  if (cart.length === 0) {
    return (
      <>
      <Container maxWidth="md">
          <Typography variant="h4">Your bag</Typography>
          <Typography variant="subtitle1" color="textSecondary">is currently empty</Typography>
      </Container>
      </>
    )
  }
  return (
    loading ?
    <Fragment>
      <Typography>Loading...</Typography>
    </Fragment>
      :
      <>
      <Container maxWidth="md">
        <Typography variant="h4">Your bag</Typography>
        <Grid container>
          {cart.map((item) => {
            if(item.amount>0)
            {return(
              <Grid>
                <CartItem key={item.id} {...item} />
              </Grid>)}
            else
            {
              return( <div key={item.id} />)
            }
          })}
        </Grid>

        <Divider className={classes.divider} variant="fullWidth"/>

        <Box display="flex">
          <Box p={1} flexGrow={1} >
            <Button variant="contained" color="secondary" onClick={clearCart}>
              Clear Cart
            </Button>
          </Box>
          <Box p={1} flexGrow={1} >
            <Button variant="contained" color="secondary" onClick={()=>{sendMessage("Hiii From Cart !!!")}}>
              Checkout
            </Button>
          </Box>
          <Box p={1}>
            <Paper variant="outlined" className={classes.total}>
              <Typography variant="h5">
                Total {":>"}  <span>{total}</span>
              </Typography>
            </Paper>
          </Box>
        </Box>
      </Container>
      </>
  )
}

export default CartContainer
