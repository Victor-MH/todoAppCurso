import Alert from './alert.js';

export default class AddToDo {
    constructor() {
        this.addBtn = document.getElementById('add');
        this.title = document.getElementById('title');
        this.description = document.getElementById('description');
        this.alert = new Alert('alert');
    }

    onClick(callback) {
        this.addBtn.onclick = () => {
            if(title.value === '' || description.value === '') {
                // console.error('Title or description are empty');
                // alert.classList.remove('d-none');
                // alert.innerText = 'Title or description are empty';
                this.alert.show('Title or description are empty');
                return;
            }
            else {
                this.alert.hide();
                callback(this.title.value, this.description.value);
            }
        }
    }
}