/*
    dbIsntance.js

    allows to import db reference
*/

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC_zTB_1k-50rFTDewkjXV5uphaGn8y5_M",
  authDomain: "a2-db-990d2.firebaseapp.com",
  projectId: "a2-db-990d2",
  storageBucket: "a2-db-990d2.appspot.com",
  messagingSenderId: "951205217420",
  appId: "1:951205217420:web:75bf5fef900980ece467a9",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
