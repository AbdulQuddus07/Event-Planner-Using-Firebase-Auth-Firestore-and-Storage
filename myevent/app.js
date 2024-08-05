import {
  auth,
  storage,
  db,
  onAuthStateChanged,
  signOut,
  getDoc,
  getDocs,
  doc,
  collection,
  updateDoc,
  arrayUnion,
  arrayRemove,
  query,
  where,
} from "../utilis/utilis.js";
// console.log(auth);
// console.log(storage);
// console.log(database);

const logout_btn = document.getElementById("logout_btn");
const login_btn = document.getElementById("login_btn");
const user_img = document.getElementById("user_img");
const events_card_conatiner = document.getElementById("card_container");

getMyEvents();
onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    login_btn.style.display = "none";
    user_img.style.display = "inline-block";
    getUserImage(uid);
    getMyEvents(uid);
  } else {
    // window.location.href = "/auth/login/index.html";
    login_btn.style.display = "inline-block";
    user_img.style.display = "none";
  }
});
logout_btn.addEventListener("click", () => {
  signOut(auth);
});
function getUserImage(uid) {
  const userRef = doc(db, "users", uid);
  getDoc(userRef).then((user) => {
    console.log(user.data());
    user_img.src = user.data().img;
  });
}
//

async function getMyEvents(uid) {
  try {
    const q = query(
      collection(db, "events"),
      where("createdBy", "==", uid)
    );
    const querySnapshot = await getDocs(q);
    
    events_card_conatiner.innerHTML = "";
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
      const event = doc.data();
      console.log(event);
      const {
        title,
        location,
        createdById,
        createdByEmail,
        date,
        description,
        time,
      } = event;
      const card = `
        <div class="card" style="width: 24rem; box-shadow: 2px 2px 5px 2px grey;">
    <img class="card-img-top" src="${
      event.banner
    }" alt="banner-image" style="height:250px; width:100%;">
    <div class="card-body">
      <h5 class="card-title" style="font-weight:bold;">${title}</h5>
      <p class="card-text" style="line-height:18px; font-size: 15px;border-bottom: 2px solid gainsboro;">${description}</p>
      <p class="card-text" style="line-height:18px; font-size: 15px; border-bottom: 2px solid gainsboro;">${createdByEmail}</p>
      <p class="card-text" style="line-height:18px; font-size: 15px; border-bottom: 2px solid gainsboro;">Location : ${location}</p>
      <p class="card-text" style="line-height:18px; font-size: 15px;border-bottom: 2px solid gainsboro; margin-bottom:10px;">${date}  ${time}</p>
      <a href="#" id=${doc.id} class="btn btn-primary" >${
        auth?.currentUser && event?.likes?.includes(auth?.currentUser.uid)
          ? "Liked.."
          : "Like"
      }${event?.likes?.length ? event?.likes?.length : ""}</a>
    </div>
  </div>`;
      window.likeEvent = likeEvent;
      events_card_conatiner.innerHTML += card;
      console.log(event);
    });
  } catch (error) {
    alert(error);
  }
}
async function likeEvent(e) {
  console.log(e);
  if (auth.currentUser) {
    const docRef = doc(db, "events", e.id);
    if (e.innerText == "Liked..") {
      updateDoc(docRef, {
        likes: arrayRemove(auth.currentUser.uid),
      })
        .then(() => {
          e.innerText = "Like";
        })
        .catch((e) => {
          alert(e);
        });
    } else {
      updateDoc(docRef, {
        likes: arrayUnion(auth.currentUser.uid),
      })
        .then(() => {
          getAllEvents();
          e.innerText == "Liked..";
        })
        .catch((e) => {
          alert(e);
        });
    }
  } else {
    window.location.href = "/auth/login/index.html";
  }
}
