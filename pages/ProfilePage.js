import React, { useContext , useEffect, useState } from 'react'
import NavBarr from '../components/NavBarr'
import Image from 'next/image'
import { Box } from '@mui/material'
import ProfileComponent from '../components/ProfileComponet'
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import UserInfoContext from '../contexts/UserInfoContext'
import { useRouter } from 'next/router'

function ProfilePage() {
  const router = useRouter(); 
  const [props, setprops] = useState({})
  useEffect(() => {
    setprops(router.query); 
  }, [router.query])
  return(
    <div style={ {  height:  '100vh'  }}>
    <NavBarr prosp = {"NOO"} />
    <ProfileComponent/>
    </div>
  )
}

export default ProfilePage