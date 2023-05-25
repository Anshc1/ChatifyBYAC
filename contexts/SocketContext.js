
import React, { createContext, useState, useContext, useEffect } from 'react'
import { io } from 'socket.io-client';


const socketC = createContext()
export const useSocket = () => {
    return useContext(socketC);
}
export const SocketProvider = ({children}) => {
    const [socket, setsocket] = useState()
    var UID = "";
    if (typeof window !== 'undefined') {
        UID = window.localStorage.getItem('uid')
    }
    if (UID !== "") {
        console.log(UID)
        useEffect( () => {
            const runF = async()=>{
                await fetch('api/messengingBackend')
                if(socket){
                    socket.disconnect(); 
                }
                const Newsocket = io();
                setsocket(Newsocket);
            }
            runF()
        }, [])
    }
    return (
        <socketC.Provider value={socket}>
            {children}
        </socketC.Provider>
    )
}

