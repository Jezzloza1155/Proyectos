const express=require("express")
const app= express()
const cors=require("cors")
app.use(express.static("public"))
app.use(cors())
app.use(express.json())
const jugadores=[]
class Usuario{
    constructor(id){
        this.id=id
    }
    registrarmokemon(mokemon){
        this.mokemon=mokemon
    }
    actualizarposicion(x,y){
        this.x=x
        this.y=y
    }
    registrarAtaque(ataques){
        this.ataques = ataques
    }
}
class Mokemon{
    constructor(nombre){
        this.nombre=nombre
    }

}

app.get("/unirse",(req,res)=>{
    const id = `${Math.random()}`
    const jugador = new Usuario(id)

    jugadores.push(jugador)
    res.setHeader("Access-Control-Allow-Origin","*")
    res.send(id)
    
})
app.post("/mokemon/:jugadorid",(req,res)=>{
    const jugadorid=req.params.jugadorid || ""
    const nombremokemon=req.body.mokemon || ""
    const mokemon=new Mokemon(nombremokemon)
    const jugadorindex = jugadores.findIndex((jugador)=>jugadorid === jugador.id)
    
    if(jugadorindex>-1){
        jugadores[jugadorindex].registrarmokemon(mokemon)
    }
    res.end()

})
app.post("/mokemon/:jugadorid/posicion",(req,res)=>{
    const jugadorid=req.params.jugadorid || ""
    const x=req.body.x || 0
    const y=req.body.y || 0
    const jugadorindex = jugadores.findIndex((jugador)=>jugadorid === jugador.id)

    if(jugadorindex>=0){
        jugadores[jugadorindex].actualizarposicion(x,y)
    }
    const enemigos = jugadores.filter((jugador) => jugadorid !== jugador.id)
    res.send({
        enemigos
    })

})
app.post("/mokemon/:jugadorid/ataques",(req,res)=>{
    const jugadorid=req.params.jugadorid || ""
    const listaAtaques=req.body.ataques || []
    const jugadorindex = jugadores.findIndex((jugador)=>jugadorid === jugador.id)
    if(jugadorindex>-1){
        jugadores[jugadorindex].registrarAtaque(listaAtaques)
    }
    res.end()

})
app.get("/mokemon/:jugadorid/ataques",(req,res)=>{
    const jugadorid=req.params.jugadorid || ""
    const jugadorindex = jugadores.find((jugador)=>jugadorid === jugador.id)
    res.send({
        ataques:jugadorindex.ataques || []
    })

})
app.listen(8080,()=>{

    console.log("Servidor funcionando")
})