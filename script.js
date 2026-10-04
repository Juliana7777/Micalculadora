// ================== SELECCIÓN DE ELEMENTOS DEL DOM ==================
const pantalla = document.querySelector('#pantalla')

const btnAC = document.getElementById('btnAC')
const btnBorrar = document.getElementById('btnBorrar')
const btnIgual = document.getElementById('btnIgual')

const botonesOperador = document.getElementsByClassName('btn-operador')
const botonesNumero = document.querySelectorAll('.btn-numero')
const todosLosBotones = document.getElementsByTagName('button')


// ================== VARIABLES ==================
let operacion = ''
let ultimoResultado = null


// ================== BUCLE for ==================
let contadorBotones = 0
for (let i = 0 i < todosLosBotones.length i++) {
  contadorBotones = contadorBotones + 1
}
console.log('La calculadora tiene ' + contadorBotones + ' botones')


// ================== CONECTAR BOTONES DE NÚMERO ==================
botonesNumero.forEach(function(boton) {
  boton.addEventListener('click', function() {
    const numero = boton.getAttribute('data-numero')
    agregarNumero(numero)
  })
})


// ================== CONECTAR BOTONES DE OPERADOR (usando while) ==================
let indice = 0
while (indice < botonesOperador.length) {
  const boton = botonesOperador[indice]
  boton.addEventListener('click', function() {
    const operador = boton.getAttribute('data-operador')
    agregarOperador(operador)
  })
  indice = indice + 1
}

btnAC.addEventListener('click', reiniciar)
btnBorrar.addEventListener('click', borrarUltimo)
btnIgual.addEventListener('click', calcular)


// ================== FUNCIONES ==================

function agregarNumero(numero) {
  if (operacion === '' && numero === ',') {
    return
  }
  operacion = operacion + numero
  actualizarPantalla()
}

function agregarOperador(operador) {
  if (operacion === '') {
    return
  }
  const ultimoCaracter = operacion.slice(-1)
  const operadores = ['+', '-', '*', '/', '%']

  if (operadores.includes(ultimoCaracter) && ultimoCaracter !== '') {
    operacion = operacion.slice(0, -1) + operador
  } else {
    operacion = operacion + operador
  }
  actualizarPantalla()
}

function borrarUltimo() {
  operacion = operacion.slice(0, -1)
  actualizarPantalla()
}

function reiniciar() {
  if (operacion === '' || operacion === '0') {
    return
  }
  const usuarioConfirma = confirm('¿Seguro que quieres borrar todo?')
  if (usuarioConfirma) {
    operacion = ''
    actualizarPantalla()
  }
}

function calcular() {
  if (operacion === '') {
    return
  }

  try {
    const operacionValida = operacion.replace(',', '.')
    const resultado = eval(operacionValida)

    let tipo = ''
    if (resultado > 0) {
      tipo = 'positivo'
    } else if (resultado < 0) {
      tipo = 'negativo'
    } else {
      tipo = 'cero'
    }

    ultimoResultado = resultado
    operacion = resultado.toString()
    actualizarPantalla()

  } catch (error) {
    pantalla.textContent = 'Error'
    operacion = ''
  }
}

function actualizarPantalla() {
  const texto = operacion === '' ? '0' : operacion
  pantalla.textContent = texto
  pantalla.setAttribute('data-valor', texto)
}