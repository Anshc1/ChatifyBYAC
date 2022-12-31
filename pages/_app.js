import Authcontext from '../contexts/Authcontext'
import UserInfoContext from '../contexts/UserInfoContext';
import '../styles/globals.css'
import { useState  } from 'react';


export default function App({ Component, pageProps }) {
  var initialstate = "";
  var initialuserInfo = {
    Name: "", 
    email:"", 
    Url : "",
  }
  if (typeof window !== 'undefined') {
    const local = window.localStorage.getItem('name');
    if(local!=null){
      initialstate = JSON.parse(local); 
    }
    const userName = window.localStorage.getItem('userName');
    if(userName!=null){
      initialuserInfo.Name = (userName); 
    }
    const email = window.localStorage.getItem('email');
    if(email!=null){
      initialuserInfo.email = (email); 
    }
    const Url = window.localStorage.getItem('profilePicURL');
    if(Url!=null){
      initialuserInfo.Url = (Url); 
    }
  } 
 // console.log(initialuserInfo); 
  const [UID, setUID] = useState(initialstate)
  const [userInfo, setuserInfo] = useState(initialuserInfo);  
  const funUpd=(state)=>{
    setuserInfo(state); 
  }
  return (
  <UserInfoContext.Provider value = {{userInfo : userInfo , setuserInfo : funUpd} }>
   <Authcontext.Provider value= {{state:{UID:  UID }  , setUID : setUID}}>
       <Component {...pageProps} />
    </Authcontext.Provider>
  </UserInfoContext.Provider>
  )
}
