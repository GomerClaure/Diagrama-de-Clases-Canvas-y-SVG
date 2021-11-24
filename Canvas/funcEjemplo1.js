
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
    let achoMAx = tamMaxCadena(clase.concat(variables, metodos)) * 16;

    var alto_clase = 30;
    var posTextoY = un_objeto.y + 28;
    ctx.beginPath();
    ctx.fillStyle = 'red';
    ctx.font = '16pt Verdana';
    ctx.fillText(clase[0], un_objeto.x, posTextoY);
    ctx.beginPath();
    ctx.rect(un_objeto.x, un_objeto.y, achoMAx, alto_clase);
    ctx.strokeStyle = "black";
    ctx.stroke();

    for (let elemento of un_objeto.variables) {
      alto_clase += 30;
      posTextoY += 28;
      ctx.beginPath();
      ctx.fillStyle = 'red';
      ctx.font = '16pt Verdana';
      ctx.fillText(elemento, un_objeto.x, posTextoY);
    }
    ctx.beginPath();
    ctx.rect(un_objeto.x, un_objeto.y, achoMAx, alto_clase);
    ctx.strokeStyle = "black";
    ctx.stroke();

    for (let elemento of un_objeto.metodos) {
      alto_clase += 30
      posTextoY += 28;
      ctx.beginPath();
      ctx.fillStyle = 'red';
      ctx.font = '16pt Verdana';
      ctx.fillText(elemento, un_objeto.x, posTextoY);
    }
    ctx.beginPath();
    ctx.rect(un_objeto.x, un_objeto.y, achoMAx, alto_clase);
    ctx.strokeStyle = "black";
    ctx.stroke();
  }
}


function addClass() {
  console.log(objetoActual);
  var classInput = document.getElementById("input-class").value;
  if (objetoActual === null) {
    objetos.push({
      x: 10, y: 10,
      width: 40, height: 20,
      color: 'black',
      name: [classInput],
      variables: ["var1;", "var2;"],
      metodos: ["algo();"]
    });
  } else {
    limpiarCanvas();
    objetoActual.name = [classInput];

  }
  dibujarRect();

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
      delta.x = evt.clientX - objetos[i].x;
      delta.y = evt.clientY - objetos[i].y;
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
    objetoActual.x = evt.clientX - delta.x;
    objetoActual.y = evt.clientY - delta.y;
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