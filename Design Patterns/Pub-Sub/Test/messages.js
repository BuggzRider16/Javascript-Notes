export const messages = {
    render: container => {
        container.querySelector('ul').addEventListener('click', form.add)
    },
    update: ev => {
        ev.preventDefault()
        let input = document.querySelector('.movie-form input');
        let title = input.value
        input = ''
    },
    delete: ev => {
        ev.preventDefault()
        let input = document.querySelector('.movie-form input');
        let title = input.value
        input = ''
    }
}