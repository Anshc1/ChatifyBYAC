import * as React from 'react';


import NavBarr from './NavBarr';
import { useState, useEffect } from 'react';
import { Sidebar, Menu, MenuItem, SubMenu, useProSidebar, SidebarHeader } from 'react-pro-sidebar';
import { Button, ButtonGroup } from 'react-bootstrap';
import { useRouter } from 'next/router';

import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
export default function Frequestscreen() {

  const [flist, setflist] = useState([])
  const [rlist, setrlist] = useState([])
  let router = useRouter();
  const props1 = JSON.parse(router.query.rlist)
  const props2 = JSON.parse(router.query.flist)
  
  const handleAccept = async (email) => {

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
  
  
  
  useEffect(() => {
    setflist([])
    setrlist([]);
    props1.forEach(element => {
      setrlist(current => [...current, { email: element.email }]);
    })
    props2.forEach(element => {
      setflist(current => [...current, { email: element.email }]);
    })
  }, [])


  return (
    <div>
      <NavBarr />
      <div style={{ display : 'flex' ,   height:  '100vh'   }}>
        <Sidebar>
          <Menu>
            <SubMenu icon={<PeopleOutlinedIcon />} label="Connections">
              {flist.map((text, index) => (
                <div style={{ display: "flex" }}>
                  <MenuItem style={{ fontSize: "13px" }}> {text.email}</MenuItem>
                </div>
              ))}
            </SubMenu>
          </Menu>
        </Sidebar>
        <div>
          <Menu>
            {rlist.map((text, index) => (
              <div style={{ display: "flex", width: "100%" }}>
                <MenuItem style={{ fontSize: "20px" }}> {text.email}</MenuItem>
                <Button variant="outline-success" size="sm" onClick={() => handleAccept(text)}>
                  Accept
                </Button>
                <Button variant="outline-danger" size="sm" onClick={() => handleReject(text)}>
                  Reject
                </Button>
              </div>
            ))}
          </Menu>
        </div>
      </div>
    </div>
  );
}