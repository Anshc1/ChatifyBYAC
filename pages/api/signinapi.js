import { firebaseConfig } from '../../firbaseconfig';
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


export default async function handler(req, res) {
  if (req.method === 'POST') {
    await createUserWithEmailAndPassword(auth, req.body.email, req.body.password)
      .then((response) => {
        const user = response.user;
        res.send(user.uid);
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage); 
        res.status(400).send({ errorMessage });
      });
  }
}
