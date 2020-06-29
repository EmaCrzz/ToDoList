const optionsDate = {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "numeric",
  minute: "numeric",
  hour12: false
};

class Task {
  constructor(props) {
    this.element = props.htmlElement,
    this.name = props.name,
    this.dateInit = new Date(),
    this.dateFinish = new Date(props.dateFinish),
    this.color = props.color,
    this.id = "_" + Math.random().toString(36).substr(2, 9)
    this.timer = null
  }

  countDown() {
    var countDownDate = this.dateFinish.getTime();
    var id = this.id;

    var x = setInterval(function () {
      var now = new Date().getTime();
      var distance = countDownDate - now;
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        clearInterval(x);
        document.getElementById(`timer${id}`).innerHTML = "EXPIRED";
      }else {
        document.getElementById(`timer${id}`).innerHTML =
          days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
      }

    }, 1000);
    this.timer = x
  }

  create() {
    const htmlItem = this.newTaskItem();
    this.countDown();
    this.element.insertAdjacentHTML("afterend", htmlItem);
    this.addDeleteFunction();
  }

  newTaskItem() {
    return `
      <li class="tasks-item is-${this.color}">
        <div class="tasks-info">
          <div>
            <span class="tasks-name u-h4">${this.name}</span>
            <span class="tasks-dates">Created ${new Intl.DateTimeFormat(
              "default",
              optionsDate
            ).format(this.dateInit)}</span>
            <span class="tasks-dates">Finish ${new Intl.DateTimeFormat(
              "default",
              optionsDate
            ).format(this.dateFinish)}</span>
          </div>
          <span class="u-h4" id="timer${this.id}">Starting!</span>            
        </div>
        <button id="cancel${this.id}" class="u-button with-icon is-outlined is-small">
          <img src="./static/icons/cerrar.svg" alt="">
        </button>
      </li>
    `;
  }

  addDeleteFunction() {
    const $buttonCancel = document.getElementById(`cancel${this.id}`)
    $buttonCancel.addEventListener("click", element => {
      clearInterval(this.timer);
      $buttonCancel.parentElement.remove()
    });
  }
}
