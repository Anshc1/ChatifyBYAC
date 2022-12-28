import React, { useContext , useState ,useEffect } from 'react'
import Authcontext from '../contexts/Authcontext'
import NavBarr from '../components/NavBarr';
import MainScreen from '../components/MainScreen';
import UserInfoContext from '../contexts/UserInfoContext';

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
const fetchName = async (val) => {
  const query = {
    method: 'POST',
    body:  {type : 'second' ,  UID :  val.state.UID} 
  }
  const response = await fetch('/api/serverBackend', query);
  const user = await response.json();
  return user.data;
}

function mainpage() {
  const val = useContext(Authcontext);
  const userInfo = useContext(UserInfoContext); 
  useEffect(() => {
    const func = async () => {
      const res = await fetchName(val);
      
      const state = {
        name : capitalizeFirstLetter( res[0].name )  , 
        email : res[0].email , 
        Url : ""  
      }
      userInfo.setuserInfo(state); 
      localStorage.setItem("userInfo" , state); 
    }
    func();
  }, [])

  console.log("watchthis->>")
  console.log(val.state.UID);
  return (
    <>
      <MainScreen />
    </>
  )
}

export default mainpage