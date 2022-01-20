
function calc_saved(value) {
  var average = document.getElementById("Household").value;
  var average, x, y, nA;
  if (average === "Rm12") {
    x = 170.2 - value;
    y = x * 0.025;
    nA = 170.2;
    if (y <= 0) {
      alert("Did not meet the requirement");
      document.getElementById("earned").value = " 0";
    } else {
      document.getElementById("earned").value =
        y.toFixed(2);
    }
  }

  if (average === "Rm3") {
    x = 274.2 - value;
    y = x * 0.025;
    nA = 274.2;
    if (y <= 0) {
      alert("Did not meet the requirement");
      document.getElementById("earned").value = " 0";
    } else {
      document.getElementById("earned").value =
        y.toFixed(2);
    }
  }

  if (average === "Rm4") {
    x = 375.5 - value;
    y = x * 0.025;
    nA = 375.5;
    if (y <= 0) {
      alert("Did not meet the requirement");
      document.getElementById("earned").value = " 0";
    } else {
      document.getElementById("earned").value =
        y.toFixed(2);
    }
  }
  if (average === "Rm5E") {
    x = 456 - value;
    y = x * 0.025;
    nA = 456;
    if (y <= 0) {
      alert("Did not meet the requirement");
      document.getElementById("earned").value = " 0";
    } else {
      document.getElementById("earned").value =
        y.toFixed(2);
    }
  }
  if (average === "Pac") {
    x = 538.7 - value;
    y = x * 0.025;
    nA = 538.7;
    if (y <= 0) {
      alert("Did not meet the requirement");
      document.getElementById("earned").value = " 0";
    } else {
      document.getElementById("earned").value =
        y.toFixed(2);
    }
  }
  if (average === "Ld") {
    x = 1209.1 - value;
    y = x * 0.025;
    nA = 1209.1;
    if (y <= 0) {
      alert("Did not meet the requirement");
      document.getElementById("earned").value = " 0";
    } else {
      document.getElementById("earned").value =
        y.toFixed(2);
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

