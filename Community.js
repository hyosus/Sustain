// Initialize Firebase
// TODO: Replace with your project's customized code snippet
const config = {
  // Replace with API Key and Project ID
  apiKey: "AIzaSyBIVgnaw83MSmf7iWwq58ih9E2r3lA8ydY",
  projectId: "sustain-f115c"
};
/* end replace */
firebase.initializeApp(config);

// Initialize Cloud Firestore through Firebase
const db = firebase.firestore();
const settings = {
  timestampsInSnapshots: true
};
db.settings(settings);

const form = document.querySelector("form");
const nickname = document.getElementById("nickname");
const topic = document.getElementById("topic");
const wallet = document.getElementById("wallet");
const message = document.getElementById("message");
const errorMessage = document.querySelector(".error-message");
const closebtn = document.querySelector(".error-message .close");
const dataArea = document.getElementById("load-data");

form.addEventListener("submit", e => {
  e.preventDefault();

  if (nickname.value !== "" && message.value !== "" && wallet.value !== "" && topic.value !== "") {
    db.collection("messages")
      .add({
        nickname: nickname.value,
        message: message.value,
        wallet: wallet.value,
        topic: topic.value,
        date: new Date()
      })
      .then(docRef => {
        console.log("Document written with ID: ", docRef.id);
        // window.location.reload();
      })
      .catch(error => {
        console.error("Error adding document: ", error);
      });
    errorMessage.classList.remove("show");
    nickname.value = "";
    message.value = "";
    wallet.value = "";
    topic.value = "";
  } else {
    errorMessage.classList.add("show");
  }
});

closebtn.addEventListener("click", () => {
  errorMessage.classList.remove("show");
});

// A function for formatting a date to DD Month YY - HH:mm
formatDate = d => {
  // Months array to get the month in string format
  const months = new Array(
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  );
  // get the month
  const month = d.getMonth();
  // get the day
  const day = d.getDate();
  // get the year
  let year = d.getFullYear();
  // pull the last two digits of the year
  year = year.toString().substr(-2);
  // get the hours
  const hours = d.getHours();
  // get the minutes
  const minutes = ("0" + d.getMinutes()).slice(-2);
  //return the string "DD Month YY - HH:mm"
  return (
    day + " " + months[month] + " '" + year + " - " + hours + ":" + minutes
  );
};


db.collection("messages")
  .orderBy("date")
  .onSnapshot(querySnapshot => {
    let messages = [];
    querySnapshot.forEach(chat => {
      messages.push(chat.data());
    });

    if (messages.length !== 0) {
      dataArea.innerHTML = "";
    } else {
      dataArea.innerHTML = "<p>No messages</p>";
    }

    for (let i = 0; i < messages.length; i++) {
      const createdOn = new Date(messages[i].date.seconds * 1000);
      dataArea.innerHTML += `
      <section class="u-clearfix u-custom-color-1 u-section-2" id="sec-0b4c">
      <div class="u-clearfix u-sheet u-valign-middle u-sheet-1">
        <div class="u-container-style u-expanded-width u-grey-50 u-group u-radius-12 u-shape-round u-group-1">
          <div class="u-container-layout u-container-layout-1">
            <div class="u-container-style u-group u-group-2">
              <div class="u-container-layout">
                <p class="u-align-right u-text u-text-1">${messages[i].wallet}</p>
                <h3 class="u-text u-text-2">Posted By:&nbsp; ${messages[i].nickname}</h3>
              </div>
            </div>
            <div class="u-border-2 u-border-custom-color-2 u-expanded-width u-line u-line-horizontal u-line-1"></div>
            <h4 class="u-text u-text-default u-text-3"><b>${messages[i].topic}</b>
            </h4>
            <p class="u-text u-text-4">${messages[i].message}</p>
            <p class="u-text u-text-5"> ${formatDate(createdOn)}</p>
          </div>
        </div>
      </div>
      </section>
						`;
    }
  });
