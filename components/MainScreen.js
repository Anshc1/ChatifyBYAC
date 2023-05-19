import * as React from 'react';
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";

import NavBarr from './NavBarr';
import { useState, useEffect, useRef } from 'react';
import { Sidebar, Menu, MenuItem, SubMenu, useProSidebar, SidebarHeader } from 'react-pro-sidebar';
import { Button, ButtonGroup, Card, Form, Row, Col, InputGroup } from 'react-bootstrap';

import Router, { useRouter } from 'next/router';

export default function MainScreen(props) {
  const mssgRef = useRef(null);
  const [flist, setflist] = useState([])
  const [rlist, setrlist] = useState([])
  const [reloadComponent, setReloadComponent] = useState(false);
  const [messageQueue, setmessageQueue] = useState([])
  let router = useRouter();

  const [MessageBox, setMessageBox] = useState()
  const [updateContent, setupdateContent] = useState(false)

  const handleContacts = () => {

    const x = JSON.stringify(rlist)
    const y = JSON.stringify(flist);
    router.push({
      pathname: '/frscreen',
      query: { flist: y, rlist: x }
    })
  }


  const handleSelectemail = (email) => {
    setMessageBox(email)
    setReloadComponent(true)
  }



  const handleSubmitMessage = (e) => {
    e.preventDefault();
    console.log(messageQueue); 
    setupdateContent(true)
    mssgRef.current.value = '';
  };

  useEffect(() => {
    setmessageQueue([]);
  }, [MessageBox])
  useEffect(() => {
    //setupdateContent(false); 
  }, [updateContent] ); 
  
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
      <div style={{ display: 'flex', height: '92vh', flexDirection: "row" }}>
        <Sidebar>
          <Menu>
            <SubMenu icon={<PeopleOutlinedIcon />} label="Connections">
              {flist.map((text, index) => (
                <div style={{ display: "flex" }}>
                  <MenuItem onClick={() => handleSelectemail(text.email)} style={{ fontSize: "13px" }}> {text.email}</MenuItem>
                </div>
              ))}
            </SubMenu>
            <MenuItem onClick={() => handleContacts()} icon={<ContactsOutlinedIcon />}>Contacts</MenuItem>
          </Menu>
        </Sidebar>

        <div>
          {reloadComponent ? (
            <div style={{ display: "flex", justifyContent: 'center', width: "80vw", height: "92vh" }}>
              <Card className="text-center" style={{ width: "50vw" }} >
                <Card.Header>{MessageBox}</Card.Header>
                <Card.Body>
                  <Card.Title></Card.Title>
                  <Card.Text>   
                    {
                    messageQueue.map((msg, index) => {
                      return(
                        <div>
                             {msg.message}
                        </div>
                      )
                    })
                    }
                  </Card.Text>
                </Card.Body>

                <Card.Footer className="text-muted">
                  <Form onSubmit={handleSubmitMessage}>
                    <Row className="justify-content-around">
                      <Col sm={10} className="my-1">
                        <Form.Control id="inlineFormInputName" placeholder="Jane Doe" ref={mssgRef} />
                      </Col>
                      <Col xs="auto" className="my-1">
                        <Button id="inlineFormInputName" type="submit" onClick={(e) => setmessageQueue((current) => [...current, { message: mssgRef.current.value, auther: "you" }])}  >Send</Button>
                      </Col>
                    </Row>
                  </Form>

                </Card.Footer>
              </Card>
            </div>
          ) : (
            <div style={{ display: "flex", justifyContent: 'center', width: "80vw", height: "92vh" }}>
              <Card className="text-center" style={{ width: "50vw" }} >
                <Card.Body>
                  <Card.Title>Welcome To CHATIFY</Card.Title>
                </Card.Body>
              </Card>
            </div>
          )
          }

        </div>
      </div>
    </div>
  )
}