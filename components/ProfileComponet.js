import React, {
    useContext,
    useRef
} from 'react';
import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBBtn,
    MDBTypography
} from 'mdb-react-ui-kit';

import {
    useState,
    useEffect
} from 'react';
import {
    Button
} from '@mui/material';
import {
    initializeApp
} from "firebase/app";
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL
} from "firebase/storage";
import {
    firebaseConfig
} from '../firbaseconfig';
import Authcontext from '../contexts/Authcontext';
import Image from 'next/image';
import {
    maxHeight
} from '@mui/system';
import Router from 'next/router';
import { Padding } from '@mui/icons-material';
const app = initializeApp(firebaseConfig);

import { io } from 'socket.io-client';




export default function ProfileComponent() {

    const [toHide, settoHide] = useState(false)
    const [toHide1, settoHide1] = useState(true)
    const [userName, setuserName] = useState("")
    const [Email, setEmail] = useState("")
    const auth = useContext(Authcontext);
    const [check, setcheck] = useState(false)
    const [picURL, setpicURL] = useState('https://firebasestorage.googleapis.com/v0/b/chatifybyac.appspot.com/o/images%2Funknown-male-person-eps-10-vector-13383958.jpg?alt=media&token=4b94f2d6-e697-4ea7-b874-ab519bd3f141');
    useEffect(() => {
        if (typeof window !== "undefined") {
            const emaill = window.localStorage.getItem("email");
            if (Router.query.email !== undefined) {
                if (emaill !== Router.query.email) {
                    settoHide(true);
                    settoHide1(false);
                }
                setEmail(Router.query.email);
                setuserName(Router.query.name);
                console.log(Router.query.ProfileURL)
                if (Router.query.ProfileURL === "") {
                    setpicURL('https://firebasestorage.googleapis.com/v0/b/chatifybyac.appspot.com/o/images%2Funknown-male-person-eps-10-vector-13383958.jpg?alt=media&token=4b94f2d6-e697-4ea7-b874-ab519bd3f141')
                } else {
                    setpicURL(Router.query.ProfileURL)
                }
            }
            else {
                console.log(window.localStorage.getItem('email'))
                setuserName(window.localStorage.getItem('userName'));
                setEmail(window.localStorage.getItem('email'))
                if (typeof window !== 'undefined') {
                    const local = window.localStorage.getItem('profilePicURL');
                    if (local != null) {
                        setpicURL(local)
                    }
                }
            }
        }

    }, [])

    const handleOnchange = (e) => {
        const storage = getStorage(app);
        const storageRef = ref(storage, 'images/' + userName);
        const uploadTask = uploadBytesResumable(storageRef, e.target.files[0]);
        uploadTask.on('state_changed',
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {

                switch (error.code) {
                    case 'storage/unauthorized':
                        break;
                    case 'storage/canceled':

                        break;

                    case 'storage/unknown':
                        break;
                }
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    if (typeof window !== "undefined") {
                        const UID = window.localStorage.getItem("uid");
                        const URL = downloadURL;
                        const data = {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json'
                            },
                            body: JSON.stringify({
                                UID: UID,
                                URL: URL,
                                type: '1'
                            })
                        }
                        const response = fetch('/api/serverBackendImage', data);
                        localStorage.setItem('profilePicURL', downloadURL);
                        console.log('File available at', downloadURL);
                    }
                });
            }
        );
    }


    const handleaddfriend = async () => {
        const query = {
            body:
            {
                type: '1',
                email1: Router.query.email,
                email2: userInfo.userInfo.email,
            }
        }
        fetch('/api/serverBackendRelationship').finally(() => {
            const socket = io()
            socket.on('connect', () => {
                console.log('connect')
            })
            socket.emit('friend request sent', query, (ack) => {
                console.log(ack);
            });

            socket.on('disconnect', () => {
                console.log('disconnect')
            })
        })

    }



    return (

        <div>
            <div className="gradient-custom-2" style={{ background: 'linear-gradient(to right, rgba(102, 126, 234, 0.5), rgba(118, 75, 162, 0.5))' }}>
                <MDBContainer className="py-5 h-100">
                    <MDBRow className="justify-content-center align-items-center h-100">
                        <MDBCol lg="9" xl="7">
                            <MDBCard>
                                <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#000', height: '200px' }}>
                                    <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px', }}>
                                        <div style={{ height: 170 }}>
                                            <Image loader={() => picURL} src={picURL} width={150} height={170} />
                                        </div>
                                        <Button variant="outlined" component="label" style={{ width: '150px', marginTop: '10px' }} hidden={toHide}>
                                            Update Pic
                                            <input hidden accept="image/*" multiple type="file" onChange={handleOnchange} />
                                        </Button>
                                    </div>
                                    <div className="ms-3" style={{ marginTop: '130px' }}>
                                        <MDBTypography tag="h5">{userName}</MDBTypography>
                                        <MDBCardText>{Email}</MDBCardText>
                                    </div>
                                </div>
                                <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                                    <div className="d-flex justify-content-end text-center py-1">
                                        <Button onClick={handleaddfriend} variant="outlined" component="label" style={{ width: '150px', marginTop: '10px' }} hidden={toHide1}>
                                            Add Friend
                                        </Button>
                                    </div>
                                </div>
                                <MDBCardBody className="text-black p-4">
                                    <div className="mb-5">
                                        <div className="lead fw-normal mb-1">About</div>
                                        <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
                                            <MDBCardText className="font-italic mb-1">Web Developer</MDBCardText>
                                            <MDBCardText className="font-italic mb-1">Lives in New York</MDBCardText>
                                            <MDBCardText className="font-italic mb-0">Photographer</MDBCardText>
                                        </div>
                                    </div>

                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>
        </div>
    );
}