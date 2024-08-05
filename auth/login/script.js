import { auth, signInWithEmailAndPassword } from "../../utilis/utilis.js";

// 1) Create Account = createUserWithEmailAndPassword
// 2) Upload Image  = ref, uploadBytes,  getDownloadURL
// 3) Set User Details =  doc, setDoc

const login_form = document.getElementById("signin_form");
//const login_btn = document.getElementById("signin_btn");

login_form.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log(e);

  const email = e.target[0].value;
  const password = e.target[1].value;
  console.log("Email",email);
  console.log("Password",password);
  
  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      window.location.href = "/";
    })
    .catch((error) => {
        alert(error)
    });
});
