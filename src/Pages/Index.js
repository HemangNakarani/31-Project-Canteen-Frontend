import React from "react";
import FoodItem from '../Components/FoodItem'
import {Grid,Typography,Divider,makeStyles,Box,Fab} from '@material-ui/core'
import {ShoppingCart} from '@material-ui/icons'
import {useHistory} from 'react-router-dom'

const useStyles = makeStyles(theme=>({
    divider: {
      marginTop: 8,
      "&:hover, &:focus": {
          color: theme.palette.secondary.main
        },
    },
    
}));

function IndexPage()
{
    const classes = useStyles();
    const history = useHistory();

    return <>
    <Box display="flex" p={1} className={classes.pos}>
        <Box p={1} flexGrow={1} alignSelf="center">
            <Typography variant="h3">
                Welcome to <span style={{color:"red"}}>M</span>acDA's <span>🍕</span>
            </Typography>
        </Box>
        <Box p={1}>
            <Fab color="primary" justify="flex-end" onClick={()=>history.push('/cart')}>
                <ShoppingCart />
            </Fab>
        </Box>
    </Box>
    
    <Divider className={classes.divider} variant="fullWidth"/>
    <Grid container>
        <Grid item xs={12} sm={6} md={4}>
          <FoodItem/>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FoodItem/>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FoodItem/>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FoodItem/>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FoodItem/>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FoodItem/>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FoodItem/>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FoodItem/>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FoodItem/>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FoodItem/>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FoodItem/>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FoodItem/>
        </Grid>    
    </Grid>
    </>
}

export default IndexPage;