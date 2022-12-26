import Authcontext from '../contexts/Authcontext'
import '../styles/globals.css'
import { useState  } from 'react';


export default function App({ Component, pageProps }) {
  var initialstate = "";
  if (typeof window !== 'undefined') {
    const local = window.localStorage.getItem('name');
    if(local!=null){
      initialstate = JSON.parse(local); 
    }
  } 
  const [UID, setUID] = useState(initialstate) ;  
  return (
   <Authcontext.Provider value= {{state:{UID:  UID }  , setUID : setUID}}>
       <Component {...pageProps} />
    </Authcontext.Provider>
  )
}
