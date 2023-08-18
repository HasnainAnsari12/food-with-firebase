
import { auth, db, addDoc, collection, storage, getDocs, ref, uploadBytesResumable, getDownloadURL, doc } from "./firebaseConfig.js";


window.addEventListener("load", function () {
  if (localStorage.getItem("user") == null) {
      this.window.location.replace("./login.html")
      return
  }
})


const productForm = document.getElementById("ProductForm");
const productCollection = collection(db, "products")
productForm.addEventListener("submit", addproduct);
window.addEventListener("load", getProduct)

async function getProduct() {
  const getProduct = await getDocs(productCollection)
  getProduct.forEach(function (doc) {
   const {productImg,name,desc,price}= doc.data()
    productParent.innerHTML += `
     <div class = "col-4">
     <div class = "card" style="width: 18rem;">
          <img src=${productImg} class="card-img-top" alt="...">
          <div class="card-body">
             <h5 class="card-title">${name}</h5>
             <p class="card-text">${desc}</p>
             <a href="#" class="btn btn-primary">${price}</a>
          </div>
      </div>

      </div>
    `
 });


}



async function addproduct(e) {
  try {
    e.preventDefault();
    const productName = e.target.productName.value;
    const productDesc = e.target.productDesc.value;
    const productPrice = e.target.productPrice.value;
    const productImg = e.target.productImg
    const file = productImg.files[0]
    if (!productName || !productDesc || !productPrice || !file) {
      alert("fill all the fileds")
      return
    }

    // Parse the user object from localStorage
    const user = JSON.parse(localStorage.getItem("user"));

    // Create the file metadata
    /** @type {any} */
    const metadata = {
      contentType: 'image/jpeg'
    };

    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(storage, 'images/' + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on('state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;

          // ...

          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          const productObj = {
            name: productName,
            desc: productDesc,
            price: productPrice,
            userUid: user.uid,
            productImg: downloadURL
          }
          createProduct(productName,productDesc,productPrice,user.uid,downloadURL)
          const docRef = await addDoc(collection(db, "products"), productObj);
        });
      }
    );

    //

  } catch (error) {
    alert(error.message);
  }
}

// function uploadImage(file){
//     return new Promise(function (resolve, reject ) {
    
//     // create the file metadata
     
    

//     let  imageUrl;
//     const metadata = {
//         contentType: 'image/jpeg'
      
//     };

//     // upload file and metadata to the object 'images/mountians.jpg'  
    
//     const storageRef = ref(storage, 'productImages/' + file.name);
//     const uploadTask = uploadBytesResumable(storageRef, file, metadata);
    
//     // Listen for state changes, errors, and completion of the upload.
//     uploadTask.on('state_changed',
//         function (snapshot) {
//             // get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
//           const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//           console.log('Upload is' + progress + '% done');
//           switch (snapshot.state) {
//             case 'paused':
//               console.log("Upload is paused");
//               break;
//             case  'running':
//               console.log("Upload is running");
//               break;
//             } 
//           },
//     (error) => {
     
//          reject({
//              message: "something went wrong"

//          })

//          switch (error.code) {
//           case 'storage/unauthorized':

//               break;
//           case 'storage/canceled':
//             // User canceled the upload
//             break;

//         // ...

//         case 'storage/unknown':
//             // Unknown error occurred, inspect error.serverResponse
//             break;
//     }
// },
// () => {
//   // Upload completed successfully, now we can get the download URL
//   getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//       console.log('File available at', downloadURL);
//       resolve({
//           imageUrl: downloadURL
//       })
//   });
// }
// );
// })
// }

    
async function createProduct(productName,productDesc,productPrice,id,downloadURL) {

    let productParent = document.getElementById("productParent")
    productParent.innerHTML += `
     <div class = "col-4" id="${id}">
     <div class = "card" style="width: 18rem;">
          <img src=${downloadURL} class="card-img-top" alt="...">
          <div class="card-body">
             <h5 class="card-title">${productName}</h5>
             <p class="card-text">${productDesc}</p>
             <a href="#" class="btn btn-primary">${productPrice}</a>
          </div>
      </div>

      </div>
    `



}


        
        
        
      
    
  
