import { firebaseConfig } from '../../firbaseconfig';
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    await signInWithEmailAndPassword(auth, req.body.email, req.body.password)
      .then((response) => {
        const user = response.user;
        const obj = {
          uid : user.uid
        }
        res.status(200).send({obj}) ;
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage); 
        res.status(400).send({ errorMessage });
      });
  }
}
