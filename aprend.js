const output = document.getElementById("output");
const printButton = document.getElementById("printButton");
const ifElseButton = document.getElementById("ifElseButton");
const mathButton = document.getElementById("MathButton");
const objectButton = document.getElementById("ObjectButton");
const tipagemButton = document.getElementById("TipagemButton");
const promiseButton = document.getElementById("PromiseButton");
const funcButton = document.getElementById("funcButton");
const dadosButton = document.getElementById("dadosButton");

let currentUtterance = null; // Variável para rastrear a fala atual

printButton.addEventListener("click", () => {
    stopSpeaking(); // Para a fala anterior, se estiver ocorrendo
    const exemplo1 = 'O console.log() é uma função do JavaScript usada para imprimir mensagens ou valores no console do navegador ou IDE. Isso é útil para imprimir mensangens, resultados, depurar código e verificar o que está acontecendo em seu programa';
    output.textContent = exemplo1;
    speak(exemplo1, 0.8, 'Google español de Estados Unidos');
});

ifElseButton.addEventListener("click", () => {
    stopSpeaking(); // Para a fala anterior, se estiver ocorrendo
    const exemplo2 = 'O IF/ELSE é uma estrutura de controle condicional em JavaScript. Ela permite que você execute um bloco de código se uma condição for verdadeira (IF) e outro bloco de código se a condição for falsa (ELSE). Por exemplo, você pode usar IF/ELSE para tomar decisões no seu programa';
    output.textContent = exemplo2;
    speak(exemplo2, 0.8, 'Google español de Estados Unidos');
});

mathButton.addEventListener("click", () => {
    stopSpeaking(); // Para a fala anterior, se estiver ocorrendo
    const exemploMath = "A biblioteca Math em JavaScript é usada para realizar operações matemáticas, como: divisão, raiz, log, por ai vai";

    const codigoCompleto = exemploMath;

    output.textContent = codigoCompleto;
    speak(exemploMath, 0.8, 'Google español de Estados Unidos');
});

objectButton.addEventListener("click", () => {
    stopSpeaking(); // Para a fala anterior, se estiver ocorrendo
    const exemploCodigo = 'Em JavaScript, um objeto é uma estrutura de dados que permite armazenar e organizar informações relacionadas entre si. Um objeto é definido usando chaves `{}` e contém propriedades que consistem em pares chave-valor. Você pode acessar as propriedades de um objeto usando a notação ponto ou a notação de colchetes';

    const codigoCompleto = exemploCodigo;

    output.textContent = codigoCompleto;
    speak(exemploCodigo, 0.8, 'Google español de Estados Unidos');
});

tipagemButton.addEventListener("click", () => {
    stopSpeaking();
    const exemploCodigo2 = 'Em JavaScript, a tipagem é fraca, o que significa que as variáveis não têm um tipo de dado fixo e podem mudar dinamicamente durante a execução do programa. Isso permite maior flexibilidade, mas também pode levar a resultados inesperados se não for usado com cuidado';

    const codigoCompleto2 = exemploCodigo2;

    output.textContent = codigoCompleto2;
    speak(exemploCodigo2, 0.8, 'Google español de Estados Unidos');
});

promiseButton.addEventListener("click", () => {
    stopSpeaking();
    const exemploCodigo2 = 'As Promises são promessas (podem ou não ocorrer) e permite o tratamento de operações assíncronas(uma que o programa não precisa esperar até que seja concluida para continuar funcionando) de maneira mais organizada e controlada';

    const codigoCompleto2 = exemploCodigo2;

    output.textContent = codigoCompleto2;
    speak(exemploCodigo2, 0.8, 'Google español de Estados Unidos');
});

funcButton.addEventListener("click", () => {
    stopSpeaking();
    const exemploCodigo2 = 'Em JavaScript, uma função é um pedaço de código que você pode reutilizar para realizar uma tarefa específica. É como uma receita: você dá um nome a um conjunto de passos que quer executar e pode chamá-lo (ou invoca-lo) sempre que precisar realizar essa tarefa';

    const codigoCompleto2 = exemploCodigo2;

    output.textContent = codigoCompleto2;
    speak(exemploCodigo2, 0.8, 'Google español de Estados Unidos');
});

dadosButton.addEventListener("click", () => {
    stopSpeaking();
    const texto = "Em JavaScript, há varios tipos de dados, int para inteiros, por exemplo 1, 2, 3, boolean para booleanos que significa que será verdadeiro ou falso, string para uma sequência de caracteres, já o null seria para valores nulos, undefined para valores não definidos, por ai vai, ao lado um exemplo de código: ";
    
    const exemploCodigo2 = "  ola = 'Ola mundo' ou numeros = [1,2,3,4,5] ou numeroCerto = true ou contador = null e vários outros exemplos";

    const codigoCompleto2 =  texto + "\n" + exemploCodigo2;

    output.textContent = codigoCompleto2;
    speak(texto, 0.8, 'Google español de Estados Unidos');
});

function speak(text, rate = 0.8, voiceName = '', volume = 1.0) {
    if ('speechSynthesis' in window) {
        const synth = window.speechSynthesis;
        const voices = synth.getVoices();

        // Procura uma voz com o nome especificado
        const selectedVoice = voices.find(voice => voice.name === voiceName);

        const voz = new SpeechSynthesisUtterance(text);
        voz.rate = rate;
        voz.volume = volume; // Ajusta o volume da fala aqui

        // Define a voz selecionada
        if (selectedVoice) {
            voz.voice = selectedVoice;
        }

        currentUtterance = voz; // Atualiza a fala atual
        synth.speak(voz);
    } else {
        console.log("Seu navegador não suporta a síntese de fala.");
    }
}

function stopSpeaking() {
    if (currentUtterance) {
        window.speechSynthesis.cancel(); // Cancela a fala atual, se houver
        currentUtterance = null;
    }
}