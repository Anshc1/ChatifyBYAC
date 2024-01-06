import React, { useContext, useState, useEffect } from 'react'
import MainScreen from '../components/MainScreen';





function mainpage() {
  const [flist, setflist] = useState([]);
 
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
  console.log(flist); 
  React.useMemo(() => fetchFlist(), [])
  
  
  
  
  return (
    <>
       <MainScreen props={flist} />
    </>
  )
}

export default mainpage