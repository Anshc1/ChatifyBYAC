# Chatify: Real-Time Messaging Application

Chatify is a real-time messaging application that provides a platform for users to connect, communicate, and manage their profiles efficiently. Built using the power of Next.js, MongoDB, and Socket.IO, Chatify offers a seamless messaging experience with real-time updates.

## Features

- **Real-Time Messaging**: Leveraging Socket.IO, users can send and receive messages instantly.
- **User Profiles**: Users can create and manage their profiles, adding a personal touch to their messaging experience.
- **Friend Requests**: Users can connect with others by sending and accepting friend requests.
- **Chat History**: Chats are stored and retrieved from MongoDB, allowing users to access their conversation history.
- **Responsive Design**: The application's design is responsive, ensuring a great user experience on both desktop and mobile devices.

## File Structure Overview

- `Models`: Contains Mongoose schemas for user profiles, messages, etc.
  - `ProfileSchema.js`: Schema for user profiles.
  - `messageSchema.js`: Schema for messages in chats.
  - `userSchema.js`: Schema for user information.
- `components`: React components for the UI.
  - `DrawerMs.js`: Drawer menu component.
  - `MainScreen.js`: Main chat interface.
  - `NavBarr.js`: Navigation bar component.
  - `ProfileComponent.js`: User profile component.
  - `FriendRequestScreen.js`: Interface for managing friend requests.
- `contexts`: Contexts for state management in React.
  - `AuthContext.js`: Authentication context.
  - `SocketContext.js`: WebSocket connection context.
  - `UserInfoContext.js`: User information context.
- `microserviceWebsocket`: Directory for the WebSocket microservice.
  - `index.js`: Entry point for the WebSocket server.
- `pages`: Next.js pages and API routes.
  - `api`: API routes for backend functionality.
  - `ProfilePage.js`: User profile page.
  - `index.js`: Main landing page.
  - `login.js`: Login page.
  - `mainpage.js`: Main chat interface page.
  - `signup.js`: User registration page.
- `public`: Static files like images and icons.
- `styles`: CSS modules for styling.
- `Dockerfile`: Docker configuration for containerization.
- `README.md`: Documentation for the application.
- `firebaseconfig.js`: Firebase configuration.
- `next.config.js`: Next.js configuration file.

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/Chatify.git
   cd Chatify
   ```
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Configure Firebase**:
   - Update `firebaseconfig.js` with your Firebase credentials.

4. **Start the Application**:
   ```bash
   npm run dev
   ```

## Usage

1. **Navigate to the Application**:
   - Open your web browser and go to `http://localhost:3000`.
2. **Create an Account or Log In**:
   - Use the signup or login page to access the app.
3. **Connect with Friends**:
   - Send and accept friend requests to start chatting.
4. **Enjoy Chatting**:
   - Use the main chat interface to communicate in real-time.

## Deployment

- Refer to the `Dockerfile` for containerization and deployment details.

## Contributing

Contributions to Chatify are welcome! Please read our contributing guidelines for details on how to contribute to the project.

---
