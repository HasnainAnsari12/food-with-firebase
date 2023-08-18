
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword ,createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import { getStorage ,ref, uploadBytesResumable, getDownloadURL  } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-storage.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
    apiKey: "AIzaSyBdAf4GYjHnbdlKNWxOUUvk-2FIGgkX5pI",
    authDomain: "foodapp-in-firebase.firebaseapp.com",
    projectId: "foodapp-in-firebase",
    storageBucket: "foodapp-in-firebase.appspot.com",
    messagingSenderId: "254996678983",
    appId: "1:254996678983:web:36f9d08d3a4e7170d72462"
  };



  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);  

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Initialize AUTH
const auth = getAuth();


export {
    db,
    auth,
    doc,
    setDoc,collection,addDoc,createUserWithEmailAndPassword,storage,ref, uploadBytesResumable, getDownloadURL ,
    getDocs
}
