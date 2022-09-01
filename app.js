const checkButton = document.querySelector("#checkButton");
const billAmount = document.querySelector("#billAmount");
const cashGiven = document.querySelector("#cashGiven");
const cashGivenLabel = document.querySelector("#cashGivenLabel");
const errorMessage = document.querySelector("#error");
const notes = [2000, 500, 100, 20, 10, 5, 1];

const notesTable = document.querySelector(".notesTable");

function checkButtonHandler() {
  clearValue();
  if (billAmount.value > 0) {
    if (checkButton.innerText != "Reset") {
      if (parseInt(cashGiven.value) > parseInt(billAmount.value)) {
        const amountToReturn = cashGiven.value - billAmount.value;
        calculateAmount(amountToReturn);
      } else if (billAmount.value == cashGiven.value) {
        showMessage("No change needs to be given");
      } else {
        if (checkButton.innerText == "Check") {
          showMessage("Given Cash should be greater than bill amount");
        }
        showCashGiven();
      }
    } else {
      hideCashGiven();
    }
  } else {
    showMessage("Bill Amount Should be greater than 0");
  }
}

const showCashGiven = () => {
  cashGiven.style.display = "block";
  cashGivenLabel.style.display = "block";
  checkButton.innerText = "Check";
};
const hideCashGiven = () => {
  cashGiven.style.display = "none";
  cashGivenLabel.style.display = "none";
  cashGiven.value = "";
  billAmount.value = "";
  checkButton.innerText = "Next";
};

function calculateAmount(amount) {
  checkButton.innerText = "Reset";
  for (let note of notes) {
    const noOfNotes = amount / note;
    const currentAmount = amount % note;
    amount = currentAmount;
    valueOfNotes(Math.trunc(noOfNotes));
  }
}
function clearValue() {
  errorMessage.style.display = "none";
  notesTable.innerHTML = "";
  const notesTableHead = document.createElement("th");
  notesTableHead.innerText = "No of Notes";
  notesTable.append(notesTableHead);
}
function valueOfNotes(value) {
  const noteValue = document.createElement("td");
  noteValue.innerHTML = value;
  noteValue.classList.add("noOfNotes");
  notesTable.append(noteValue);
}
function showMessage(message) {
  errorMessage.style.display = "block";
  errorMessage.innerText = message;
}
checkButton.addEventListener("click", checkButtonHandler);
