import * as firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCkF4xSL9MRIExNUuctXYKPpOK5r0iDlJo",
  authDomain: "signal-clone-a.firebaseapp.com",
  projectId: "signal-clone-a",
  storageBucket: "signal-clone-a.appspot.com",
  messagingSenderId: "540749143245",
  appId: "1:540749143245:web:292f9609a803c45c6f1d84"
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };
