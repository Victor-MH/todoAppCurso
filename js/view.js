import AddToDo from './components/add_todo.js';
import Modal from './components/modal.js';
import Filters from './components/filters.js';

class View { 
    constructor(){
        this.model = null;
        this.table = document.getElementById('table');
        
        this.addToDoForm = new AddToDo();
        this.modal = new Modal();
        this.filters = new Filters();

        this.addToDoForm.onClick( (title, description) => this.addToDo(title, description) );
        this.modal.onClick( (todo) => this.updateToDo(todo) );
        this.filters.onClick( filters => this.filter(filters) );
    }

    setModel(model) {
        this.model = model;
    }

    render() {
        const todos = this.model.getToDos();
        /*  for(const i in todos) =>  devuelve los indices
            for(const i of todos) =>  devuelve los elementos*/
        console.log(todos);
        todos.forEach(todo => this.createRow(todo));
    }

    addToDo(title, description) {
        const todo = this.model.addToDo(title, description);
        this.createRow(todo);
    }

    createRow(todo) {
        const row = table.insertRow();
        row.setAttribute('id', todo.id);
        row.innerHTML = `
            <td>${todo.title}</td>
            <td>${todo.description}</td>
            <td class="text-center">
            </td>
            <td class="text-right">
            </td>
        `;

        const checkbox = document.createElement('input');
        //checkbox.setAttribute('type', 'checkbox');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;
        //checkbox.onclick = () => this.model.toggleCompleted(todo.id);     que por consistencia no
        checkbox.onclick = () => this.toggleCompleted(todo.id);
        row.children[2].appendChild(checkbox);

        const editBtn = document.createElement('button');
        editBtn.classList.add('btn', 'btn-primary', 'mb-1');
        editBtn.innerHTML = '<i class="fa fa-pencil"></i>';
        editBtn.setAttribute('data-toggle', 'modal');
        editBtn.setAttribute('data-target', '#modal');
        editBtn.onclick = () => this.modal.setValues(todo);
        row.children[3].appendChild(editBtn);

        const removeBtn = document.createElement('button');
        removeBtn.classList.add('btn', 'btn-danger', 'mb-1', 'ml-1');
        removeBtn.innerHTML = '<i class="fa fa-trash"></i>';
        //removeBtn.onclick = this.parentNode.parentNode.remove;    mi intento
        removeBtn.onclick = () => this.removeToDO(todo.id);
        row.children[3].appendChild(removeBtn);
        
        
    }

    removeToDO(id) {
        //Primero tratamos de borrar del model porque si no se puede habría que enviar un error
        this.model.removeTodo(id)
        document.getElementById(id).remove();
        this.sortRows();
    }

    updateToDo(todo) {
        this.model.updateToDo(todo);
        const row = document.getElementById(todo.id);
        row.children[0].innerHTML = todo.title;
        row.children[1].innerHTML = todo.description;
        row.children[2].children[0].checked = todo.completed;
    }

    toggleCompleted(id) {
        this.model.toggleCompleted(id);
    }

    sortRows() {
        const len = table.children[0].children.length;
        for(let i = 1; i < len; i++){           // Que técnica boomer
            table.children[0].children[i].setAttribute('id',i-1)    
        }
    }

    filter(filters) {
        const { type, words } = filters;
        const [, ...rows] = this.table.getElementsByTagName('tr');      // Que tecnica hacker
        // Con esto destructuramos el objeto y evitamos el primer elemento, es decir, guardamos desde el segundo
        for(const row of rows) {
            const [title, description, completed] = row.children;
            let shouldHide = false;

            if(words) {
                shouldHide = !title.innerText.includes(words) && !description.innerText.includes(words);
            }

            const shouldBeCompleted = type === 'completed';
            const isCompleted = completed.children[0].checked;

            if(type !== 'all' && shouldBeCompleted != isCompleted) {
                shouldHide = true;
            }

            if(shouldHide) {
                row.classList.add('d-none');
            }
            else {
                row.classList.remove('d-none');
            }
        }
    }

    
}

export default View;