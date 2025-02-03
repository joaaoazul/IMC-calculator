let btn = document.getElementById("btn").addEventListener("click", showCalculator);
let page = document.getElementById("landing-page");
let calculator = document.getElementById("imc-calc");

function showCalculator() {
  if (!page.classList.contains('hidden')) {
    page.classList.add('hidden');
    calculator.classList.remove('hidden');
    
    // Garante que display:block seja aplicado após a transição
    setTimeout(() => {
      calculator.style.display = "block";
    }, 300); // Duração igual à transição (0.3s)
  }
}


// Função para calcular o IMC
function calcularIMC() {
    let altura = document.getElementById("altura").value;
    let peso = document.getElementById("peso").value;
    let indicador = document.getElementById("indicador");

    altura = altura / 100; // Converter cm para metros

    // Set maximum weight limit
    const maxWeight = 350; // Maximum weight in kg
    if (peso > maxWeight) {
        peso = maxWeight; // Clamp weight to maximum
    }

    if (altura <= 0 || peso <= 0 || isNaN(altura) || isNaN(peso)) {
        document.getElementById("resultado").innerHTML = "Por favor, insira valores válidos.";
        indicador.style.left = "0%"; // Reseta a posição do indicador
        return;
    }

    let imc = peso / (altura * altura);
    imc = imc.toFixed(2);

    let classificacao = "";
    let posicao = 0;

    // Calcular a posição do indicador na barra
    if (imc < 18.5) {
        classificacao = "Abaixo do peso";
        posicao = (imc / 18.5) * 10; // Mapeando o IMC para a barra
    } else if (imc < 24.9) {
        classificacao = "Peso normal";
        posicao = 10 + ((imc - 18.5) / (24.9 - 18.5)) * 25; // Ajuste a posição para o intervalo de Peso Normal
    } else if (imc < 29.9) {
        classificacao = "Sobrepeso";
        posicao = 35 + ((imc - 24.9) / (29.9 - 24.9)) * 25; // Ajuste para Sobrepeso
    } else if (imc < 39.9) {
        classificacao = "Obesidade";
        posicao = 60 + ((imc - 29.9) / (39.9 - 29.9)) * 25; // Ajuste para Obesidade
    } else {
        classificacao = "Obesidade Grave";
        posicao = 85 + ((imc - 39.9) / (maxWeight - 39.9)) * 15; // Ajuste para Obesidade Grave
    }

    // Clamp position to be between 0% and 100%
    posicao = Math.max(0, Math.min(posicao, 97));

    // Exibir resultado e mover o indicador
    document.getElementById("resultado").innerHTML = `IMC: ${imc} - ${classificacao}`;
    indicador.style.left = posicao + "%"; // Posicionar o indicador na barra
}