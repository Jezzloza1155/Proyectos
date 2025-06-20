const contenedores=document.getElementById("container")
const ingresar_numero=document.getElementById("ingresar_numero")
const boton_cuadricula= document.getElementById("boton_cuadricula")
let n=16
function random(){
    let min = 0
    let max = 254
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function hacer_cuadricula(n){
    let cuadricula=""
    for (let i = 0; i < n; i++){
         let item=""
        for(let j = 0; j< n; j++){
            item += `<div class="cuadro"></div>`
        }
        cuadricula+=`<div class="filas">${item}</div>`
    }
    
    contenedores.innerHTML=cuadricula

    const cuadros=document.querySelectorAll(".cuadro")

   cuadros.forEach(cuadro => {
        cuadro.addEventListener("mouseenter", () => {
            cuadro.style.backgroundColor = `rgb(${random()}, ${random()}, ${random()})`;
        });
    });
}
hacer_cuadricula(n)

boton_cuadricula.addEventListener("click",()=>{
    n = parseInt(ingresar_numero.value)
    console.log(n)
    hacer_cuadricula(n)
})




