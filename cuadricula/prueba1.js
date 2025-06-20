const contenedores = document.getElementById("container");
    
    // Asumiendo que obtienes 'n' de tu input (lo haremos más abajo)
    let n = 5; // Valor por defecto

    // Función para generar un número aleatorio entre 0 y 254
    function random() {
        let min = 0;
        let max = 254;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Función para oscurecer un color RGB (mantienes la que ya tienes)
    function darkenColor(r, g, b, amount = 0.15) {
        const factor = 1 - amount; 
        let newR = Math.floor(r * factor);
        let newG = Math.floor(g * factor);
        let newB = Math.floor(b * factor);
        newR = Math.max(0, newR);
        newG = Math.max(0, newG);
        newB = Math.max(0, newB);
        return `rgb(${newR}, ${newG}, ${newB})`;
    }

    // Función auxiliar para parsear un string RGB a sus componentes
    function parseRgbString(rgbString) {
        const matches = rgbString.match(/\d+/g);
        if (matches && matches.length === 3) {
            return matches.map(Number);
        }
        return [0, 0, 0];
    }

    function hacer_cuadricula(gridSize) { // Recibe el tamaño de la cuadrícula como argumento
        n = gridSize; // Actualiza 'n' con el tamaño recibido
        let cuadriculaHTML = "";

        // Calcular el tamaño de cada cuadro
        // Tomamos el ancho del contenedor y lo dividimos por el número de cuadros por fila (gridSize)
        // Restamos 2px por cada borde (1px izquierda + 1px derecha) para asegurar que quepan correctamente
        // Si tienes bordes en los cuadros, esto es importante. Si no, puedes omitir la resta.
        const containerWidth = contenedores.clientWidth; // Ancho real del contenedor
        const itemSize = (containerWidth / gridSize) - 2; // -2 por los bordes de 1px a cada lado

        for (let i = 0; i < n; i++) {
            let filaHTML = "";
            for (let j = 0; j < n; j++) { // Usamos 'n' para m también, asumiendo que es n x n
                // Aplicamos el estilo directamente en línea para el ancho y alto
                filaHTML += `<div class="cuadro" 
                                 data-original-color="#f0f0f0" 
                                 style="width: ${itemSize}px; height: ${itemSize}px;">
                                 (${i},${j})
                             </div>`;
            }
            cuadriculaHTML += `<div class="filas">${filaHTML}</div>`;
        }
        contenedores.innerHTML = cuadriculaHTML;

        const cuadros = document.querySelectorAll(".cuadro");

        cuadros.forEach(cuadro => {
            cuadro.style.backgroundColor = cuadro.dataset.originalColor; // Establece el color inicial

            cuadro.addEventListener("mouseenter", () => {
                const currentColor = cuadro.style.backgroundColor;
                const [r, g, b] = parseRgbString(currentColor);
                const newDarkColor = darkenColor(r, g, b, 0.15);
                cuadro.style.backgroundColor = newDarkColor;
            });

            cuadro.addEventListener("mouseleave", () => {
                cuadro.style.backgroundColor = cuadro.dataset.originalColor; 
            });
        });
    }

    // --- Lógica para obtener el número del input y generar la cuadrícula ---

    const inputNumero = document.getElementById("ingresar_numero");
    const btnGenerar = document.getElementById("btnGenerar"); // Asume que tienes un botón con este ID

    // Valor inicial de la cuadrícula al cargar la página
    hacer_cuadricula(n); 

    if (btnGenerar) {
        btnGenerar.addEventListener("click", () => {
            const valorIngresado = parseInt(inputNumero.value);
            if (!isNaN(valorIngresado) && valorIngresado > 0) {
                // Llama a hacer_cuadricula con el nuevo tamaño
                hacer_cuadricula(valorIngresado); 
            } else {
                alert("Por favor, ingrese un número válido y positivo (ej. 1-100).");
            }
        });
    }