# Real-Time Messaging App using NEXT.js, MongoDB, Firebase, and Socket.IO

This project is a real-time messaging application developed using NEXT.js for the frontend, MongoDB for the database, Firebase for storage, and Socket.IO for enabling real-time communication. The app allows users to connect with friends, send and receive messages, and manage their profiles. Below is an overview of the project, its features, file structure, and instructions for installation and usage.

## Features

- Real-time messaging: Users can send and receive messages in real-time thanks to the integration of Socket.IO.
- Connection requests: Users can send and accept friend requests to establish connections.
- Friend-making: Once connected, users can start conversations and exchange messages with their friends.
- User profiles: Users can customize their profiles and manage their information.
- Chat history: Chats are stored in a MongoDB database for retrieval and browsing.
- Firebase storage: Images and other files shared in the chats are stored using Firebase storage.

## File Structure

```
- components
  - DrawerMs.js
  - MainScreen.js
  - NavBarr.js
  - ProfileComponent.js
  - FriendRequestScreen.js
- contexts
  - AuthContext.js
  - SocketContext.js
  - UserInfoContext.js
- pages
  - api
    - getMessagesDb.js
    - hello.js
    - loginapi.js
    - messagingBackend.js
    - saveMessage.js
    - serverBackend.js
    - serverBackendImage.js
    - serverBackendRelationship.js
    - signinapi.js
    - socketidGenerator.js
  - ProfilePage.js
  - _app.js
  - _document.js
  - friendScreen.js
  - index.js
  - login.js
  - mainpage.js
  - signup.js
- public
- styles
  - Home.module.css
  - globals.css
- .eslintrc.json
- .gitignore
- README.md
- firebaseconfig.js
- next.config.js
- nodemon.json
- package-lock.json
- package.json
```

## Installation

1. Clone the repository: `git clone https://github.com/your-username/real-time-messaging-app.git`
2. Navigate to the project directory: `cd real-time-messaging-app`
3. Install dependencies: `npm install`
4. Configure Firebase: Update `firebaseconfig.js` with your Firebase credentials.
5. Set up MongoDB: Ensure MongoDB is running and configure connection settings in appropriate files.
6. Start the development server: `npm run dev`

## Usage

1. Open the app in your web browser.
2. Create an account or log in using the provided authentication methods.
3. Send friend requests and accept them to connect with other users.
4. Start conversations by selecting friends from your list and sending messages.
5. Explore different features such as updating your profile and viewing chat history.

## Contributing

Contributions are welcome! Fork the repository, make your changes, and create a pull request detailing your updates.

---

Feel free to contact us at anshchaturvadi2000@gmail.com for any inquiries or assistance. We hope you enjoy using our Real-Time Messaging App!
