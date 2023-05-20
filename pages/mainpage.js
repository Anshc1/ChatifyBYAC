import React, { useContext, useState, useEffect } from 'react'
import Authcontext from '../contexts/Authcontext'
import MainScreen from '../components/MainScreen';
import { io } from 'socket.io-client';
//import UserInfoContext from '../contexts/UserInfoContext';

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
const fetchName = async (val) => {
  const UID = JSON.parse(val);
  const query = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', 'Accept': 'application/json'
    },
    body: JSON.stringify({ type: 'second', UID: UID })
  }
  const response = (await fetch('/api/serverBackend', query));
  const user = await response.json();
  return user.data;
}
const fetchPUrl = async (val) => {

  const query = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', 'Accept': 'application/json'
    },
    body: JSON.stringify({ type: '2', UID: val })
  }
  const response = (await fetch('/api/serverBackendImage', query));
  const user = await response.json();
  return user[0].URL;
}



function mainpage() {
  const [flist, setflist] = useState([]);
  const func = async () => {
    var val;
    if (typeof window !== "undefined") {
      val = window.localStorage.getItem('uid');
    }
    await fetchName(val).then((res) => {
      const Name = capitalizeFirstLetter(res[0].name);
      const email = res[0].email;
      localStorage.setItem('userName', Name);
      localStorage.setItem('email', email);
    }).catch(() => {
      
    });
    await fetchPUrl(val).then((res) => {
      localStorage.setItem('profilePicURL', res);
    }).catch((err) => {
      console.log(err);
    })
  }
  const fetchFlist = async () => {
    if (typeof window !== "undefined") {
      const query = {
        method: "POST",
        headers: {
          'Content-Type': 'application/json', 'Accept': 'application/json'
        },
        body: JSON.stringify({
          type: "4",
          email: window.localStorage.getItem("email")
        })
      }
      const res = await fetch('/api/serverBackendRelationship', query);
      const data = await res.json();
      setflist([])
      data.forEach(element => {
        setflist(current => [...current, { email: element.email2, status: element.Status }]);
      })
    }
  }
  useEffect(() => {
    fetchFlist();
    func();
  }, [])
  
  useEffect(() => {
    const connectToSocket = async () => {
      if (typeof window !== 'undefined') {
        const email = window.localStorage.getItem('email');
        await fetch('/api/messengingBackend')
        const socket = io()
        socket.on('connect', () => {
          console.log('connected')
        })
      }
    };
    connectToSocket();
  }, []);


  return (
    <>
      <MainScreen props={flist} />
    </>
  )
}

export default mainpage