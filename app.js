function editarTag(tag, texto) {
    campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.2});
}

// Tem a função de mostrar a mensagem padrão do jogo:
function mensagemInicial() {
    editarTag('h1', 'Jogo do Número Secreto');
    editarTag('p', 'Digite um número entre 1 e 10');
}

function gerarNumero() {

    let numeroEscolhido = parseInt(Math.random() * 10) + 1;

    if (listaSorteados.length == 10) {
        listaSorteados = [];
    }

    if (listaSorteados.includes(numeroEscolhido)) {
        return gerarNumero();
    }
    else {
        listaSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }  
}

function limparCampo() {
    let chute = document.querySelector('input');
    chute.value = '';
}

function verificarChute() {

    let chute = document.querySelector('input').value;
    
    if (chute == numeroSecreto) {
        let escolhaPalavra = tentativas == 1 ? 'tentativa' : 'tentativas';
        editarTag('h1', 'Parabéns!!!');
        // Pode ser que o HTML não entenda bem a template string, o mais correto seria
        // criar uma variável para armazenar ela.
        editarTag('p', `Você acertou o número secreto em ${tentativas} ${escolhaPalavra}!`);

        // Ativando o botão de reiniciar o jogo:
        document.getElementById('reiniciar').removeAttribute('disabled')
    }

    else {

        tentativas++
        limparCampo()
        if (numeroSecreto > chute) {
            editarTag('p', `Você errou! O número secreto é maior que ${chute}.`);
        }
        else {
            editarTag('p', `Você errou! O número secreto é menor que ${chute}.`);
        }
    }
}

function reiniciarJogo() {
    mensagemInicial();
    limparCampo();
    numeroSecreto = gerarNumero();
    tentativas = 1;
    document.getElementById('reiniciar').setAttribute('disabled', true);
}

// Crio a variável título e faço os comandos para ela
// armazenar a tag h1 do HTML:
// let titulo = document.querySelector('h1');
// Digo o que a tag HTML vai conter:
// titulo.innerHTML = 'Jogo do Número Secreto';
let listaSorteados = []

let numeroSecreto = gerarNumero();
let tentativas = 1;

mensagemInicial();