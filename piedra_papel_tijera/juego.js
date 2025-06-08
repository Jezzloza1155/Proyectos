const piedra = document.getElementById("boton-piedra")
const tijera = document.getElementById("boton-tijera")
const papel = document.getElementById("boton-papel")
const seleccion = document.querySelector("#seleccion")
const desicion = document.getElementById("desicion")
const mensaje_jugador=document.querySelector(".jugador")
const mensaje_enemigo=document.querySelector(".enemigo")
const registro=document.querySelector(".registro")

let humanScore = 0
let computerScore= 0
function aleatorio(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getcomputer(){
    let enemigo = aleatorio(0,2)
    return enemigo
}
function gethumanchoise(){
    piedra.addEventListener("click",()=>{playRound("PIEDRA")})
    tijera.addEventListener("click",()=>{playRound("TIJERA")})
    papel.addEventListener("click",()=>{playRound("PAPEL")})
}
function mensajes(jugador,enemigo,etapa){
    let palabrajugador=document.createElement("p")
    let palabraenemigo=document.createElement("p")
    let palabraregistro=document.createElement("p")

    palabrajugador.innerHTML=jugador
    palabraenemigo.innerHTML=enemigo
    palabraregistro.innerHTML=etapa

    mensaje_jugador.appendChild(palabrajugador)
    mensaje_enemigo.appendChild(palabraenemigo)
    registro.appendChild(palabraregistro)
}
function playRound(humanChoice){
    let computerChoice = getcomputer()
    let opciones =["PAPEL","PIEDRA","TIJERA"];

    console.log("Elección de la computadora (valor):", opciones[computerChoice])
    if(humanChoice===opciones[computerChoice]){
        mensajes(humanChoice,opciones[computerChoice],"Empate")
    }else if(((humanChoice==opciones[0])&&(opciones[computerChoice]=="PIEDRA"))||((humanChoice==opciones[1])&&(opciones[computerChoice]=="TIJERA"))||((humanChoice==opciones[2])&&(opciones[computerChoice])=="PAPEL")){
        mensajes(humanChoice,opciones[computerChoice],"Vencedor")
        humanScore++
    }
    else{
        mensajes(humanChoice,opciones[computerChoice],"Derrota")
        computerScore++
    } 
    if(humanScore==5 || computerScore == 5){
        piedra.disabled=true
        tijera.disabled=true
        papel.disabled=true
        if(humanScore==computerScore){
            desicion.innerHTML="Has Empatado con tu rival"
        }
        else if(humanScore>computerChoice){
            desicion.innerHTML="Has ganado"
        }
        else{
            desicion.innerHTML="has perdido"
        }
        //seleccion.display.style="none"
    }  
}
gethumanchoise()