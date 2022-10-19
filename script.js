const input = document.querySelector('.input');
const button = document.querySelector('.login-button');
const form = document.querySelector('.login-form');

const validateInput = ( {target} ) => {
    if (target.value.length >= 3){
        button.removeAttribute('disabled')
        return
    }
        button.setAttribute('disabled', '')
}

const login = (event) => {
    event.preventDefault()
    
    localStorage.setItem('player', input.value);
    window.location = 'pages/memory_game.html'
}

input.addEventListener('input', validateInput);
form.addEventListener('submit', login);
