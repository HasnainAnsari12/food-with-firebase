
import { db, auth ,doc ,setDoc,createUserWithEmailAndPassword} from "./firebaseConfig.js";

const signupBtn = document.querySelector("#signupBtn")
signupBtn.addEventListener("click", signUp)


async function signUp(e) {
  try {

   
    const fullName = document.getElementById("fullName").value
    const phoneNumber = document.getElementById("phoneNumber").value
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    const userType = document.getElementById("userType")

    if (!fullName || !phoneNumber || !email || !password) {
      alert("required field are missing")
      return
    }

    if (userType.selectedIndex === 0) {
      alert("please select user type")
      return
    }
   
    const userAuth = await createUserWithEmailAndPassword(auth, email, password)
    console.log(email,password);
    const uid = userAuth.user.uid
    const userObj = {
      fullName,
      phoneNumber,
      email,
      accountActivate: true,
      uid,
      type: userType.value
    }
    const userRef = doc(db, "users", uid);
    const userDB = await setDoc(userRef, userObj)
    window.location.assign("./login.html")
  } catch (error) {
    console.log("error", error.message)
    alert(error.message)
  }





}