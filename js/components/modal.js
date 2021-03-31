import Alert from "./alert.js";

export default class Modal {
    constructor() {
        this.title = document.getElementById('modal-title');
        this.description = document.getElementById('modal-description');
        this.modalBtn = document.getElementById('modal-btn');
        this.completed = document.getElementById('modal-completed');

        this.alert = new Alert('modal-alert');

        this.id;
    }

    onClick(callback) {
        this.modalBtn.onclick = () => {
            if(this.title.value === '' || this.description.value === '') {
                this.alert.show('Title or description are empty');
                return;
            }

            $('#modal').modal('toggle');
            const todo = {
                id: this.id,
                title: this.title.value,
                description: this.description.value,
                completed: this.completed.checked,
            }
            callback(todo);
        }
    }

    setValues(todo) {
        this.title.value = '';
        this.title.placeholder = todo.title;
        this.description.value = todo.description;
        this.completed.checked = todo.completed;
        this.id = todo.id;
    }
}