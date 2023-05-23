import Authcontext from '../contexts/Authcontext'
import UserInfoContext from '../contexts/UserInfoContext';
import '../styles/globals.css'
import { useState } from 'react';
import { ProSidebarProvider } from 'react-pro-sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
React.useLayoutEffect = React.useEffect 




export default function App({ Component, pageProps }) {
  var initialstate = "";
  var initialuserInfo = {
    Name: "",
    email: "",
    Url: "",
    UID: "",
  }
  
  
  const [UserInfo, setUserInfo] = useState(initialuserInfo)

  return (
   <ProSidebarProvider>
      <Authcontext.Provider value={{ UserInfo, setUserInfo }}>
        <Component {...pageProps} />
      </Authcontext.Provider>
    </ProSidebarProvider>
    
  )
}
