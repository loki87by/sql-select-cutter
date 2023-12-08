import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, getDocs } from "firebase/firestore";
//for deploy:
import env from "react-dotenv";

//for dev:
//import { env } from './env'

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
  const doc = await addDoc(collection(db, "links"), data);

  return doc.id;
}

export async function getData() {
  const coll = await getDocs(collection(db, "links"));
  const docsList = coll.docs.map((doc) => {
    return { data: doc.data(), id: doc.id };
  });

  return docsList;
}
