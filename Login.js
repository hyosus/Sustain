const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

// Initialize Firebase
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

const userList = document.querySelector("#user-list");
const searchList = document.querySelector("#search-list");
const form = document.querySelector("#add-user-form");
const updateform = document.querySelector("#update-user-form");
const Formdata = document.querySelector("#Formdata");
const Consumptionform = document.querySelector("#add-Consumption-form");
const Formdata_admin = document.querySelector("#Formdata_admin");

// Modals
function modalToggle(){
  const modal = document.getElementById('modal');
  const modal2 = document.getElementById('modal2');
  modal.classList.toggle('active')
}

function modalToggle2(){
  const modal2 = document.getElementById('modal2');
  modal2.classList.toggle('active')
}

// Sign up
form.addEventListener("submit", (e) => {
  e.preventDefault();
  var input = document.getElementById("myAddr").innerHTML;
  db.collection("user-info")
    .where("address", "==", input)
    .get()
    .then(function (querySnapshot) {
        let id = e.target.parentElement.getAttribute("data-id");
        db.collection("user-info").doc(id).delete();
      });
  db.collection("user-info").doc(input).set({
    name: form.name.value,
    address: input,
    email: form.email.value,
    bio: form.bio.value,
    admin: "",
  });
  modal2.classList.toggle('active');
  form.name.value = "";
  form.address.value = "";
  form.email.value = "";
  form.bio.value = "";
  form.admin.value = "";
}); 

// Update user
updateform.addEventListener("submit", (e) => {
  e.preventDefault();
  var input = document.getElementById("myAddr").innerHTML;
  db.collection("user-info")
    .where("address", "==", input)
    .get()
    .then(function (querySnapshot) {
        let id = e.target.parentElement.getAttribute("data-id");
        db.collection("user-info").doc(id).delete();
      });
  db.collection("user-info").doc(input).update({
    name: updateform.name.value,
    address: input,
    email: updateform.email.value,
    bio: updateform.bio.value,
  });
  modal.classList.toggle('active');
  updateform.name.value = "";
  updateform.address.value = "";
  updateform.email.value = "";
  updateform.bio.value = "";
});

// Update user
function searchlist(doc) {
  let li = document.createElement("h2");
  let name = document.createElement("h1");
  let address = document.createElement("p");
  let email = document.createElement("p");
  let bio = document.createElement("p");
  let admin = document.createElement("p");

  li.setAttribute("data-id", doc.id);
  name.textContent = "Hello! " + doc.data().name;
  name.className = "typing-demo";
  email.textContent = "Email: " + doc.data().email;
  bio.textContent = "bio: " + doc.data().bio;
  admin.textContent = doc.data().admin;

  li.appendChild(name);
  li.appendChild(email);
  li.appendChild(admin);

  searchList.appendChild(li);
}

let searchonce = false;
let FormOnce = false;
let adminOnce = false;

// Search for address
function search() {
  var input = document.getElementById("myAddr").innerHTML;
  db.collection("user-info")
    .where("address", "==", input)
    .get()
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        searchlist(doc);
        check_admin(doc);
      });
    });
  searchonce = true;
}

function search_once() {
  if (!searchonce) search();
}
function form_once() {
  if (!FormOnce) search_form();
}

function adminpage_once() {
  if (!adminOnce) adminpage();
}

function check_admin(doc){
  if (doc.data().admin === "admin" ){
    togglehide();
  }
}

function formdata(doc) {
  let li = document.createElement("li");
  let month = document.createElement("h5");
  let Consumption = document.createElement("h5");

  li.setAttribute("data-id", doc.id);
  Consumption.textContent = "Consumption: " + doc.data().Consumption + "Kwh";
  month.textContent = "For the Month of: " + doc.data().month;

  li.appendChild(Consumption);
  li.appendChild(month);
  
  Formdata.appendChild(li);
}


function search_form(){
  var input = document.getElementById("myAddr").innerHTML;
  db.collection("FormData")
    .where("myAddr", "==", input)
    .get()
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        formdata1(doc);
      });
    });
   FormOnce = true;
}


function formdata1(doc) {
  Formdata.innerHTML +=`
   <section class="u-clearfix u-custom-color-1 u-section-2" id="sec-3c46">
      <div class="u-clearfix u-sheet u-sheet-1">
        <div class="u-expanded-width u-grey-90 u-radius-16 u-shape u-shape-round u-shape-1"></div>
        <div class="u-absolute-vcenter u-border-6 u-border-custom-color-12 u-line u-line-vertical u-line-1"></div>
          <div class="u-list u-list-1">
          <div class="u-repeater u-repeater-1">
            <div class="u-align-right u-container-style u-list-item u-repeater-item u-shape-rectangle">
              <div class="u-container-layout u-similar-container u-container-layout-1">
                <p class="u-custom-item u-text u-text-default u-text-1"><b>${doc.data().month}</b>
                </p>
              </div>
            </div>
            <div class="u-align-right u-container-style u-list-item u-repeater-item u-shape-rectangle">
              <div class="u-container-layout u-similar-container u-container-layout-2">
                <p class="u-custom-item u-text u-text-default u-text-2"></p>
              </div>
            </div>
            <div class="u-align-right u-container-style u-list-item u-repeater-item u-shape-rectangle">
              <div class="u-container-layout u-similar-container u-container-layout-3">
                <p class="u-custom-item u-text u-text-default u-text-3"> </p>
              </div>
            </div>
            <div class="u-align-right u-container-style u-list-item u-repeater-item u-shape-rectangle">
              <div class="u-container-layout u-similar-container u-container-layout-4">
                <p class="u-custom-item u-text u-text-default u-text-4">Electricity Consumption: ${doc.data().Consumption} Kwh</p>
              </div>
            </div>
            <div class="u-align-right u-container-style u-list-item u-repeater-item u-shape-rectangle">
              <div class="u-container-layout u-similar-container u-container-layout-5">
                <p class="u-custom-item u-text u-text-default u-text-5"></p>
              </div>
            </div>
            <div class="u-align-right u-container-style u-list-item u-repeater-item u-shape-rectangle">
              <div class="u-container-layout u-similar-container u-container-layout-6">
                <p class="u-custom-item u-text u-text-default u-text-6">Reward: ${doc.data().earned} sus</p>
              </div>
            </div>
          </div>
        </div>
      </div>
  `
}

// List of users
function userlist(doc) {
  let li = document.createElement("li");
  let admin = document.createElement("p");
  let name = document.createElement("p");
  let address = document.createElement("p");
  let email = document.createElement("p");
  let add_admin = document.createElement("button");
  let remove_admin = document.createElement("button");
  let cross = document.createElement("button");

  li.setAttribute("data-id", doc.id);
  name.textContent = doc.data().name;
  address.textContent = doc.data().address;
  email.textContent = "Email: " + doc.data().email;
  admin.textContent = doc.data().admin;
  cross.textContent = "Remove User";
  add_admin.textContent = "Make Admin";
  remove_admin.textContent = "remove Admin";
  
  li.appendChild(name);
  li.appendChild(address);
  li.appendChild(email);
  li.appendChild(admin);
  li.appendChild(cross);
  li.appendChild(add_admin);
  li.appendChild(remove_admin);

  userList.appendChild(li);
  // deleting data
  cross.addEventListener("click", (e) => {
    e.stopPropagation();
    let id = e.target.parentElement.getAttribute("data-id");
    db.collection("user-info").doc(id).delete();
    location.reload();
  });
  
  add_admin.addEventListener("click", (e) => {
    e.stopPropagation();
    let id = e.target.parentElement.getAttribute("data-id");
    db.collection('user-info').doc(id).update({
    admin: 'admin'
  });
    location.reload();
  });
  remove_admin.addEventListener("click", (e) => {
    e.stopPropagation();
    let id = e.target.parentElement.getAttribute("data-id");
    db.collection('user-info').doc(id).update({
    admin: ''
  });
    location.reload();
  });
  
}


function adminpage() {
  var input = document.getElementById("myAddr").innerHTML;
  db.collection("user-info")
    .onSnapshot((snapshot) => {
      let changes = snapshot.docChanges();
              changes.forEach((change) => {
                console.log(change.doc.data());
                if (change.type == "added") {
                  userlist(change.doc);
                } else if (change.type == "removed") {
                  let li = userList.querySelector("[data-id=" + change.doc.id + "]");
                  userList.removeChild(li);
                }
              });
    });
adminOnce = true;
}


function togglehide() {
  var x = document.getElementById("myDIV");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

function userlisttimed() {
  setTimeout(userlistcount, 3000);
};

function userlistcount() {
  document.getElementById("Userlistcount").innerHTML = document
    .getElementById("user-list")
    .getElementsByTagName("li").length;
}


function formsub() {
  var x = document.getElementById("formsub");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}


function formdata_admin(doc) {
  let li = document.createElement("li");
  let Area = document.createElement("p");
  let Consumption = document.createElement("p");
  let Household = document.createElement("p");
  let myAddr = document.createElement("p");
  let month = document.createElement("p");
  let saved = document.createElement("p");
  let cross = document.createElement("button");

  li.setAttribute("data-id", doc.id);
  Area.textContent = "Residential Area: " + doc.data().Area;
  Consumption.textContent = "Consumption: " + doc.data().Consumption;
  Household.textContent = "Household: " + doc.data().Household;
  month.textContent = "Month: " + doc.data().month;
  saved.textContent = "Saved: " + doc.data().saved + " KwH";
  myAddr.textContent = doc.data().myAddr;
  cross.textContent = "Remove Data";

  li.appendChild(Area);
  li.appendChild(Consumption);
  li.appendChild(Household);
  li.appendChild(month);
  li.appendChild(saved);
  li.appendChild(myAddr);
  li.appendChild(cross);

  Formdata_admin.appendChild(li);
  // deleting data
  cross.addEventListener("click", (e) => {
    e.stopPropagation();
    let id = e.target.parentElement.getAttribute("data-id");
    db.collection("FormData").doc(id).delete();
    location.reload();
  });
}

// real-time listener - FormData
db.collection("FormData")
  .orderBy("month")
  .onSnapshot((snapshot) => {
    let changes = snapshot.docChanges();
    changes.forEach((change) => {
      console.log(change.doc.data());
      if (change.type == "added") {
        formdata_admin(change.doc);
      } else if (change.type == "removed") {
        let li = Formdata_admin.querySelector("[data-id=" + change.doc.id + "]");
        Formdata_admin.removeChild(li);
      }
    });
  });

function consumptionlisttimed() {
  setTimeout(consumptionlistcount, 3000);
};

function consumptionlistcount() {
  document.getElementById("consumptionlistcount").innerHTML = document
    .getElementById("Formdata_admin")
    .getElementsByTagName("li").length;
}