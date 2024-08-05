import {
  auth,
  createUserWithEmailAndPassword,
  doc,
  db,
  setDoc,
  ref,
  storage,
  uploadBytes,
  getDownloadURL,
} from "../../utilis/utilis.js";

// 1) Create Account = createUserWithEmailAndPassword
// 2) Upload Image  = ref, uploadBytes,  getDownloadURL
// 3) Set User Details =  doc, setDoc

const signup_form = document.getElementById("signup_form");
const signup_btn = document.getElementById("signup_btn");

signup_form.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log(e);

  const img = e.target[0].files[0];
  const email = e.target[1].value;
  const password = e.target[2].value;
  const cpassword = e.target[3].value;
  const firstName = e.target[4].value;
  const lastName = e.target[5].value;
  const phoneNo = e.target[6].value;
  const companyName = e.target[7].value;
  const userDetails = {
    img,
    email,
    password,
    cpassword,
    firstName,
    lastName,
    phoneNo,
    companyName,
  };
  console.log(userDetails);

  //------------Creating Account
  signup_btn.disabled = true;
  signup_btn.innerText = "...Loading";
  createUserWithEmailAndPassword(auth, email, password)
    .then((user) => {
      console.log("User", user.user.uid);

      //--------Upload Image
      const userRef = ref(storage, `user/${user.user.uid}`);
      uploadBytes(userRef, img)
        .then(() => {
          console.log("User Image Uploaded");
          //----------Getting Image URL
          getDownloadURL(userRef)
            .then((url) => {
              console.log("URL => ", url);
              //-----Updated userDetail Object
              userDetails.img = url;
              // --------- Created user document reference
              const userDbRef = doc(db, "users", user.user.uid);

              //-- set this document to db
              setDoc(userDbRef, userDetails)
                .then(() => {
                  console.log("User Object Updated into db");
                  window.location.href = "/";
                  signup_btn.disabled = false;
                  signup_btn.innerText = "Submit";
                })
                .catch((err) => {
                  console.log(err);
                  signup_btn.disabled = false;
                  signup_btn.innerText = "Submit";
                });
            })
            .catch((err) => {
              alert("Message = ", err), (signup_btn.disabled = false);
              signup_btn.innerText = "Submit";
            });
        })
        .catch((err) => {
          alert(err);
          signup_btn.disabled = false;
          signup_btn.innerText = "Submit";
        });
    })
    .catch((error) => {
      console.log(error);
      signup_btn.disabled = false;
      signup_btn.innerText = "Submit";
    });
});
