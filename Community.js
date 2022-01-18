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
      <div
          class="u-container-style u-grey-75 u-group u-radius-33 u-shape-round u-group-2"
        >
          <div class="u-container-layout u-container-layout-2">
            <p class="u-custom-font u-font-courier-new u-text u-text-6">
              Posted By :&nbsp;
            </p>
            <div
              class="u-container-style u-group u-palette-1-dark-3 u-radius-17 u-shape-round u-group-3"
            >
              <div class="u-container-layout u-container-layout-3">
                <p class="u-custom-font u-font-courier-new u-text u-text-7">
                  ${messages[i].nickname}
                </p>
              </div>
            </div>
            <h3 class="u-text u-text-8">${messages[i].topic}</h3>
            <p class="u-text u-text-9">
            ${messages[i].message}
            </p>
            <div
              class="u-container-style u-group u-palette-1-dark-3 u-radius-17 u-shape-round u-group-4"
            >
              <div class="u-container-layout u-container-layout-4">
                <p class="u-custom-font u-font-courier-new u-text u-text-10">
                  ${messages[i].wallet}
                </p>
              </div>
            </div>
            <p class="u-custom-font u-font-courier-new u-text u-text-11">
              ${formatDate(createdOn)}
            </p>
          </div>
        </div>
      </div>
						`;
    }
  });
