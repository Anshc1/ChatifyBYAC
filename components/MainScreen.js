import * as React from 'react';
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";

import NavBarr from './NavBarr';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Sidebar, Menu, MenuItem, SubMenu, useProSidebar, SidebarHeader } from 'react-pro-sidebar';
import { Button, ButtonGroup, Card, Form, Row, Col, InputGroup, Badge } from 'react-bootstrap';
import Router, { useRouter } from 'next/router';
import { io } from 'socket.io-client';
import { useSocket } from '../contexts/SocketContext';


export default function MainScreen(props) {
  const socket = useSocket();
  const [currUser, setcurrUser] = useState()
  const mssgRef = useRef(null);
  const [flist, setflist] = useState([])
  const [rlist, setrlist] = useState([])
  const [messageQueue, setmessageQueue] = useState([])
  let router = useRouter();

  const [MessageBox, setMessageBox] = useState("")

  const handleContacts = () => {
    const x = JSON.stringify(rlist)
    const y = JSON.stringify(flist);
    router.push({
      pathname: '/frscreen',
      query: { flist: y, rlist: x }
    })
  }
  const [messageCount, setMessageCount] = useState({});


  const handleIncomingMessage = (email) => {
    setMessageCount((prevCount) => {
      const updatedCount = { ...prevCount };
      updatedCount[email] = (updatedCount[email] || 0) + 1;
      return updatedCount;
    });
  };






  const handleSubmitMessage = async (e) => {

    e.preventDefault();
    mssgRef.current.value = '';
    if (typeof window !== 'undefined') {

      var hash = require('object-hash');
      var currentUser = window.localStorage.getItem('email');
      console.log(messageQueue.slice(-1)[0]);

      if (messageQueue.length > 0 && messageQueue.slice(-1)[0].auther === currUser) {

        await fetch('api/messengingBackend').finally(() => {
          //const socket = io();
          socket.on('connect', () => {
            console.log('connect')
          })
          var user1 = currentUser;
          var user2 = MessageBox;

          var turn = '1';
          if (user1 < user2) {
            turn = '2';
            [user1, user2] = [user2, user1];
          }

          const hs = hash(messageQueue.slice(-1)[0]);

          socket.emit('messageServerConnection', {
            user1: user1,
            user2: user2,
            turn: turn,
            message: messageQueue.slice(-1)[0].message,
            time: messageQueue.slice(-1)[0].time,
            hh: hs
          }, (ack) => {
            console.log(ack);
          })
          socket.on('disconnect', () => {
            console.log('disconnect')
          })
        })
      }
    }
  };



  useEffect(() => {
    setmessageQueue([])
    //const socket = io();
    var currentUser
    if (typeof window !== 'undefined') {
      if (MessageBox !== "") {
        setMessageCount((prev) => {
          const prevct = { ...prev };
          prevct[MessageBox] = 0;
          return prevct;
        })
      }
      currentUser = window.localStorage.getItem('email');
      const updateMscreen = async () => {
        if (socket) {

          await fetch('api/messengingBackend').finally(() => {
            socket.on('connect', () => {
              console.log('connect')
            })
            var user1 = currentUser;
            var user2 = MessageBox;
            if (user1 < user2) {
              [user1, user2] = [user2, user1];
            }

            const updMessage = (ack) => {
              ack.forEach(element => {
                if (element.turn === '1') {
                  setmessageQueue(current => [...current, { message: element.message, auther: element.user1, time: element.time }])
                } else {
                  setmessageQueue(current => [...current, { message: element.message, auther: element.user2, time: element.time }])
                }
              });
            }
            socket.emit('getMessages', {
              user1: user1,
              user2: user2,
            }, (ack) => {
              updMessage(ack)
            })

            socket.on('disconnect', () => {
              console.log('disconnect')
            })
          })
        }
      }
      updateMscreen();
    }
    return (() => socket ? socket.off('getMessages') : null);
  }, [MessageBox])





  useEffect(() => {
    if (typeof window !== 'undefined') {
      setcurrUser(window.localStorage.getItem('email'))
    }
  }, []);

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



  useEffect(() => {
    const Mapp = {};
    //const socket = io()
    const connectToSocket = async () => {
      if (typeof window !== 'undefined' && socket) {
        const emailx = window.localStorage.getItem('email');
        await fetch('/api/messengingBackend')
        socket.on('connect', () => {
          console.log('connected')
        })
        socket.emit('registerUser', { email: emailx }, (ack) => {
          console.log(ack);
        })
        socket.on('recieveMessage', (messageData) => {
          if (Mapp[messageData.hh] === 1) {

          } else {
            console.log({ messR: messageData })
            console.log(Mapp)
            Mapp[messageData.hh] = 1;
            var sender = messageData.user1;
            var reciever = messageData.user2;
            if (messageData.turn === '2') {
              [sender, reciever] = [reciever, sender];
            }
            if (reciever === currUser) {
              if (sender === MessageBox) {
                setmessageQueue(curr => [...curr, { message: messageData.message, auther: sender, time: messageData.time }])
              } else {
                console.log(reciever)
                console.log(sender)
                handleIncomingMessage(sender);
              }
            }
          }
        })
      }
    };

    connectToSocket();

    return (() => socket ? socket.off('recieveMessage') : null);

  }, [socket,MessageBox]);





  return (
    <div>
      <NavBarr />
      <div style={{ display: 'flex', height: '92vh', flexDirection: "row" }}>
        <Sidebar>
          <Menu>
            <SubMenu icon={<PeopleOutlinedIcon />} label="Connections">
              {flist.map((text, index) => {
                return (
                  <div style={{ display: "flex", flexDirection: 'row' }}>
                    <MenuItem onClick={() => setMessageBox(text.email)} style={{ fontSize: "13px" }}>
                      {text.email}
                      {' '}
                      {messageCount[text.email] > 0 && <Badge>{messageCount[text.email]}</Badge>}

                    </MenuItem>
                  </div>
                )
              })}
            </SubMenu>
            <MenuItem onClick={() => handleContacts()} icon={<ContactsOutlinedIcon />}>Contacts

            </MenuItem>
          </Menu>
        </Sidebar>

        <div>
          {MessageBox !== "" ? (
            <div style={{ display: "flex", justifyContent: 'center', width: "80vw", height: "92vh" }}>
              <Card className="text-center" style={{ width: "50vw" }} >
                <Card.Header>{MessageBox}</Card.Header>

                <Card.Body className='scrollbar scrollbar-primary  overflow-auto'  >
                  <Card.Title></Card.Title>
                  <Card.Text >
                    <div className='d-flex flex-column'>
                      {
                        messageQueue.map((msg, index) => {
                          if (msg.auther === currUser) {
                            return (
                              <div className="d-flex justify-content-end">
                                <div className="shadow p-3 mb-5  rounded alert alert-primary">
                                  {msg.message}
                                </div>
                              </div>
                            )
                          } else {
                            return (
                              <div className="d-flex justify-content-start">
                                <div className="shadow p-3 mb-5  rounded alert alert-secondary">
                                  {msg.message}
                                </div>
                              </div>
                            )
                          }
                        })
                      }
                    </div>
                  </Card.Text>
                </Card.Body>

                <Card.Footer className="text-muted">
                  <Form onSubmit={handleSubmitMessage}>
                    <Row className="justify-content-around">
                      <Col sm={10} className="my-1">
                        <Form.Control id="inlineFormInputName" placeholder="Jane Doe" ref={mssgRef} />
                      </Col>
                      <Col xs="auto" className="my-1">
                        <Button id="inlineFormInputName" type="submit" onClick={(e) => setmessageQueue((current) => [...current, { message: mssgRef.current.value, auther: currUser, time: new Date() }])}  >Send</Button>
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