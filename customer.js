import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, setDoc, getDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";

import { auth, db } from "./firebaseConfig.js";

window.addEventListener("load",getprducts)

async function getprducts() {

    const product = onSnapshot(collection(db,"product"), function (Snapshot) {
        Snapshot.forEach(function(data) {
        console.log("data", data.data())
        window.location.replace("/customer.html")

        })

    })



}
