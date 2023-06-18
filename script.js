const buttons = document.querySelectorAll(".alert__buttons_wrapper button");
const alertsContainer = document.querySelector(".alerts");
const alertQueue = [];

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const dataType = button.getAttribute("data-type");
    createAlert(dataType);
  });
});

function createAlert(dataType) {
  const alert = document.createElement("li");
  alert.className = `alert alert__${dataType}`;
  alert.innerHTML = `
    <i><ion-icon class="icon__${dataType}" name="${getIconName(
    dataType
  )}"></ion-icon></i>
    <span>${getToastMessage(dataType)}</span>
    <div class="close">
      <ion-icon name="close"></ion-icon>
    </div>
  `;

  alertsContainer.insertBefore(alert, alertsContainer.firstChild);

  setTimeout(() => {
    alert.classList.add("show");
    setTimeout(() => {
      hideAlert(alert);
    }, 5000);
    alertQueue.push(alert);

    if (alertQueue.length === 1) {
      showNextAlert();
    }
  }, 100);
}

alertsContainer.addEventListener("click", (event) => {
  if (event.target.matches(".close ion-icon")) {
    const alert = event.target.closest(".alert");
    hideAlert(alert);
  }
});

function hideAlert(alert) {
  alert.classList.remove("show");
  alert.classList.add("hide");
  setTimeout(() => {
    alert.remove();
  }, 500);
}

function showNextAlert() {
  const nextAlert = alertQueue[0];
  if (nextAlert) {
    nextAlert.classList.add("show");
  }
}

function getIconName(dataType) {
  switch (dataType) {
    case "success":
      return "checkmark-circle-outline";
    case "warning":
      return "warning-outline";
    case "danger":
      return "close-circle-outline";
    case "info":
      return "information-circle-outline";
    default:
      return "";
  }
}

function getToastMessage(dataType) {
  switch (dataType) {
    case "success":
      return "A successful toast";
    case "warning":
      return "A warning toast";
    case "danger":
      return "A destructive toast";
    case "info":
      return "An informational toast";
    default:
      return "";
  }
}
