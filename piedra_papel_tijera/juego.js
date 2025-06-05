let humanScore = 0
let computerScore= 0
function aleatorio(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getcomputer(){
    let enemigo = aleatorio(1,3)
    return enemigo
}
function gethumanchoise(){
    let jugador=prompt("ingresa una opcion:\n Piedra\n Papel\n Tijera\n")
    return jugador.toUpperCase()
}
function playRound(humanChoice, computerChoice){
    let opciones =["PAPEL","PIEDRA","TIJERA"];
    console.log("Elección de la computadora (valor):", opciones[computerChoice])
    if(humanChoice===opciones[computerChoice]){
        console.log('Empate')
    }else if(((humanChoice==opciones[0])&&(opciones[computerChoice]=="PIEDRA"))||((humanChoice==opciones[1])&&(opciones[computerChoice]=="TIJERA"))||((humanChoice==opciones[2])&&(opciones[computerChoice])=="PAPEL")){
        console.log(`¡Ganaste! El ${humanChoice} supera a ${opciones[computerChoice]}`)
        humanScore++
    }
    else{
        console.log(`¡Perdes! El ${opciones[computerChoice]} supera a ${humanChoice}`)
        computerScore++
    }   
}
function playGames(){

    for (let index = 0; index < 5; index++) {
        let humanSelection = gethumanchoise();
        let computerSelection = getcomputer();

        playRound(humanSelection, computerSelection - 1);   
    }
    if(humanScore==computerScore){
        console.log("Empate en rondas ganadas")
    }
    else if(humanScore>computerScore){
        console.log("Ganaste las rondas")
    }
    else{
        console.log("Perdiste las rondas")
    }
}
playGames()