import React from "react";
import {useHistory} from 'react-router-dom';

function LiveOrders(props)
{
    const history = useHistory();

    return <>
       Live Orders Will Go here 
       <br/>
       <button onClick={()=>history.push('/owner/dashboard')}>DashBoard</button>   
       <button onClick={()=>history.push('/owner/accounts')}>Accounts</button>   
    </>
}

export default LiveOrders;