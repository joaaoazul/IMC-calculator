function landingPage(){
 document.getElementById('clica').addEventListener('click', 'keydown', function(event){
    if(event.key === 'Enter'){
        display.
 }});
}



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
        posicao = (imc - 10) / 30 * 100; // Mapeando o IMC para a barra
    } else if (imc < 24.9) {
        classificacao = "Peso normal";
        posicao = (imc - 18.5) / 6.4 * 100 + 10; // Ajuste a posição para o intervalo de Peso Normal
    } else if (imc < 29.9) {
        classificacao = "Sobrepeso";
        posicao = (imc - 24.9) / 5 * 100 + 35; // Ajuste para Sobrepeso
    } else if (imc < 39.9) {
        classificacao = "Obesidade";
        posicao = (imc - 29.9) / 10 * 100 + 60; // Ajuste para Obesidade
    } else {
        classificacao = "Obesidade Grave";
        posicao = (imc - 39.9) / 5 * 100 + 85; // Ajuste para Obesidade Grave
    }

    // Clamp position to be between 0% and 100%
    posicao = Math.max(0, Math.min(posicao, 97));

    // Exibir resultado e mover o indicador
    document.getElementById("resultado").innerHTML = `IMC: ${imc} - ${classificacao}`;
    indicador.style.left = posicao + "%"; // Posicionar o indicador na barra
}

// Add event listeners for Enter key
document.getElementById("altura").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        calcularIMC(); // Call the function directly
    }
});

document.getElementById("peso").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        calcularIMC(); // Call the function directly
    }
});
