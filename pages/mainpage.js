import React, { useContext } from 'react'
import Authcontext from '../contexts/Authcontext'

function mainpage() {
    const vals = useContext(Authcontext);
    console.log("watchthis->>")
    console.log(vals.state.UID);   
  return (
    <div>mainpage</div>
  )
}

export default mainpage