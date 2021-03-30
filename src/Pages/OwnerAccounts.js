import React from "react";
import {useHistory} from 'react-router-dom'

function OwnerAccounts(props)
{

    const history = useHistory();

    return <>
       Owner's Accounts page Will Go here !!
       <br/>
       <button onClick={()=>history.push('/owner/dashboard')}>DashBoard</button>   
       <button onClick={()=>history.push('/owner/live')}>Live Orders</button>   
    </>
}

export default OwnerAccounts;