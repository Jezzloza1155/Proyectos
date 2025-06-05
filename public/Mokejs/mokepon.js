const botonjugadormascota = document.getElementById("boton-mascota");
const boton_reinicion = document.getElementById("boton-reinicio");
const contenedorMokemon = document.getElementById("contenedorMokemon");
const contenedorataques = document.getElementById("contenedorataques");
const Elementoene = document.getElementById("Elementoene");
const vermapa = document.getElementById("vermapa");
const mapa = document.getElementById("mapa");
const seleccionarmascota = document.getElementById("seleccionarmascota");
const combate = document.getElementById("combate");
const imagenplayer = document.getElementById("imagenplayer");
const imagenenemigo = document.getElementById("imagenenemigo");

class Mokemon{
    constructor(nombre,foto,vida,tipo,fotoEnmapa,id=null){
        this.id=id
        this.nombre = nombre;
        this.foto = foto;
        this.vida = vida;
        this.tipo = tipo;
        this.ataques = [];
        this.ancho=40
        this.alto=40
        this.x=aleatorio(0,mapa.width-this.ancho)
        this.y=aleatorio(0,mapa.height-this.alto)
        
        this.mapafoto=new Image()
        this.mapafoto.src=fotoEnmapa
        this.velocidadx=0
        this.velocidady=0
    }
    pintarmokemon(){
        lienzo.drawImage(
            this.mapafoto,
            this.x,
            this.y,
            this.ancho,
            this.alto,
        );
    }
}


let dogbemon = new Mokemon("Dogbemon","./assets/OsoPlant.png",5,"tierra","./assets/Pokebolpllant.png");
let piquemon = new Mokemon("Piquemon","./assets/Foxfire.png",5,"fuego","./assets/Pokebolfire.png");
let optomon = new Mokemon("Optomon","./assets/Aguilawater.png",5,"agua","./assets/Pokebolwater.png")
let listaenemigos=[];
let listpets = [];
let enemigoId=null
let mascotatype;
let mascotaenemigo;
let opcionesMokemons
let opcionesataques
let inputdogbemon
let inputoptomon
let inputpiquemon
let botonagua
let botonfuego
let botontierra
let botonataques = []
let mascotajugador
let secuenciajugador=[]
let ataquesEnenmigo=[]
let secuenciaenemiga= []
let lienzo = mapa.getContext("2d")
let intervalo
let mapabackground = new Image()
mapabackground.src = "./assets/mapamokemon.jpg"
let anchomapa = window.innerWidth-20
let jugadorid = null
const anchomax = 550
if(anchomapa>anchomax){
    anchomapa=anchomax
}
mapa.height= anchomapa*600/800    
mapa.width= anchomapa

dogbemon.ataques.push(
    {nombre:"Tierra",id:"tierra",foto:"./assets/tierra.png"},
    {nombre:"Tierra",id:"tierra",foto:"./assets/tierra.png"},
    {nombre:"Agua",id:"agua",foto:"./assets/agua.png"},
    {nombre:"Fuego",id:"fuego",foto:"./assets/fuego.png"},
)

optomon.ataques.push(
    {nombre:"Agua",id:"agua",foto:"./assets/agua.png"},
    {nombre:"Agua",id:"agua",foto:"./assets/agua.png"},
    {nombre:"Fuego",id:"fuego",foto:"./assets/fuego.png"},
    {nombre:"Tierra",id:"tierra",foto:"./assets/tierra.png"},
)

piquemon.ataques.push(
    {nombre:"Fuego",id:"fuego",foto:"./assets/fuego.png"},
    {nombre:"Fuego",id:"fuego",foto:"./assets/fuego.png"},
    {nombre:"Agua",id:"agua",foto:"./assets/agua.png"},
    {nombre:"Tierra",id:"tierra",foto:"./assets/tierra.png"},
)

listpets.push(dogbemon,piquemon,optomon);

function iniciarpag(){
    
    vermapa.style.display="none"
    combate.style.display="none"

    listpets.forEach((mokemon)=>{
        opcionesMokemons =`<input type="radio"  name="mascota" id=${mokemon.nombre} />
                <label class="tarjetamokemon" for=${mokemon.nombre}>
                    <p>${mokemon.nombre}</p>
                    <img src=${mokemon.foto} alt=${mokemon.nombre}>    
                </label>`
        contenedorMokemon.innerHTML += opcionesMokemons;
        
        inputdogbemon=document.getElementById("Dogbemon");
        inputpiquemon=document.getElementById("Piquemon");        
        inputoptomon=document.getElementById("Optomon");
    }) 
    botonjugadormascota.addEventListener('click',function() {selecionp1pets();});
    
    boton_reinicion.addEventListener("click",function(){reiniciarCombate()});
    UnirseAlJuego()
    
}   
function UnirseAlJuego(){
    fetch("http://192.168.1.108:8080/unirse")
        .then(function(res){
            if(res.ok){
                res.text()
                    .then(function(respuesta){
                        console.log(respuesta)
                        jugadorid=respuesta
                    })
            }

        })
}
function aleatorio(min, max){
    let num = Math.floor(Math.random()*(max-min+1)+min);
    return num

}

function selecenemipets(enemigo){  
    mascotaenemigo=enemigo
    ataquesEnenmigo=mascotaenemigo.ataques; 
    document.getElementById("petsenemigo").innerHTML = mascotaenemigo.nombre;
    document.getElementById("vidaene").innerHTML = mascotaenemigo.vida;
    let contenedorimagenenemigo
    contenedorimagenenemigo =`<img src=${mascotaenemigo.foto} alt=${mascotaenemigo.nombre} >`
    imagenenemigo.innerHTML += contenedorimagenenemigo
    
    
}
function iniciarmapa(){
    
    intervalo=setInterval(dibujarmapa,50)
    window.addEventListener("keydown",presionteclado);
    window.addEventListener("keyup",detenermovimiento);
}
function imprimirplayer(){

    let contenedorimagen
    document.getElementById("vidajuga").innerHTML = mascotatype.vida;
    contenedorimagen =`<img src=${mascotatype.foto} alt=${mascotatype.nombre} >`
    imagenplayer.innerHTML+=contenedorimagen

}
function selecionp1pets(){

    mascotajugador= null;
        if(inputdogbemon.checked){
            mascotajugador=inputdogbemon.id;
             
        }
        
        else if(inputpiquemon.checked){
            mascotajugador=inputpiquemon.id;
             
        }
        
        else if(inputoptomon.checked){
            mascotajugador=inputoptomon.id;
             
        }
        else{
            return 0;
        }
        document.getElementById("petsjugador").innerHTML=mascotajugador;
        selecionmokemonbakend(mascotajugador)
        extraerataque(mascotajugador);
        iniciarmapa();
        vermapa.style.display="flex"
        seleccionarmascota.style.display="none"
        secuenciaAtaque();
        imprimirplayer(); 
        
        boton_reinicion.disabled=true;
        
}
function selecionmokemonbakend(mascotajugador){
    fetch(`http://192.168.1.108:8080/mokemon/${jugadorid}`,{
        method:"post",    
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            mokemon:mascotajugador
        })
        
    })

}
function checkedcolition(enemigo){
    const mascotatyperight = mascotatype.x + mascotatype.ancho
	const mascotatypeleft = mascotatype.x
	const mascotatypetop = mascotatype.y
	const mascotatypebottom = mascotatype.y + mascotatype.alto
    const enemigoright = enemigo.x + enemigo.ancho
	const enemigoleft = enemigo.x
	const enemigotop = enemigo.y
	const enemigobottom = enemigo.y + enemigo.alto

    if((mascotatypetop>enemigobottom)||(mascotatypebottom<enemigotop)||(mascotatyperight < enemigoleft)||(mascotatypeleft>enemigoright)){
        return
    }else{
        console.log("Hay colicion")
        enemigoId=enemigo.id
        detenermovimiento()
        selecenemipets(enemigo);
        vermapa.style.display="none"
        combate.style.display="flex"
        clearInterval(intervalo)
    }
}
function dibujarmapa(){

    mascotatype.x=mascotatype.x+mascotatype.velocidadx
    mascotatype.y=mascotatype.y+mascotatype.velocidady
    lienzo.clearRect(0,0,mapa.width,mapa.height)
    lienzo.drawImage(
        mapabackground,
        0,0,
        mapa.width,
        mapa.height
    )
    mascotatype.pintarmokemon()
    enviarPosicion(mascotatype.x,mascotatype.y)
    listaenemigos.forEach(function(mokemon){
        mokemon.pintarmokemon()
        checkedcolition(mokemon)
    })


}

function enviarPosicion(x, y) {
    fetch(`http://192.168.1.108:8080/mokemon/${jugadorid}/posicion`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    })
    .then(function (res) {
        if (res.ok) {
            res.json()
                .then(function ({ enemigos }) {
                    console.log("Datos de enemigos recibidos del servidor:", enemigos); 
                    listaenemigos=enemigos.map(function (enemigo) {
                        let mokeponEnemigo = null
                        const mokeponNombre = enemigo.mokemon.nombre || ""
                        
                        if (mokeponNombre === "Dogbemon") {
                           mokeponEnemigo = new Mokemon("Dogbemon","./assets/OsoPlant.png",5,"tierra","./assets/Pokebolpllant.png",enemigo.id);
                        } else if (mokeponNombre === "Piquemon") {
                            mokeponEnemigo = new Mokemon("Piquemon","./assets/Foxfire.png",5,"fuego","./assets/Pokebolfire.png",enemigo.id);
                        } else if (mokeponNombre === "Optomon") {
                            mokeponEnemigo = new Mokemon("Optomon","./assets/Aguilawater.png",5,"agua","./assets/Pokebolwater.png",enemigo.id)

                        }
                        mokeponEnemigo.x = enemigo.x
                        mokeponEnemigo.y = enemigo.y
                        return mokeponEnemigo
                    })
                })
        }
    })
}
function detenermovimiento(){
    mascotatype.velocidadx=0
    mascotatype.velocidady=0
}
function moverabajo(){
    mascotatype.velocidady=5

}
function moverizquierda(){
    mascotatype.velocidadx=-5

}
function moverarriba(){
    mascotatype.velocidady=-5

}
function moverderecha(){
    mascotatype.velocidadx=5

}

function extraerataque(mascotajugador){
    let ataques;
    for (let i = 0; i < listpets.length; i++) {
       if(mascotajugador===listpets[i].nombre){
            ataques = listpets[i].ataques
            mascotatype = listpets[i]

       }
    }
    mostrarataques(ataques);
}
function mostrarataques(ataques){
    ataques.forEach((ataque) => {
        opcionesataques = `<button id=${ataque.id} class="tarjetaelemento BAtaque">${ataque.nombre}</button> `
        contenedorataques.innerHTML += opcionesataques
    }) 
        botonagua = document.getElementById("agua")
        botonfuego = document.getElementById("fuego")
        botontierra = document.getElementById("tierra")
        botonataques = document.querySelectorAll(".BAtaque")
       
}
function enviarataque(){
    fetch(`http://192.168.1.108:8080/mokemon/${jugadorid}/ataques`,{
        method: "post",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            ataques: secuenciajugador
        })
    })
    intervalo=setInterval(obtenerAtaques,50)

}
function obtenerAtaques(){
    fetch(`http://192.168.1.108:8080/mokemon/${enemigoId}/ataques`)
        .then(function(res){
            if(res.ok){
                res.json()
                    .then(function({ataques}){
                        if(ataques.length===4){
                            secuenciaenemiga=ataques
                            etapacombate()
                        }
                    })
            }
        })
       
}
function secuenciaAtaque(){
    
    botonataques.forEach((boton) => {
        boton.addEventListener("click",(e)=>{
            const ataque = e.target.textContent;
            secuenciajugador.push(ataque);
            boton.style.background = "#112f58";
            boton.style.color = "white"
            boton.disabled = true;
            if(secuenciajugador.length===4){
                enviarataque()
            }
        });
    });
   
}
function imprimirataques(i){
    let Elementoene=document.getElementById("Elementoene")
    let Elementoju=document.getElementById("Elementoju")

    let parrafo1=document.createElement("p")
    let parrafo2=document.createElement("p")

    parrafo1.innerHTML = secuenciajugador[i]
    parrafo2.innerHTML = secuenciaenemiga[i]


    Elementoju.appendChild(parrafo1)
    Elementoene.appendChild(parrafo2)

}
function etapacombate(){
    clearInterval(intervalo)
    if(secuenciajugador.length === mascotatype.ataques.length&&secuenciajugador.length === secuenciaenemiga.length){
        console.log(secuenciajugador, secuenciaenemiga)
        for (let i = 0; i < secuenciajugador.length; i++) {
            imprimirataques(i)
            if(secuenciajugador[i] === secuenciaenemiga[i]){
                mascotatype.vida=mascotatype.vida-1
                mascotaenemigo.vida=mascotaenemigo.vida-1
            }else if(((secuenciajugador[i]==="Fuego")&&(secuenciaenemiga[i]==="Tierra"))||((secuenciajugador[i]==="Agua")&&(secuenciaenemiga[i]==="Fuego"))||((secuenciajugador[i]==="Tierra")&&(secuenciaenemiga[i]==="Agua"))){
                mascotaenemigo.vida=mascotaenemigo.vida-1
            }else{
                mascotatype.vida=mascotatype.vida-1
            }
            console.log(mascotatype.vida,mascotaenemigo.vida)
        }
        document.getElementById("vidajuga").innerHTML=mascotatype.vida;
        document.getElementById("vidaene").innerHTML=mascotaenemigo.vida;
        if(mascotatype.vida==mascotaenemigo.vida){
            boton_reinicion.disabled=false
            document.getElementById("reslt-cbt").innerHTML="Empate"
        }
        else if(mascotatype.vida>mascotaenemigo.vida){
            boton_reinicion.disabled=false
            document.getElementById("reslt-cbt").innerHTML="Ganaste"
        }else{
            boton_reinicion.disabled=false
            document.getElementById("reslt-cbt").innerHTML="Perdiste"
        }
    }
}
function presionteclado(event){
    switch(event.key){
        case "a" : 
            moverizquierda()   
        break;
        case "s" : 
            moverabajo() 
        break;
        case "d" : 
            moverderecha() 
        break;
        case "w" :
            moverarriba() 
        break;

        default: break;
    }
}

function reiniciarCombate() {
    // Reiniciar la vida del jugador y del enemigo
   location.reload();
}

window.addEventListener("load",iniciarpag); //inicio de la pagina cuando carga

