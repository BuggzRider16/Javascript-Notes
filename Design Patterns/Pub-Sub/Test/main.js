const publisher = {
    events: {},
    subscribe: function (eventName, fn) {
        console.log(`Someone Subscribed to ${eventName}`)
        if (this.events[eventName]) {
            this.events[eventName].push(fn)
        } else {
            this.events[eventName] = [fn]
        }
    },
    unSubscribe: function (eventName, fn) {
        console.log(`Someone unsubscribed from ${eventName}`)
        if (this.events[eventName]) {
            this.events[eventName] = this.events[eventName].filter(fnc => fnc !== fn)
        }
    },
    publish: function (eventName, data) {
        console.log(`Someone published data to ${eventName}`)
        if (this.events[eventName]) {
            this.events[eventName].forEach(fn => {
                fn(data)
            })
        }
    }
}

const form = {
    render: container => {
        container.querySelector('button').addEventListener('click', form.add)
    },
    add: ev => {
        ev.preventDefault()
        let input = document.querySelector('.message-form input');
        let title = input.value
        input.value = ''
        publisher.publish('messageAdded', title)
    }
}

const stats = {
    render: container => {
        container.querySelector('p').innerText = '0 Messages found'
        publisher.subscribe('messageUpdated', stats.update)
        publisher.subscribe('messageDeleted', stats.update)
    },
    update: list => {
        const container = document.querySelector('.stats')
        container.querySelector('p').innerText = `${list.length} Messages found`
    }
}

const messages = {
    messages: [],
    render: container => {
        container.querySelector('ul').addEventListener('click', messages.delete)
        publisher.subscribe('messageAdded', messages.update.bind(messages))
    },
    update: function(message){
        let list = new Set(this.list);
        list.add(message);
        messages.list = Array.from(list).sort()
        publisher.publish('messageUpdated', messages.list)
        const ListContainer = document.querySelector('.message-list')
        ListContainer.innerHTML = ''
        const df = document.createDocumentFragment()
        messages.list.forEach(item => {
            let li = document.createElement('li')
            li.textContent = item
            df.appendChild(li)
        })
        ListContainer.appendChild(df)
    },
    delete: ev => {
        let item = ev.target;
        let name = item.textContent;
        messages.list = messages.list.filter(nm => nm !== name);
        item.parentElement.removeChild(item);
        publisher.publish('messageDeleted', messages.list);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    let formNode = document.querySelector('.message-form')
    let messageListNode = document.querySelector('.messages-container')
    let statsNode = document.querySelector('.stats')


    form.render(formNode)
    stats.render(statsNode)
    messages.render(messageListNode)
})