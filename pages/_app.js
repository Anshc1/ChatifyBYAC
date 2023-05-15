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
    UID : "", 
  }
  /*if (typeof window !== 'undefined' ) {
    const local = window.localStorage.getItem('name');
    console.log(local); 
    if(local!=null){
      initialstate = (local); 
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
  */
 // console.log(initialuserInfo); 
  const [UserInfo, setUserInfo] = useState(initialuserInfo)

  return (
   <Authcontext.Provider value= { {UserInfo  , setUserInfo  }}>
       <Component {...pageProps} />
    </Authcontext.Provider>
  )
}
