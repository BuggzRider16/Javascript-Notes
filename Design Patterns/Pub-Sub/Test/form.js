 const form = {
    render: container => {
        container.querySelector('button').addEventListener('click', form.add)
    },
    add: ev => {
        ev.preventDefault()
        let input = document.querySelector('.movie-form input');
        let title = input.value
        input = ''

    }
}

export default form