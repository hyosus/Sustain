const userList = document.querySelector("#user-list");
const searchList = document.querySelector("#search-list");
const form = document.querySelector("#add-user-form");
const updateform = document.querySelector("#update-user-form");
const Formdata = document.querySelector("#Formdata");
const Consumptionform = document.querySelector("#add-Consumption-form");

// create element & render cafe
function userlist(doc) {
  let li = document.createElement("li");
  let admin = document.createElement("span");
  let name = document.createElement("span");
  let address = document.createElement("span");
  let email = document.createElement("span");
  let add_admin = document.createElement("button");
  let remove_admin = document.createElement("button");
  let cross = document.createElement("div");

  li.setAttribute("data-id", doc.id);
  name.textContent = doc.data().name;
  address.textContent = doc.data().address;
  email.textContent = "Email: " + doc.data().email;
  admin.textContent = doc.data().admin;
  cross.textContent = "x";
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

function searchlist(doc) {
  let li = document.createElement("h2");
  let name = document.createElement("h1");
  let address = document.createElement("p");
  let email = document.createElement("p");
  let bio = document.createElement("p");
  let admin = document.createElement("p");

  li.setAttribute("data-id", doc.id);
  name.textContent = "> Hello! " + doc.data().name;
  name.className = "typing-demo";
  email.textContent = "Email: " + doc.data().email;
  bio.textContent = "bio: " + doc.data().bio;
  admin.textContent = doc.data().admin;

  li.appendChild(name);
  li.appendChild(email);
  li.appendChild(bio);
  li.appendChild(admin);

  searchList.appendChild(li);
}

function formdata(doc) {
  let li = document.createElement("li");
  let Area = document.createElement("span");
  let Consumption = document.createElement("span");
  let Household = document.createElement("span");
  let myAddr = document.createElement("span");
  let cross = document.createElement("div");

  li.setAttribute("data-id", doc.id);
  Area.textContent = "Residential Area: " + doc.data().Area;
  Consumption.textContent = "Consumption: " + doc.data().Consumption;
  Household.textContent = "Household: " + doc.data().Household;
  myAddr.textContent = doc.data().myAddr;
  cross.textContent = "x";

  li.appendChild(Area);
  li.appendChild(Consumption);
  li.appendChild(Household);
  li.appendChild(myAddr);
  li.appendChild(cross);

  Formdata.appendChild(li);
  // deleting data
  cross.addEventListener("click", (e) => {
    e.stopPropagation();
    let id = e.target.parentElement.getAttribute("data-id");
    db.collection("FormData").doc(id).delete();
  });
}

// getting data
// db.collection('cafes').orderBy('city').get().then(snapshot => {
//     snapshot.docs.forEach(doc => {
//         renderCafe(doc);
//     });
// });

// saving data
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
  });
  form.name.value = "";
  form.address.value = "";
  form.email.value = "";
  form.bio.value = "";
});  


Consumptionform.addEventListener("submit", (e) => {
  e.preventDefault();
  db.collection("FormData").add({
    Area: Consumptionform.Area.value,
    Consumption: Consumptionform.Consumption.value,
    Household: Consumptionform.Household.value,
    myAddr: Consumptionform.myAddr.value,
  });
  Consumptionform.Area.value = "";
  Consumptionform.Consumption.value = "";
  Consumptionform.Household.value = "";
  Consumptionform.myAddr.value = "";
});

// query data
//db.collection('cafes').where('city', '==', 'manchester').get().then(snapshot => {
//snapshot.docs.forEach(doc => {
//renderCafe(doc);
//});
//});

// real-time listener - user info
db.collection("user-info")
  .orderBy("address")
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

// real-time listener - FormData
db.collection("FormData")
  .orderBy("myAddr")
  .onSnapshot((snapshot) => {
    let changes = snapshot.docChanges();
    changes.forEach((change) => {
      console.log(change.doc.data());
      if (change.type == "added") {
        formdata(change.doc);
      } else if (change.type == "removed") {
        let li = Formdata.querySelector("[data-id=" + change.doc.id + "]");
        Formdata.removeChild(li);
      }
    });
  });
// updating records (console demo)
// db.collection('cafes').doc('DOgwUvtEQbjZohQNIeMr').update({
//     name: 'mario world'
// });

// db.collection('cafes').doc('DOgwUvtEQbjZohQNIeMr').update({
//     city: 'hong kong'
// });

// setting data
// db.collection('cafes').doc('DOgwUvtEQbjZohQNIeMr').set({
//     city: 'hong kong'
// });

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

window.onload = function () {
  setTimeout(search, 10000);
  setTimeout(userlistcount, 3000);
  setTimeout(consumptionlistcount, 3000);
};

function update() {
  name = document.getElementById("update_name").value;
  var email = document.getElementById("update_email").value;
  var bio = document.getElementById("bio").value;
  updatename(name, email, bio);
}

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
  db.collection("user-info").doc(input).set({
    name: updateform.name.value,
    address: input,
    email: updateform.email.value,
    bio: updateform.bio.value,
  });
  updateform.name.value = "";
  updateform.address.value = "";
  updateform.email.value = "";
  updateform.bio.value = "";
}); 

function userlistcount() {
  document.getElementById("Userlistcount").innerHTML = document
    .getElementById("user-list")
    .getElementsByTagName("li").length;
}
function consumptionlistcount() {
  document.getElementById("consumptionlistcount").innerHTML = document
    .getElementById("Formdata")
    .getElementsByTagName("li").length;
}
