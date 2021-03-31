export default class Filters {
    constructor() {
        this.form = document.getElementById('filters');
        this.filterBtn = document.getElementById('search');
    }

    onClick(callback) {
        this.filterBtn.onclick = e => {
            e.preventDefault();
            const data = new FormData(this.form);

            callback({
                type: data.get('type'),
                words: data.get('words'),
            })
        }
    }
}