export default class Model {
    constructor() {
        this.view = null;
        this.toDos = JSON.parse(localStorage.getItem('toDos'));
        if (!this.toDos || this.toDos.length < 1) {
            this.toDos = [
                {
                    id: 0,
                    title: 'Titulo asombroso',
                    description: 'Esta es una descripción fabulosa para tus quehaceres',
                    completed: false,
                }
            ]
        }
    }

    setView(view) {
        this.view = view;
    }

    getToDos() {
        return this.toDos;
    }

    save() {
        localStorage.setItem('toDos', JSON.stringify(this.toDos));
    }

    findToDo(id) {
        return this.toDos.findIndex( (todo) => todo.id === id);
    }

    addToDo(title, description){
        const todo = {
            id: this.toDos.length,
            title, //igual que title: title
            description,  //igual que description: description
            completed: false,
        }

        this.toDos.push(todo);

        console.log(this.toDos);
        /*Si devolvemos el todo a la vista, se devuelve como un puntero
          y si en la vista modificamos el todo no se quedará guardado 
          exactamente lo que tenemos aquí*/
        //Así que creamos un clon del objeto
        //return Object.assign({}, todo);    js antiguo
        this.save();
        return {...todo};
    }

    removeTodo(id) {
        const index = this.findToDo(id);
        this.toDos.splice(index, 1);
        this.sortId();
        this.save();
    }

    updateToDo(todo) {
        const index = this.findToDo(todo.id);
        this.toDos[index].title = todo.title;
        this.toDos[index].description = todo.description;
        this.toDos[index].completed = todo.completed;
        this.save();
    }

    toggleCompleted(id) {
        const index = this.findToDo(id);
        const todo = this.toDos[index];
        todo.completed = !todo.completed;
        console.log(todo)
        this.save();
    }

    sortId() {
        const len = this.toDos.length;
        this.toDos.map( (todo, index) => {
            todo.id = index
        })
    }
}