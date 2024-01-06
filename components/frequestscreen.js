import * as React from 'react';


import NavBarr from './NavBarr';
import { useState, useEffect } from 'react';
import { Sidebar, Menu, MenuItem, SubMenu, useProSidebar, SidebarHeader } from 'react-pro-sidebar';
import { Button, ButtonGroup, Card, ListGroup } from 'react-bootstrap';
import { useRouter } from 'next/router';
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';

import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
export default function Frequestscreen() {

  const [flist, setflist] = useState([])
  const [rlist, setrlist] = useState([])

  let router = useRouter();

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
            email1: email,
            email2: window.localStorage.getItem('email'),
          })
      }

      await fetch('/api/serverBackendRelationship', query).then((response) => {
        console.log(response);
        console.log({email :email}); 
        const index = rlist.indexOf( email);
        if (index > -1) { 
          setrlist([...rlist.slice(0, index),
          ...rlist.slice(index + 1)])
        }
      });
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
            email1: email,
            email2: window.localStorage.getItem('email'),
          })
      }
      await fetch('/api/serverBackendRelationship', query).then((response) => {
        console.log(response);
        console.log({email :email}); 
        const index = rlist.indexOf( email);
        if (index > -1) { 
          setrlist([...rlist.slice(0, index),
          ...rlist.slice(index + 1)])
        }
      });
    }
  }
  const fetchRlist = async () => {
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
      console.log(data); 
      data.forEach(element => {
        if(element.Status ===false){
          setrlist(current => [...current, element.email2]);
        }
      })
    }
  }
  


  
  React.useMemo(() => fetchRlist() , [])


  return (
    <div>
      <NavBarr />
      <div style={{ display: 'flex', justifyContent: 'center', height: '100vh' }}>

        <div>
          <div style={{ display: "flex", justifyContent: 'center', height: "92vh" }}>
            <Card style={{ minWidth: '50vw' }} className="text-center"  >
              <Card.Body className='scrollbar scrollbar-primary  overflow-auto'>
                <Card.Header>Connections Requests</Card.Header>

                {rlist.map((text, index) => (
                  <ListGroup style={{ paddingTop: "13px" }}>
                    <ListGroup.Item style={{ display: "flex", width: "100%", justifyContent: 'space-evenly' }}>
                      <div > {text}</div>
                      <div>
                        <Button variant="outline-success" size="sm" onClick={() => handleAccept(text)}>
                          Accept
                        </Button>
                        <Button variant="outline-danger" size="sm" onClick={() => handleReject(text)}>
                          Reject
                        </Button>
                      </div>
                    </ListGroup.Item>
                  </ListGroup>
                ))}

              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}