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

function modalToggle2(){
  const modal2 = document.getElementById('modal2');
  modal2.classList.toggle('active')
}

function modalToggle3(){
  const modal3 = document.getElementById('modal3');
  modal3.classList.toggle('active')
}

// Calculation
function calc_saved(value) {
  
  var average = document.getElementById("Household").value;
  var average, x, y, nA;
  
  if (average === "Rm12") {
    x = 170.2 - value;
    y = x * 0.025;
    nA = 170.2;
    if (y <= 0) {
      modal.classList.toggle('active');
      document.getElementById("earned").value = " 0";
    } else {
      document.getElementById("earned").value =
        Math.round(y);
      document.getElementById("buyQty").value =
        Math.round(y);
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
        Math.round(y);
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
        Math.round(y);
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
        Math.round(y);
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
        Math.round(y);
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
        Math.round(y);
    }
  }


  document.getElementById("saved").value =
    x.toFixed(2);
  document.getElementById("nationalavg").value =
    nA.toFixed(2);
  document.getElementById("average").value =
    average.toFixed(2) ;
  document.getElementById("Household").value = document.getElementById("Consumption").value;
  //document.getElementById("buyQty").value = document.getElementById("earned").value;
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
document.getElementById("buyBtn").addEventListener("click", function() {
  var input = document.getElementById("myAddr").innerHTML;
  //checks if files are selected
  if (files.length != 0) {
    //Loops through all the selected files
    for (let i = 0; i < files.length; i++) {
      //create a storage reference
      var storage = firebase.storage().ref(files[i].name);

      //upload file
      var upload = storage.put(files[i]);

    }
  } else {
    modal2.classList.toggle('active');
  }
});

//Create Event Listener To Allow Form Submission
document.getElementById("buyBtn").addEventListener("click", e => {
  var input = document.getElementById("myAddr").innerHTML;
  //Prevent Default Form Submission Behavior
  e.preventDefault();

  //Get Form Values
  let Waddress = input;
  let Household = document.getElementById("Household").value;
  let Consumption = document.getElementById("Consumption").value;
  let saved = document.getElementById("saved").value;
  let earned = document.getElementById("earned").value;
  let Area = document.getElementById("Area").value;
  let month = document.getElementById("month").value;
  let OCR = document.getElementById("image-text").innerHTML;
  
  //Save Form Data To Firebase
  db.doc(input+month)
    .set({
      myAddr: input,
      Household: Household,
      Consumption: Consumption,
      saved: saved,
      earned: earned,
      Area: Area,
      month: month,
      OCR: OCR,
    
    })
    .then(() => {
      console.log("Data saved");
    })
    .catch(error => {
      console.log(error);
    });

  //alert
  modal3.classList.toggle('active');
  location.reload();
});

//OCR Feature
document.addEventListener('DOMContentLoaded', function(){
            var input_image = document.getElementById('files');
            input_image.addEventListener('change', handleInputChange);
        });

        function handleInputChange(event){
            var input = event.target;
            var file = input.files[0];
            console.log(file);
            Tesseract.recognize(file)
                .progress(function(message){
					document.getElementById('progressbar').value = message.progress;
                    console.log(message);
                })
                .then(function(result){
                    var contentArea = document.getElementById('image-text');
					contentArea.innerHTML = result.text;
                    console.log(result);
              
                })
                .catch(function(err){
                    console.error(err);
                });
        }