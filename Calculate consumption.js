/*
const modal = document.querySelector('#my-modal');
const modalBtn = document.querySelector('#modal-btn');
const closeBtn = document.querySelector('.close');

closeBtn.addEventListener('click', closeModal);
window.addEventListener('click', outsideClick);


                  

//Open
function openModal() {
  modal.style.display = 'block';
}

// Close
function closeModal() {
  modal.style.display = 'none';
}

// Close If Outside Click
function outsideClick(e) {
  if (e.target == modal) {
    modal.style.display = 'none';
  }
}
*/

// Modal
function modalToggle(){
  const modal = document.getElementById('modal');
  modal.classList.toggle('active')
}

function calc_saved(value) {
  
  var average = document.getElementById("Household").value;
  var average, x, y, nA,claim;
  
  if (average === "Rm12") {
    x = 170.2 - value;
    y = x * 0.025;
    claim = x * 0.025;
    nA = 170.2;
    if (y <= 0) {
      modal.classList.toggle('active');
      document.getElementById("earned").value = " 0";
    } else {
      document.getElementById("earned").value =
        Math.round(y);
      document.getElementById("buyQty").value =
        Math.round(claim);
    }
  }

  if (average === "Rm3") {
    x = 274.2 - value;
    y = x * 0.025;
    nA = 274.2;
    if (y <= 0) {
      modal.classList.toggle('active');
      document.getElementById("earned").value = " 0";
    } else {
      document.getElementById("earned").value =
        Math.round(y);
      document.getElementById("buyQty").value =
        Math.round(claim);
    }
  }

  if (average === "Rm4") {
    x = 375.5 - value;
    y = x * 0.025;
    nA = 375.5;
    if (y <= 0) {
      modal.classList.toggle('active');
      document.getElementById("earned").value = " 0";
    } else {
      document.getElementById("earned").value =
        Math.round(y);
      document.getElementById("buyQty").value =
        Math.round(claim);
    }
  }
  if (average === "Rm5E") {
    x = 456 - value;
    y = x * 0.025;
    nA = 456;
    if (y <= 0) {
      modal.classList.toggle('active');
      document.getElementById("earned").value = " 0";
    } else {
      document.getElementById("earned").value =
        Math.round(y);
      document.getElementById("buyQty").value =
        Math.round(claim);
    }
  }
  if (average === "Pac") {
    x = 538.7 - value;
    y = x * 0.025;
    nA = 538.7;
    if (y <= 0) {
      modal.classList.toggle('active');
      document.getElementById("earned").value = " 0";
    } else {
      document.getElementById("earned").value =
        Math.round(y);
      document.getElementById("buyQty").value =
        Math.round(claim);
    }
  }
  if (average === "Ld") {
    x = 1209.1 - value;
    y = x * 0.025;
    nA = 1209.1;
    if (y <= 0) {
      modal.classList.toggle('active');
      document.getElementById("earned").value = " 0";
    } else {
      document.getElementById("earned").value =
        Math.round(y);
      document.getElementById("buyQty").value =
        Math.round(claim);
    }
  }


  document.getElementById("saved").value =
    x.toFixed(2);
  document.getElementById("nationalavg").value =
    nA.toFixed(2);
  document.getElementById("average").value =
    average.toFixed(2) ;
  document.getElementById("Household").value = document.getElementById("Consumption").value;
}



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBIVgnaw83MSmf7iWwq58ih9E2r3lA8ydY",
  authDomain: "sustain-f115c.firebaseapp.com",
  databaseURL: "https://sustain-f115c-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "sustain-f115c",
  storageBucket: "sustain-f115c.appspot.com",
  messagingSenderId: "748836738977",
  appId: "1:748836738977:web:7751a91d2a632e0a271de0",
  measurementId: "G-ZFH9D225R1"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var firestore = firebase.firestore();

//Variable to access database collection
const db = firestore.collection("FormData");

//Get Submit Form
let submitButton = document.getElementById("submit");

//Get Files
var files = [];
document.getElementById("files").addEventListener("change", function(e) {
  files = e.target.files;
  for (let i = 0; i < files.length; i++) {
    console.log(files[i]);
  }
});
document.getElementById("submit").addEventListener("click", function() {
  //checks if files are selected
  if (files.length != 0) {
    //Loops through all the selected files
    for (let i = 0; i < files.length; i++) {
      //create a storage reference
      var storage = firebase.storage().ref(files[i].name);

      //upload file
      var upload = storage.put(files[i]);

      //update progress bar
      upload.on(
        "state_changed",
        function progress(snapshot) {
          var percentage =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          document.getElementById("progress").value = percentage;
        },

        function error() {
          alert("error uploading file");
        },

        function complete() {
          document.getElementById(
            "uploading"
          ).innerHTML += `${files[i].name} uploaded <br />`;
        }
      );
    }
  } else {
    alert("No file chosen");
  }
});

//Create Event Listener To Allow Form Submission
submitButton.addEventListener("click", e => {
  //Prevent Default Form Submission Behavior
  e.preventDefault();

  //Get Form Values
  let Waddress = document.getElementById("myAddr").value;
  let Household = document.getElementById("Household").value;
  let Consumption = document.getElementById("Consumption").value;
  let Area = document.getElementById("Area").value;
  
  //Save Form Data To Firebase
  db.doc()
    .set({
      myAddr: Waddress,
      Household: Household,
      Consumption: Consumption,
      Area: Area
    })
    .then(() => {
      console.log("Data saved");
    })
    .catch(error => {
      console.log(error);
    });

  //alert
  alert("Your Form Has Been Submitted Successfully");
});