'use strict';

let secretNumber
let chances
let highScore

const setChances = (no) => {
    chances = no
    document.querySelector('.score').textContent = chances
}

const init = () => {
    document.body.style.backgroundColor = '#222'

    secretNumber = Math.trunc(Math.random() * 20) + 1

    chances = 20
    document.querySelector('.score').textContent = chances

    highScore = localStorage.getItem('highScore')
    document.querySelector('.highscore').textContent = highScore

    document.querySelector('.message').textContent = 'Start guessing...'
    document.querySelector('.guess').value = ''
}

init()


document.querySelector('.check').addEventListener('click', () => {

    if (chances === 1) {
        setChances(0)
        document.body.style.backgroundColor = 'red'
        document.querySelector('.message').textContent = 'You LOST !!!'
        document.querySelector('.number').textContent = secretNumber
        return
    }

    const guess = Number(document.querySelector('.guess').value)

    if (!guess) {
        document.querySelector('.message').textContent = 'No input'
    } else if (guess < 1 || guess > 20) {
        document.querySelector('.message').textContent = 'Input out of range'
    } else if (guess > secretNumber) {
        setChances(--chances)
        document.querySelector('.message').textContent = 'Too high !'
    } else if (guess < secretNumber) {
        setChances(--chances)
        document.querySelector('.message').textContent = 'Too Low'
    } else {
        setChances(--chances)
        if (secretNumber === guess) {
            document.body.style.backgroundColor = '#60b347'
            document.querySelector('.message').textContent = 'You WON !!!'
            document.querySelector('.number').textContent = secretNumber
            if (chances > highScore) {
                localStorage.setItem('highScore', chances)
                document.querySelector('.highscore').textContent = chances
            }

        }
    }
})

document.querySelector('.again').addEventListener('click', init)
