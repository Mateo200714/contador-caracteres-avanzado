//variables globales
const codeTextarea = document.getElementById('textarea');
const lineNumbers = document.querySelector('.lineas-numeros');

globalThis.addEventListener('load', () => {
    ResizeTextarea()
    UpdateLineNumbers()
    UpdateEditorCounters()
})
//textarea events
{
    globalThis.addEventListener('resize', ResizeTextarea)
    function ResizeTextarea() {
        const window_height = globalThis.innerHeight
        codeTextarea.style.minHeight = (window_height - 22) + 'px'
        lineNumbers.style.minHeight = (window_height - 22) + 'px'
        document.getElementsByClassName("div-contenedor-textarea")[0].style.maxHeight = (window_height - 22) + 'px'
    }

    codeTextarea.addEventListener('input', () => {
        UpdateLineNumbers()
        UpdateLineNumbersFocus()
        UpdateEditorCounters()
    })
    codeTextarea.addEventListener('click', () => {
        UpdateLineNumbers()
        UpdateLineNumbersFocus()
    })
}
//barra contador de linea actual textarea
function UpdateLineNumbers() {
    const lines = codeTextarea.value.split('\n')
    const lineNumbersContent = lines.map((_, index) => index + 1).join('\n')
    lineNumbers.textContent = lineNumbersContent
    codeTextarea.style.height = (lines.length * 22.4) + "px"
}
function UpdateLineNumbersFocus() {
    const content = codeTextarea.value
    const cursorPosition = codeTextarea.selectionStart
    const lines = content.substr(0, cursorPosition).split('\n')
    const currentLine = (lines.length === 0) ? 1 : lines.length

    lineNumbers.innerHTML = lineNumbers.innerHTML.replace(currentLine, `<font class='line-focus'>${currentLine}</font>`)
}
function UpdateEditorCounters() {
    const text = document.getElementById("textarea").value
    document.getElementById('editor-counter-paragraph').innerText = CouterParagraphs(text)
    document.getElementById('editor-counter-line').innerText = CouterLine(text)
    document.getElementById('editor-counter-character').innerText = CouterCharacter(text)
    document.getElementById('editor-counter-word').innerText = CouterWord(text)
}
//counters(simple)
{
    function CouterCharacter(text) {
        const TotalCharacters = text.replaceAll(' ', '').replaceAll(/\n/g, '').length
        return TotalCharacters
    }
    function CouterLetter(text) {
        const TotalLetter = text.replaceAll(' ', '').replaceAll(/[^a-zA-ZáéíóúüñÁÉÍÓÚÜÑ]/g, '').length
        return TotalLetter
    }
    function CouterNumber(text) {
        const TotalNumbers = text.replaceAll(' ', '').replaceAll(/[^0-9]/g, '').length
        return TotalNumbers
    }
    function CouterSymbol(text) {
        const TotalSymbols = text.replaceAll(' ', '').replaceAll(/[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ0-9]/g, '').length
        return TotalSymbols
    }
    function CouterSpace(text) {
        const TotalSpaces = text.replaceAll(/[^ ]/g, '').length
        return TotalSpaces
    }
    function CouterWord(text) {
        if (text === '') {
            return 0
        }
        else {
            const TotalWords = text.replaceAll(/[^a-zA-ZáéíóúüñÁÉÍÓÚÜÑ0-9 \n]/g, '').replaceAll(/\n/g, ' ').replaceAll(/ +/g, ' ').trim().split(' ').length
            return TotalWords
        }
    }
    function CouterLine(text) {
        const TotalLines = text.split('\n').length
        return TotalLines
    }
    function CouterParagraphs(text) {
        if (text.length === 0) {
            return 0
        }
        else {
            const TotalParagraphs = text.split(/\n\n+[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ0-9]/g).length
            return TotalParagraphs
        }
    }
}
//counters(advanced)
{
    function CounterCharacteresMostRepeat(text) {
        let LettersRepeat = [],//[]-->0:caracter, 1:veces repetida
            NumbersRepeat = [],
            SymbolsRepeat = []
        //contar caracteres
        const textCopy = text.replaceAll(' ', '').replaceAll(/\n/g, '').split('').forEach((e) => {
            if (/[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ]/g.test(e)) {
                const index = LettersRepeat.findIndex((element) => element[0] === e)
                if (index === -1) {
                    LettersRepeat.push([e, 1])
                }
                else {
                    LettersRepeat[index][1]++
                }
            }
            else if (/[0-9]/g.test(e)) {
                const index = NumbersRepeat.findIndex((element) => element[0] === e)
                if (index === -1) {
                    NumbersRepeat.push([e, 1])
                }
                else {
                    NumbersRepeat[index][1]++
                }
            }
            else {
                const index = SymbolsRepeat.findIndex((element) => element[0] === e)
                if (index === -1) {
                    SymbolsRepeat.push([e, 1])
                }
                else {
                    SymbolsRepeat[index][1]++
                }
            }
        })
        //ordenar por mas repetidos
        LettersRepeat.sort((a, b) => b[1] - a[1]);
        NumbersRepeat.sort((a, b) => b[1] - a[1]);
        SymbolsRepeat.sort((a, b) => b[1] - a[1]);
        //recoger los 10 mas repetidos de cada caso
        let LettersMostRepeat = [],
            NumbersMostRepeat = [],
            SymbolsMostRepeat = []
        for (let i = 0; i < 10; i++) {
            LettersMostRepeat.push(LettersRepeat[i])
            NumbersMostRepeat.push(NumbersRepeat[i])
            SymbolsMostRepeat.push(SymbolsRepeat[i])
        }
        return {
            LettersMostRepeat,
            NumbersMostRepeat,
            SymbolsMostRepeat
        }
    }
}
//opciones (herramientas)
function UpdateDataCounters() {
    const text = document.getElementById("textarea").value
    //simple
    document.getElementById('text-counter-character').innerText = '( ' + CouterCharacter(text) + ' )'
    document.getElementById('text-counter-letter').innerText = '( ' + CouterLetter(text) + ' )'
    document.getElementById('text-counter-number').innerText = '( ' + CouterNumber(text) + ' )'
    document.getElementById('text-counter-symbol').innerText = '( ' + CouterSymbol(text) + ' )'
    document.getElementById('text-counter-space').innerText = '( ' + CouterSpace(text) + ' )'
    document.getElementById('text-counter-word').innerText = '( ' + CouterWord(text) + ' )'
    //advenced
    document.getElementById('text-counter-most-repeat-letter').innerHTML = ''
    document.getElementById('text-counter-most-repeat-number').innerHTML = ''
    document.getElementById('text-counter-most-repeat-symbol').innerHTML = ''
    let lista = CounterCharacteresMostRepeat(text);
    //letras
    for (let i = 0; i < lista.LettersMostRepeat.length; i++) {
        if (lista.LettersMostRepeat[i] !== undefined) {
            document.getElementById('text-counter-most-repeat-letter').innerHTML += `<span>${i + 1}º ${lista.LettersMostRepeat[i][0]} <font>( ${lista.LettersMostRepeat[i][1]} )</font></span>`
        }
        else {
            break
        }
    }
    //numeros
    for (let i = 0; i < lista.NumbersMostRepeat.length; i++) {
        if (lista.NumbersMostRepeat[i] !== undefined) {
            document.getElementById('text-counter-most-repeat-number').innerHTML += `<span>${i + 1}º ${lista.NumbersMostRepeat[i][0]} <font>( ${lista.NumbersMostRepeat[i][1]} )</font></span>`
        }
        else {
            break
        }
    }
    //simbolos
    for (let i = 0; i < lista.SymbolsMostRepeat.length; i++) {
        if (lista.SymbolsMostRepeat[i] !== undefined) {
            document.getElementById('text-counter-most-repeat-symbol').innerHTML += `<span>${i + 1}º ${lista.SymbolsMostRepeat[i][0]} <font>( ${lista.SymbolsMostRepeat[i][1]} )</font></span>`
        }
        else {
            break
        }
    }
}
//actualizar datos
document.getElementById("actualizar-herramientas").addEventListener('click', UpdateDataCounters)

//esconder mostrar listas
const listas_datos = document.querySelectorAll('.titulo-lista')
const contenido_lista = document.querySelectorAll('.contenido-lista')
for (let i = 0; i < listas_datos.length; i++) {
    listas_datos[i].addEventListener('click', () => {
        const display_elemento = window.getComputedStyle(contenido_lista[i]).getPropertyValue('display')
        if (display_elemento === 'none') {
            contenido_lista[i].style.display='grid'
        }
        else if (display_elemento === 'grid') {
            contenido_lista[i].style.display='none'
        }
    });
}
const listas_interior_datos = document.querySelectorAll('.titulo-lista-interior')
const contenido_lista_interior = document.querySelectorAll('.contenido-lista-interior')
for (let i = 0; i < listas_interior_datos.length; i++) {
    listas_interior_datos[i].addEventListener('click', () => {
        const display_elemento = window.getComputedStyle(contenido_lista_interior[i]).getPropertyValue('display')
        if (display_elemento === 'none') {
            contenido_lista_interior[i].style.display = 'grid'
        }
        else if (display_elemento === 'grid') {
            contenido_lista_interior[i].style.display = 'none'
        }
    });
}

