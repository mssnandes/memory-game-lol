const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');

const inicioTemporizador = () => {
    
    this.loop = setInterval(() => {
        const tempoCorrido = Number(timer.innerHTML);
        timer.innerHTML = tempoCorrido + 1;
    }, 1000);
    

}

const spanErros = document.querySelector('.erros');

//------------------------------------------------

const grid = document.querySelector('.grid');

const personagens = [    //array dos personagens
    'akali',
    'gnar',
    'irelia',
    'jinx',
    'neeko',
    'nilah',
    'pyke',
    'riven',
    'senna',
    'shaco',
    'sylas',
    'yasuo',
];

const criarCarta = (personagem) => {

    const card = criadorElemento('div', 'card')
    const front = criadorElemento('div', 'face front')
    const back = criadorElemento('div', 'face back')

    front.style.backgroundImage = `url(../imagens/champions/${personagem}.jpg)`;

    card.addEventListener('click', revelarCarta);
    
    card.setAttribute('data-personagem', personagem);

    card.appendChild(front);
    card.appendChild(back);

    return card;
}

const criadorElemento = (tag, className) => {

    const element = document.createElement(tag);   
    element.className = className
    return element;
}

const checarFimJogo = () => {
    const cartasGuardadas = document.querySelectorAll('.correct-card');
    if(cartasGuardadas.length===24){
        clearInterval(this.loop);
        alert(`Parabéns ${spanPlayer.innerHTML}! Você concluiu o jogo em ${timer.innerHTML} segundos e errou ${spanErros.innerHTML} vezes.`);
    }
}

const checarCartas = () => {
    const primeiroPersonagem = primeiraCarta.getAttribute('data-personagem');  //obtem o atributo da carta para verificar se a primeira e a segunda carta selecionada sao iguais
    const segundoPersonagem = segundaCarta.getAttribute('data-personagem');
    
    if (primeiroPersonagem === segundoPersonagem){
        primeiraCarta.firstChild.classList.add('correct-card');
        segundaCarta.firstChild.classList.add('correct-card');

        primeiraCarta = '';
        segundaCarta = '';

        checarFimJogo();
    }else{
        setTimeout(() => {  //coloca um delay ao realizar o comando , ({parâmetro}, tempo)
            primeiraCarta.classList.remove('reveal-card');
            segundaCarta.classList.remove('reveal-card');

            primeiraCarta = '';
            segundaCarta = '';

            const erros = Number(spanErros.innerHTML);
            spanErros.innerHTML = erros + 1;
        }, 500)
    }
}

let primeiraCarta = '';
let segundaCarta = '';

const revelarCarta = ({target}) =>{

    if(target.parentNode.className.includes('reveal-card')){  //se a carta tiver com a classe 'revelada' entao, retorna o codigo, caso contrario executa o resto da função
        return;
    }

    if(primeiraCarta === ''){    // se estiver vazia a variavel, atribua a classe 'reveal'
        target.parentNode.classList.add('reveal-card');
        primeiraCarta = target.parentNode // o target, (carta clicada) recebe o elemento pai que no caso, o elemento pai da div front é a card

    }else if(segundaCarta ===''){
        target.parentNode.classList.add('reveal-card');
        segundaCarta = target.parentNode

        checarCartas();
    }
    
}

const carregarJogo = () => {
    const duplicarCartas = [...personagens, ...personagens]; //... serve para selecionar o array
    const espalharCartas = duplicarCartas.sort(() => Math.random() - 0.5); //comandos utilizados para embaralhar o baralho 

    espalharCartas.forEach((personagem) => { //pega as cartas espalhadas, coloca um personagem nelas e coloca ela na grid
        const card = criarCarta(personagem);
        grid.appendChild(card);

    });
}

window.onload = () => {
    
    spanPlayer.innerHTML = localStorage.getItem('player');
    carregarJogo();
    inicioTemporizador();
}