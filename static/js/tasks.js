const optionsDate = {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "numeric",
  minute: "numeric",
  hour12: false
};

class Tasks {
  constructor(props) {
    this.element = props.htmlElement
    this.initialTasks = false

    this.init()
  }

  init() {
    this.initialTasks = Boolean(window.localStorage.getItem("tasks"));
    if (this.initialTasks) {
      let localStorageTasks = JSON.parse(window.localStorage.getItem("tasks"));
      localStorageTasks.map(task => {
        this.element.classList.remove("is-empty");
        const htmlItem = this.newTaskItem(task);
        this.element.insertAdjacentHTML("afterbegin", htmlItem);
        var interval = this.countDown(task);
        this.addDeleteFunction({ ...task, interval });
      });
    }
  }

  create(props) {
    if (this.initialTasks) {
      this.element.classList.remove("is-empty");
    }
    const htmlItem = this.newTaskItem(props);
    this.element.insertAdjacentHTML("afterbegin", htmlItem);
    var interval = this.countDown(props);
    this.addDeleteFunction({ ...props, interval });
    let localStorageTasks = JSON.parse(window.localStorage.getItem("tasks"));
    localStorageTasks.push(props)
    window.localStorage.setItem("tasks", JSON.stringify(localStorageTasks));
  }

  newTaskItem({ color, name, dateInit, dateFinish, id }) {
    return `
      <li class="tasks-item is-${color}">
        <div class="tasks-info">
          <div>
            <span class="tasks-name u-h4">${name}</span>
            <span class="tasks-dates">Created ${new Intl.DateTimeFormat(
              "default",
              optionsDate
            ).format(new Date(dateInit))}</span>
            <span class="tasks-dates">Finish ${new Intl.DateTimeFormat(
              "default",
              optionsDate
            ).format(new Date(dateFinish))}</span>
          </div>
          <span class="u-h4" id="timer${id}">Starting!</span>            
        </div>
        <button id="cancel${id}" class="u-button with-icon is-outlined is-small">
          <img src="./static/icons/cerrar.svg" alt="">
        </button>
      </li>
    `;
  }

  countDown({ id, dateFinish }) {
    var countDownDate = new Date(dateFinish).getTime();

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
      } else {
        document.getElementById(`timer${id}`).innerHTML =
          days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
      }
    }, 1000);
    return x;
  }

  addDeleteFunction({ id, interval }) {
    const $buttonCancel = document.getElementById(`cancel${id}`);
    $buttonCancel.addEventListener("click", element => {
      let localStorageTasks = JSON.parse(
        window.localStorage.getItem("tasks")
      )
      let tasks = localStorageTasks.filter(task => task.id !== id)
      if (tasks.length === 0) {
        window.localStorage.removeItem("tasks");
      } else {
        window.localStorage.setItem("tasks", JSON.stringify(tasks));
      }
      clearInterval(interval);
      $buttonCancel.parentElement.remove();
    });
  }
}
