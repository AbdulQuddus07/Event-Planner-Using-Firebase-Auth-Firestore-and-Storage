import { auth, storage, db, onAuthStateChanged ,signOut, getDoc, getDocs, doc,collection } from "/utilis/utilis.js";
// console.log(auth);
// console.log(storage);
// console.log(database);

const logout_btn = document.getElementById("logout_btn");
const login_btn = document.getElementById("login_btn");
const user_img = document.getElementById("user_img");
const events_card_conatiner = document.getElementById("card_container");

getAllEvents();
onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    login_btn.style.display = "none";
    user_img.style.display = "inline-block";
    getUserImage(uid);
  } else {
    login_btn.style.display = "inline-block";
    user_img.style.display = "none";
    window.location.href = "/auth/login/index.html";
  }
});
logout_btn.addEventListener("click", ()=>{
    signOut(auth);
});
function getUserImage(uid) {
   const userRef = doc(db, "users" , uid)
   getDoc(userRef).then((user)=>{
    console.log(user.data());
    user_img.src = user.data().img;
   })
}
//

async function getAllEvents() {
  try {
    const querySnapshot = await getDocs(collection(db,"events"));
    events_card_conatiner.innerHTML = '';
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
      const event = doc.data();
      console.log(event);
      const {title,location,createdById, createdByEmail,date,description,time} = event;
     const  card = `<div class="card" style="width: 23rem;">
  <img src="${event.banner}">
  <div class="card-body">
    <h5 class="card-title">${title}</h5>
    <p class="card-text">${description}</p>
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">Email : ${createdByEmail}</li>
    <li class="list-group-item">Email-ID : ${createdById}</li>
    <li class="list-group-item">Location : ${location}</li>
    <li class="list-group-item">Date : ${date} & Time : ${time}</a></li>
  </ul>
   
</div>`
 events_card_conatiner.innerHTML += card;


      
    });
  } catch (error) {
    alert(error)
  }
}