import Authcontext from "./Authcontext"
import { useState } from "react"
function AuthState(props) {
  //const [UID, setUID] = useState("");
  const UID = "isjdijdijsd";

  console.log(UID);  
  return (
     <Authcontext.Provider value={{UID: UID }}>
      
     </Authcontext.Provider>
  )
}

export default AuthState