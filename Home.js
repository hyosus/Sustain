var config = {
  apiKey: "AIzaSyBIVgnaw83MSmf7iWwq58ih9E2r3lA8ydY",
  authDomain: "sustain-f115c.firebaseapp.com",
  databaseURL: "https://sustain-f115c-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "sustain-f115c",
  storageBucket: "sustain-f115c.appspot.com",
  messagingSenderId: "748836738977",
  appId: "1:748836738977:web:7751a91d2a632e0a271de0",
  measurementId: "G-ZFH9D225R1"
};
firebase.initializeApp(config);
const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true }); 


const searchList = document.querySelector("#search-list");

window.onload = function () {
  setTimeout(search, 5000);
};

function searchlist(doc) {
  let li = document.createElement("li");
  let name = document.createElement("h5");

  li.setAttribute("data-id", doc.id);
  name.textContent = "Welcome Back, " + doc.data().name;
  
  li.appendChild(name);

  searchList.appendChild(li);
}

function search() {
  var input = document.getElementById("myAddr").innerHTML;
  db.collection("user-info")
    .where("address", "==", input)
    .get()
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        searchlist(doc);
      });
    });
}