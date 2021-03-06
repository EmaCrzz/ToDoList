function validateForm(event) {
  event.preventDefault();
  var validForm = true;
  var $errorName = document.getElementById("name-task-error");
  var $errorDateFinish = document.getElementById("date-finish-error");
  var $errorColor = document.getElementById("color-error");

  $errorName.classList.remove("entry-task-error");
  $errorDateFinish.classList.remove("entry-task-error");
  $errorColor.classList.remove("entry-task-error");

  var $name = document.getElementById("name-task");
  var $dateFinish = document.getElementById("date-finish");
  var $colors = document.getElementsByName("color");

  if (!$name.value) {
    $errorName.classList.add("entry-task-error");
    validForm = false;
  }

  if (!$dateFinish.value) {
    $errorDateFinish.classList.add("entry-task-error");
    validForm = false;
  } else {
    var inputDate = new Date($dateFinish.value).getTime();
    var now = new Date().getTime();
    if (inputDate < now) {
      $errorDateFinish.classList.add("entry-task-error");
      $errorDateFinish.innerHTML = "Select date greater than now";
      validForm = false;
    }
  }

  let checkedColor = false;
  $colors.forEach(ch => {
    if (ch.checked) {
      checkedColor = ch;
    }
  });

  if (!checkedColor) {
    $errorColor.classList.add("entry-task-error");
    validForm = false;
  }

  if (validForm) {
    tasks.create({
      id: "_" + Math.random().toString(36).substr(2, 9),
      color: checkedColor.value,
      name: $name.value,
      dateFinish: $dateFinish.value,
      dateInit: new Date()
    });
    $name.value = "";
    $dateFinish.value = "";
    checkedColor.checked = false;
  }
}

var $tasksContainer = document.getElementById("tasks-container");
var myForm = document.getElementById("entry-task");

let tasks = new Tasks({ htmlElement: $tasksContainer });

myForm.addEventListener("submit", validateForm, false);
