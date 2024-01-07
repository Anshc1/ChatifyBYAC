

# Chatify: Real-Time Messaging Application

Chatify is a modern, real-time messaging application built on a serverless architecture, ensuring high scalability and efficient performance. The application integrates a dedicated WebSocket microservice in the backend, enhancing real-time communication capabilities.

## Key Features

- **Real-Time Messaging**: Instant communication facilitated by Socket.IO through a dedicated WebSocket microservice.
- **Serverless Architecture**: Scalable and efficient backend architecture, ideal for handling varying loads.
- **User Profiles**: Personalized user experience with customizable profiles.
- **Friend Requests**: Connect with friends easily with friend request functionality.
- **Chat History**: Persistent chat history stored in MongoDB, allowing users to revisit past conversations.
- **Responsive UI**: A seamless user interface that adapts to different screen sizes and devices.

## File Structure Overview

- `Models`: Mongoose schemas for user profiles, messages, etc.
  - `ProfileSchema.js`: Schema for user profiles.
  - `messageSchema.js`: Schema for messages in chats.
  - `userSchema.js`: Schema for user information.
- `components`: React components for building the user interface.
  - `DrawerMs.js`: Drawer menu component.
  - `MainScreen.js`: Main chat interface.
  - `NavBarr.js`: Navigation bar component.
  - `ProfileComponent.js`: User profile component.
  - `FriendRequestScreen.js`: Interface for managing friend requests.
- `contexts`: React contexts for state management.
  - `AuthContext.js`: Authentication context.
  - `SocketContext.js`: WebSocket connection context.
  - `UserInfoContext.js`: User information context.
- `microserviceWebsocket`: Dedicated WebSocket microservice.
  - `index.js`: Entry point for WebSocket server.
  - `models/messageSchema.js`: Schema for messages used in WebSocket.
- `pages`: Next.js pages and API routes, including serverless functions for backend logic.
  - `api`: Serverless API routes.
  - `ProfilePage.js`, `frscreen.js`, `index.js`, `login.js`, `mainpage.js`, `signup.js`: Frontend pages.
- `public`: Static assets like images and icons.
- `styles`: CSS files for styling the application.
- `Dockerfile`, `README.md`, `firebaseconfig.js`, etc.: Configuration and documentation files.

## Serverless Backend

The backend of Chatify is designed with a serverless architecture, utilizing serverless functions in Next.js for handling API requests. This approach allows for:

- **Auto-scaling**: Automatic scaling based on the demand, making the application efficient under varying loads.
- **Cost-Effectiveness**: Reduced operational costs as resources are utilized only when the serverless functions are executed.
- **Simplified Backend Management**: Less overhead in managing server infrastructure.

## WebSocket Microservice

Chatify's real-time capabilities are powered by a WebSocket microservice, separate from the main serverless backend. This microservice is built using Socket.IO and handles all real-time messaging aspects, such as:

- Real-time message broadcasting and receiving.
- Managing live user connections.
- Ensuring low-latency communication.

## Installation and Setup

```bash
# Clone the repository
git clone https://github.com/your-username/Chatify.git
cd Chatify

# Install dependencies
npm install

# Start the development server
npm run dev
```

Configure Firebase and other environmental variables as per the project requirements.

## Usage

1. Access the application through `http://localhost:3000`.
2. Sign up or log in to start using the messaging features.
3. Connect with friends, send messages, and enjoy real-time communication.

## Deployment

Refer to the `Dockerfile` for containerization details. Ensure that environment variables are set up in your hosting platform to match your local development setup.

## Contributing

Contributions to Chatify are welcome! Please read the contributing guidelines for details on how to contribute to the project.

