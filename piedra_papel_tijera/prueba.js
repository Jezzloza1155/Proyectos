function invertir(palabra){
    let invertir = ""
    for (let index = palabra.length-1; index >= 0 ; index--) {
        invertir = invertir + palabra[index];
        
    }
    console.log(palabra.length-1)
    return invertir
}
console.log(invertir("Hola como estas"))