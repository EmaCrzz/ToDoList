function myFunction(event) {
  event.preventDefault()
  var validForm = true
  var $errorName = document.getElementById("name-task-error");
  var $errorDateFinish = document.getElementById("date-finish-error");
  var $errorColor = document.getElementById("color-error");

  $errorName.classList.remove("entry-task-error");
  $errorDateFinish.classList.remove("entry-task-error");
  $errorColor.classList.remove("entry-task-error");

  var $name = document.getElementById("name-task");
  var $dateFinish = document.getElementById("date-finish");
  var $colors = document.getElementsByName("color")
  
  if (!$name.value) {
    $errorName.classList.add("entry-task-error");
    validForm = false
  }
  
  if (!$dateFinish.value) {
    $errorDateFinish.classList.add("entry-task-error");
    validForm = false
  }

  let checkedColor = false
  $colors.forEach(ch => {
    if(ch.checked) checkedColor = true
  })
  if(!checkedColor) {
    $errorColor.classList.add("entry-task-error");
    validForm = false
  }

  if(validForm) console.log('el formulario es valido');
}
var myForm = document.getElementById("entry-task");
myForm.addEventListener("submit", myFunction, false);

