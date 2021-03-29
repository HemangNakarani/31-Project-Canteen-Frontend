import React from "react";
import {useHistory} from 'react-router-dom';

function OwnerDashboard(props)
{

    const history = useHistory();
    
    return <>
       Owner's Dashboard Will Go here !!
       <br/>
       <button onClick={()=>history.push('/owner/live')}>Live Orders</button>   
       <button onClick={()=>history.push('/owner/accounts')}>Accounts</button>   
    </>
}

export default OwnerDashboard;