import {
  ref,
  storage,
  getDownloadURL,
  uploadBytes,
  db,
  collection,
  addDoc,
  doc,
  auth
} from "../utilis/utilis.js";
const event_form = document.getElementById("event_form");
event_form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(e);

  const eventInfo = {
    banner: e.target[0].files[0],
    title: e.target[1].value,
    description: e.target[2].value,
    location: e.target[3].value,
    date: e.target[4].value,
    time: e.target[5].value,
    createdById : auth.currentUser.uid,
    createdByEmail : auth.currentUser.email,
    likes : [],
  };
  console.log("UserDetails", eventInfo);

  const imgRef = ref(storage, eventInfo.banner.name);
  uploadBytes(imgRef, eventInfo.banner).then(() => {
    console.log("File Uploaded Done");

    getDownloadURL(imgRef).then((url) => {
      console.log("File URL =>", url);
      eventInfo.banner = url;
      // add documents in event collection
      const eventCollection = collection(db,"events")
      addDoc(eventCollection,eventInfo).then((snapshot)=>{
        console.log("Document Added");
        window.location.href = "/";

      });
    });
  });
});
