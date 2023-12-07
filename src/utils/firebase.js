import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  collection,
  addDoc,
  /* getDoc */
  /* query,
  where, */
  getDocs,
  /* doc,
  updateDoc, */
} from "firebase/firestore";
//for deploy:
//import env from "react-dotenv";

//for dev:
import { env } from './consts'

const firebaseConfig = {
  apiKey: env.API_KEY,
  authDomain: env.AUTH_DOMAIN,
  projectId: env.PROJECT_ID,
  storageBucket: env.STORAGE_BUCKET,
  messagingSenderId: env.MESSAGING_SENDER_ID,
  appId: env.APP_ID,
  measurementId: env.MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function addData(data) {
  const doc = await addDoc(collection(db, 'links'), data);
  return doc.id;
}

export async function getData() {
  const coll = await getDocs(collection(db, 'links'));
  const docsList = coll.docs.map((doc) => {
    return { data: doc.data(), id: doc.id };
  });
  return docsList;
}

/* export async function updateData(collectionName, id, data) {
  const currentRef = doc(db, collectionName, id);
  const ref = await updateDoc(currentRef, data);
  return ref;
} */

/* export async function getComments(parent) {
  const q = query(collection(db, "comments"), where("parent", "==", parent));
  const querySnapshot = await getDocs(q);
  const docsList = querySnapshot.docs
    .map((doc) => {
      return { data: doc.data(), id: doc.id };
    })
    .sort((a, b) => {
      return b.timestamp - a.timestamp;
    });
  return docsList;
} */