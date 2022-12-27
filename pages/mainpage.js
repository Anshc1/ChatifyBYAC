import React, { useContext } from 'react'
import Authcontext from '../contexts/Authcontext'
import NavBarr from '../components/NavBarr';
import MainScreen from '../components/MainScreen';
function mainpage() {
    const vals = useContext(Authcontext);
    console.log("watchthis->>")
    console.log(vals.state.UID);   
  return (
    <>
    <MainScreen/>
    </>
  )
}

export default mainpage