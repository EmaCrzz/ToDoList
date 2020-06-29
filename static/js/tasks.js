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
    this.name= props.name,
    this.dateInit = new Intl.DateTimeFormat('default', optionsDate).format(new Date()),
    this.dateFinish = new Intl.DateTimeFormat('default', optionsDate).format(new Date(props.dateFinish)),
    this.color = props.color
  }


  create() {
    const htmlItem = this.newTaskItem()
    this.element.insertAdjacentHTML("beforeend", htmlItem);
  }

  newTaskItem() {
    return `
      <li class="tasks-item is-${this.color}">
        <div class="tasks-info">
          <div>
            <span class="tasks-name u-h5">${this.name}</span>
            <span class="tasks-created">Created ${this.dateInit}</span>
          </div>
          <div>
            <span class="tasks-finish-label">Finish</span>
            <span class="tasks-finish-timer u-h5">${this.dateFinish}</span>
          </div>
        </div>
        <button class="u-button with-icon is-outlined is-small">
          <img src="./static/icons/cerrar.svg" alt="">
        </button>
      </li>
    `;
  }
}
