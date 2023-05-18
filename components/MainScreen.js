import * as React from 'react';
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";

import NavBarr from './NavBarr';
import { useState, useEffect } from 'react';
import { Sidebar, Menu, MenuItem, SubMenu, useProSidebar, SidebarHeader } from 'react-pro-sidebar';
import { Button, ButtonGroup } from 'react-bootstrap';

import Router, { useRouter } from 'next/router';

export default function MainScreen(props) {
  const [flist, setflist] = useState([])
  const [rlist, setrlist] = useState([])
  let router = useRouter();
  const handleAccept = async (email) => {
    console.log(email);
    if (typeof window !== "undefined") {
      const query = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 'Accept': 'application/json'
        },
        body:
          JSON.stringify({
            type: '2',
            email1: email.email,
            email2: window.localStorage.getItem('email'),
          })
      }
      const response = await fetch('/api/serverBackendRelationship', query);
      console.log(response);
    }
  }
  const handleReject = async (email) => {
    if (typeof window !== "undefined") {
      const query = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 'Accept': 'application/json'
        },
        body:
          JSON.stringify({
            type: '3',
            email1: email.email,
            email2: window.localStorage.getItem('email'),
          })
      }
      const response = await fetch('/api/serverBackendRelationship', query);
      console.log(response);
    }
  }
  const handleContacts = () => {
    console.log("okok")
    const x = JSON.stringify(rlist)
    console.log(x);

    router.push({
      pathname: '/frscreen',
      query: { props: x }
    })

  }
  useEffect(() => {
    setflist([])
    setrlist([]);
    props.props.forEach(element => {
      if (element.status) {
        setflist(current => [...current, { email: element.email }]);
      } else {
        setrlist(current => [...current, { email: element.email }]);
      }
    })
  }, [props.props])
  return (
    <div>
      <NavBarr />
      <div style={{ display: 'flex', height: '600px' }}>

        <Sidebar>
          <Menu>
            <SubMenu icon={<PeopleOutlinedIcon />} label="Connections">
              {flist.map((text, index) => (
                <div style={{ display: "flex" }}>
                  <MenuItem style={{ fontSize: "13px" }}> {text.email}</MenuItem>
                </div>
              ))}
            </SubMenu>
            <MenuItem onClick={() => handleContacts()} icon={<ContactsOutlinedIcon />}>Contacts</MenuItem>
          </Menu>
        </Sidebar>

      </div>
    </div>

  );
}