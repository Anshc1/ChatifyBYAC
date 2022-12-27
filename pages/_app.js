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
    const localInfo = window.localStorage.getItem('userInfo');
    if(localInfo!=null){
      initialuserInfo = (localInfo); 
    }
  } 
  const [UID, setUID] = useState(initialstate)
  const [userInfo, setuserInfo] = useState(initialuserInfo);  
  return (
  <UserInfoContext.Provider value = {{userInfo : userInfo , setuserInfo : setuserInfo} }>
   <Authcontext.Provider value= {{state:{UID:  UID }  , setUID : setUID}}>
       <Component {...pageProps} />
    </Authcontext.Provider>
  </UserInfoContext.Provider>
  )
}
