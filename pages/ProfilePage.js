import React, { useContext } from 'react'
import NavBarr from '../components/NavBarr'
import Image from 'next/image'
import { Box } from '@mui/material'
import ProfileComponent from '../components/ProfileComponet'
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import UserInfoContext from '../contexts/UserInfoContext'

function ProfilePage() {
   
  return (
    <>
    <NavBarr />
    <ProfileComponent/>
    </>
  )
}

export default ProfilePage