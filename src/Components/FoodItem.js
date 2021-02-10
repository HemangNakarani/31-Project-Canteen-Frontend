import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Burger from "../Assets/burger.png"
import Typography from '@material-ui/core/Typography';
import { Box,Fab} from '@material-ui/core';
import {Add,Whatshot} from '@material-ui/icons'

const useStyles = makeStyles(theme=>({
  root: {
    marginTop: 48,
    marginLeft:36,
    borderRadius:25,
    "&:hover, &:focus": {
        backgroundColor: theme.palette.primary.main
      },
  },
  div:{
    marginTop:16,
    marginLeft:8,
    marginRight:8,
  },
  box:{
    width: 124,
    height: 124,
    [theme.breakpoints.down('xs')]: {
        width:64,
        height:64,
    },
    [theme.breakpoints.down('sm')]: {
        width:96,
        height:96,
    },
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 8,
  },
  cardcontent: {
    marginTop: 64,
    [theme.breakpoints.down('xs')]: {
        marginTop: 32,
    },
    [theme.breakpoints.down('sm')]: {
        marginTop: 32,
    },
  },
}));

function FoodItem()
{
  const classes = useStyles();
  return (
      <div className={classes.div}>
        <Box display="flex" flexDirection="column">
          <Box position="absolute" flexWrap="flex-end" className={classes.box} >
            <img src={Burger} style={{width:"100%", height:"100%", borderRadius:64, boxShadow: "2px 4px 8px 0 rgba(0, 0, 0, 0.2)"}} alt="IndexPage"/>
          </Box>
        <Card className={classes.root} variant="outlined" >
            <CardContent className={classes.cardcontent}>
                <Typography variant="h6" component="h2">
                Cheese Burger
                </Typography>
                <Typography color="textSecondary" noWrap>
                Vegetables, mayonnaise, beans, Capsicum.
                </Typography>
            </CardContent>
            <Box display="flex" p={1} className={classes.pos}>
                <Box p={1} flexGrow={1} alignSelf="center">
                    <Typography variant="h4">
                            36$
                    </Typography>
                </Box>
                <Box p={1}>
                    <Fab color="secondary" justify="flex-end" size="small">
                            <Add />
                    </Fab>
                </Box>
                <Box p={1}>
                    <Fab color="secondary" justify="flex-end" size="small">
                            <Whatshot />
                    </Fab>
                </Box>
            </Box>
        </Card>
    </Box>
    </div>
  );
}

export default FoodItem;


