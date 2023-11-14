const html = document.querySelector('html');
const botoesTempo = document.querySelectorAll('.app__card-button');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const tituloNegrito = document.querySelector('.app__title-strong');
const musicaFocoInput = document.querySelector('#alternar-musica');
const musica = new Audio('./sons/luna-rise-part-one.mp3');
const musicaInciaContagem = new Audio('./sons/play.wav');
const musicaPausaContagem = new Audio('./sons/pause.mp3');
const musicaFinalizaContagem = new Audio('./sons/beep.mp3');
const startPauseBt = document.querySelector('#start-pause');
const iniciarOuPausarBt = document.querySelector('#start-pause span')
const iconeBotaoIniciarPausar = document.querySelector('.app__card-primary-butto-icon')
const tempoTela = document.querySelector('#timer')

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;


const contagemRegressica = () => {
    
    if(tempoDecorridoEmSegundos <= 0 ){
        musicaFinalizaContagem.play()
        alert('TempoFinalizado');
        zerar()
        //esse return serve so pra parar a execução        
        return
    }

    tempoDecorridoEmSegundos -= 1
    mostrarTempo ()
    
}

// Inicia o temporizador ou pausa
function iniciarOuPausar() {
    if(intervaloId){
        musicaPausaContagem.play()
        zerar()
        
        return
    }
    musicaInciaContagem.play();
    intervaloId = setInterval(contagemRegressica, 1000);
    iniciarOuPausarBt.textContent = "Pausar"
    iconeBotaoIniciarPausar.setAttribute('src','/imagens/pause.png')
}

// Função para zerar o temporizador
function zerar() {
    clearInterval(intervaloId)
    iniciarOuPausarBt.textContent = "Começar"
    iconeBotaoIniciarPausar.setAttribute('src','./imagens/play_arrow.png')
    intervaloId = null
}

startPauseBt.addEventListener('click', iniciarOuPausar)

/* Percorre a llista de botoes */
botoesTempo.forEach(botao => {
    /* Para cada botao adiciona um evento do tipo click */
    botao.addEventListener('click', function () {
        const valorDataContext = botao.attributes[0].value;
        
        /* Remove a classe Active de todos os botões */
        botoesTempo.forEach(botao => {
            botao.classList.remove('active')
        })
        
        /* Adiciona classe no botao selecionado.*/
        botao.classList.add('active')
        
        // setAttribute -> seta ou melhor define um valor para o primeiro paramentro que corresponde ao atributo e segundo parametro é o valor que se deseja colocar nesse atributo.
        html.setAttribute('data-contexto', valorDataContext )
        banner.setAttribute('src',`./imagens/${valorDataContext}.png`)
        //console.log(botao.attributes[0].value)

        /* Muda o titulo da pagina conforme o botão selecionado. */
        switch (valorDataContext) {
            case 'foco':
                // Remove todos os elementos filhos, analisa o conteúdo da string e atribui os nós resultantes como filhos do elemento.
                titulo.innerHTML = `Otimize sua produtividade,<br>
                <strong class="app__title-strong"> Faça uma pausa curta!</strong>`
                tempoDecorridoEmSegundos = 1500;
                mostrarTempo(tempoDecorridoEmSegundos)
                break;
            
                case 'short':
                titulo.innerHTML = `Que tal dar uma respirada?<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`
                tempoDecorridoEmSegundos = 300;
                mostrarTempo(tempoDecorridoEmSegundos)
                break;

                case 'long':
                titulo.innerHTML = `Hora de voltar à superfície. <br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>`
                tempoDecorridoEmSegundos = 900;
                mostrarTempo(tempoDecorridoEmSegundos)
                break;
            default:
                break;
        }
    })
})

musicaFocoInput.addEventListener('change',() =>{
    // Deixa a musica em loop
    musica.loop=true;

    // Verifica se a musica está pausada se tiver toca, caso contrario pausa
    if(musica.paused){
        musica.play()
    }else{
        musica.pause()
    }
})

function mostrarTempo (time) {
    const tempo = new Date(time*1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-br', {minute: '2-digit', second:'2-digit'})
    tempoTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo(tempoDecorridoEmSegundos)