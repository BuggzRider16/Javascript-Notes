const printData = (e) => console.log(e.target.value)

const debounce = function (func, delay) {
    let timer
    return function (...args) {
        const context = this
        clearTimeout(timer)
        timer = setTimeout(() => func.apply(context, args), delay)
    }
}
const debounceHandler = debounce(printData, 1000)

const inputHandler = (e) => {
    debounceHandler(e)
}

const inputElement = document.getElementById("custominput")
inputElement.addEventListener("keydown", inputHandler)
