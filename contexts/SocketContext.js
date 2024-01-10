import React, { createContext, useState, useContext, useEffect } from 'react';
import { io } from 'socket.io-client';

const socketC = createContext();

export const useSocket = () => {
    return useContext(socketC);
};

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        let UID = "";
        if (typeof window !== 'undefined') {
            UID = window.localStorage.getItem('uid');
        }

        if (UID !== "") {
            const Newsocket = io('http://localhost:3001');
            
            Newsocket.on('connect', () => {
                console.log('Connected to server');
            });

            Newsocket.on('connect_error', (error) => {
                console.error('Connection Error:', error);
            });

            setSocket(Newsocket);

            return () => {
                Newsocket.disconnect();
            };
        }
    }, []);

    return (
        <socketC.Provider value={socket}>
            {children}
        </socketC.Provider>
    );
};
