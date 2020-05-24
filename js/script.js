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

// cores salvas
var divCoresSalvas = document.querySelector('#coresSalvas');
var coresSalvas = [];
var isEditing = false;
var currentIndex = false;


function start() {   

    console.log('iniciei');
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
    console.log('selecionando cores');
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

// converter hex para RGB
function hexToRgb(hex) {
    if (hex == 00000) {
        return {
            r: 0,
            g: 0,
            b: 0
        }
    } else {
            var bigint = parseInt(hex, 16);

            return bigint ? {
                r: (bigint >> 16) & 255,
                g: (bigint >> 8) & 255,
                b: bigint & 255
            } : null;
    }
    
    
}


// função de salvar cor
divCor.addEventListener('click', salvarCor);

function salvarCor() {
    console.log('salvando a cor');

    if (isEditing) {
        coresSalvas[currentIndex] = hexColor;
    } else {
        coresSalvas.push(hexColor);
    }
    
    console.log(coresSalvas);
    isEditing = false;
    render();
}

function render() {
    console.log('iniciando o render');

    function createDeleteImg(index){
        console.log('criando imagem para deletar');
        
        function deleteColor() {
            coresSalvas.splice(index,1);
            console.log('deletando cor');
            render();
        }

        var img = document.createElement('img');
        img.src = './img/trash.png';

        img.addEventListener('click', deleteColor);

        return img;
    }

    function createColor(color, index) {
        console.log('criando a div de cor');

        function editColor(){
            console.log('editando a cor');
                        
            rangeR.value = hexToRgb(color).r;
            rangeG.value = hexToRgb(color).g;
            rangeB.value = hexToRgb(color).b;
            
            inputR.value = hexToRgb(color).r;
            inputG.value = hexToRgb(color).g;
            inputB.value = hexToRgb(color).b;

            changeColor();

            isEditing = true;
            currentIndex = index;
        }
        var divC = document.createElement('div');
        divC.classList.add('divCorSalva');
        divC.style.background = `#${color}`;

        divC.addEventListener('click', editColor);

        return divC;
    }

    function createText (hex) {
        
        console.log('criando o texto da div');
        console.log(hex);

        var ul = document.createElement('ul');
        ul.innerHTML = `
            <li><span>RGB:</span> ${hexToRgb(hex).r}, ${hexToRgb(hex).g}, ${hexToRgb(hex).b}</li>
            <li><span>HEX:</span> #${hex.toUpperCase()}</li>
        `;

        return ul;
    }

    //limpar lista
    console.log('limpando a lista');
    divCoresSalvas.innerHTML = ''

    for (var i = 0; i < coresSalvas.length; i++) {
        console.log('criando os itens da div');

        var currentColor = coresSalvas[i];
        
        var div = document.createElement('div');
        div.classList.add('corSalva');
        div.id = currentColor;

        var ul = createText(currentColor);
        div.appendChild(ul);

        var div2 = createColor(currentColor, i);
        div.appendChild(div2);

        var img = createDeleteImg(i);
        div2.appendChild(img);
        
        divCoresSalvas.appendChild(div);
    }

    console.log('fechando o render');
}