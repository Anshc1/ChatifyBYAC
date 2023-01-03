import React, { useContext, useState, useEffect } from 'react'
import Authcontext from '../contexts/Authcontext'
import MainScreen from '../components/MainScreen';
import UserInfoContext from '../contexts/UserInfoContext';

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
const fetchName = async (val) => {
  const query = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', 'Accept': 'application/json'
    },
    body: JSON.stringify({ type: 'second', UID: JSON.stringify(val.state.UID) })
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
      await fetchName(val).then((res)=>{
        const Name = capitalizeFirstLetter(res[0].name);
        const email = res[0].email;
        localStorage.setItem('userName', Name);
        localStorage.setItem('email', email);
      }).catch(()=>{
        
      });
    }
    func();
  }, [])

  return (
    <>
      <MainScreen />
    </>
  )
}

export default mainpage