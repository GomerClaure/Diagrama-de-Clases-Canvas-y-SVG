
var objetos = [];
var pos = 0;
var objetoActual = null;
var arrastrar = false;
var delta = new Object();
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var posRect = { x1: 160, x2: 100, y1: 10, y2: 40 };

function dibujarRect() {

  for (var i = 0; i < objetos.length; i++) {
    var un_objeto = objetos[i];
    var clase = un_objeto.name;
    var variables = un_objeto.variables;
    var metodos = un_objeto.metodos;
    let anchoMax = tamMaxCadena(clase.concat(variables, metodos)) * 12;
    var color = un_objeto.color
    var alto_clase = 1;
    var posTextoY = un_objeto.y;
    var result = dibujarCaja(color, clase,un_objeto.x,un_objeto.y,posTextoY,anchoMax, alto_clase);
    alto_clase = result.altoMax;
    posTextoY = result.posTextY;
    var result = dibujarCaja(color, variables,un_objeto.x,un_objeto.y,posTextoY,anchoMax, alto_clase);
    alto_clase = result.altoMax;
    posTextoY = result.posTextY;
    var result = dibujarCaja(color, metodos,un_objeto.x,un_objeto.y,posTextoY,anchoMax, alto_clase);
    un_objeto.width = anchoMax;
    un_objeto.height = alto_clase;
  }
}

function dibujarCaja(color, listaTextos, puntoX, puntoY, posTextY, anchoMax, altoMax){
  for (let elemento of listaTextos) {
    altoMax += 16;
    posTextY += 16;
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.font = '10pt Verdana';
    ctx.fillText(elemento, puntoX, posTextY);
  }
  ctx.beginPath();
  ctx.rect(puntoX, puntoY, anchoMax, altoMax);
  ctx.strokeStyle = color;
  ctx.stroke();
  return {
    altoMax: altoMax,
    posTextY: posTextY,
  };
}
function addClass() {
  console.log(objetoActual);
  var classInput = document.getElementById("input-class").value;
  if (objetoActual === null) {
    objetos.push({
      x: 10, y: 10,
      width: 40, height: 20,
      color: "black",
      name: [classInput],
      variables: ["var1;"],
      metodos: ["algo();"]
    });
  } else {
    limpiarCanvas();
    objetoActual.name = [classInput];

  }
  dibujarRect();

}


function addVariable(){
  var varInput = document.getElementById("input-var").value;
  if (objetoActual != null) {
    limpiarCanvas();
    var listaDeVar = objetoActual.variables;
    listaDeVar.push(varInput);
    objetoActual.variables = listaDeVar;
    dibujarRect();
  } 

}

function addMethod(){
  var methodInput = document.getElementById("input-metodo").value;
  if (objetoActual != null) {
    limpiarCanvas();
    var listaDeMetodos = objetoActual.metodos;
    listaDeMetodos.push(methodInput);
    dibujarRect();
  } 

}

canvas.addEventListener("mousedown", function (evt) {
  for (var i = 0; i < objetos.length; i++) {

    if (objetos[i].x < evt.offsetX
      && (objetos[i].width + objetos[i].x > evt.offsetX)
      && objetos[i].y < evt.offsetY
      && (objetos[i].height + objetos[i].y > evt.offsetY)) {

      pos = i;

      console.log("true");
      arrastrar = true;
      delta.x = evt.offsetX - objetos[i].x;
      delta.y = evt.offsetY - objetos[i].y;
      objetoActual = objetos[i];
      break

    } else {
      console.log("entro al else");
      objetoActual = null;
    }
  }
}, false);

canvas.addEventListener("mousemove", function (evt) {

  if (arrastrar == true && objetoActual != null) {

    limpiarCanvas();
    objetoActual.x = evt.offsetX - delta.x;
    objetoActual.y = evt.offsetY - delta.y;
    dibujarRect();
  }
}, false);

canvas.addEventListener("mouseup", function (evt) {
  arrastrar = false;
}, false);


function limpiarCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}


function tamMaxCadena(listaClases) {
  var tamMax = 0;
  for (var cadena of listaClases) {
    if (cadena.length > tamMax) {
      tamMax = cadena.length;
    }
  }
  return tamMax
}