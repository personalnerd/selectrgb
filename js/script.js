window.addEventListener('load', start);

// ranges
var rangeR = document.querySelector('#rRed');
var rangeG = document.querySelector('#rGreen');
var rangeB = document.querySelector('#rBlue');

// inputs
var inputR = document.querySelector('#tRed');
var inputG = document.querySelector('#tGreen');
var inputB = document.querySelector('#tBlue');

// div de seleção de cor
var divCor = document.querySelector('#divCor');

// cores
var r = rangeR.value;
var g = rangeG.value;
var b = rangeB.value;
var hexColor = null;

// exibir a cor hexadecimal
var hColor = document.querySelector('#hexColor');


function start() {
    // colocar os valores iniciais dos ranges nos inputs
    inputR.value = r;
    inputG.value = g;
    inputB.value = b;

    // eventlistener para ação em caso de manipulação do range
    rangeR.addEventListener('input',changeColor);
    rangeG.addEventListener('input',changeColor);
    rangeB.addEventListener('input',changeColor);

    // função de atualização de cor
    changeColor();
}

function changeColor() {
    // pega o valor modificado do range e adiciona nas variáveis r g b
    r = rangeR.value;
    g = rangeG.value;
    b = rangeB.value;

    // pega os valores das variáveis e coloca nos inputs
    inputR.value = r;
    inputG.value = g;
    inputB.value = b;

    // com os valores atualizados, atualizar a div de seleção de cor
    divCor.style.backgroundColor = `rgb(${r},${g},${b})`;

    // converter em hexadecimal
    var red = rgbToHex(r);
    var green = rgbToHex(g);
    var blue = rgbToHex(b);
    hexColor = red+green+blue;

    // exibe a cor Hexadecimal
    hColor.innerHTML = `#${hexColor.toUpperCase()}`;
}

// converter as cores individuais em hexadecimal
function rgbToHex(cor) { 
    var hex = Number(cor).toString(16);
    if (hex.length < 2) {
         hex = "0" + hex;
    }
    return hex;
};