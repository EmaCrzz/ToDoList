var copyEmail = document.getElementById("email");
copyEmail.addEventListener("click", () => {
  var copyText = document.getElementById("textoACopiar");
  var seleccion = document.createRange();
  seleccion.selectNodeContents(copyText);
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(seleccion);
  try {
    var res = document.execCommand("copy");
    if (res) {
      var tooltip = document.getElementById("myTooltip");
      tooltip.innerHTML = "Copied!";
    } else {
      var tooltip = document.getElementById("myTooltip");
      tooltip.innerHTML = "Error!";
    }
  } catch (ex) {
    console.error(ex);
  }
  window.getSelection().removeRange(seleccion);
});
