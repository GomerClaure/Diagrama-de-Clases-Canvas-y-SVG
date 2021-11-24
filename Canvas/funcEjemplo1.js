var objetos = [];
var objetoActual = null;
var arrastrar = false;
var delta = new Object();
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");


function dibujarRect() {
  for (var i = 0; i < objetos.length; i++) {
    var un_objeto = objetos[i];
    var clase = un_objeto.clase, variables = un_objeto.variables, metodos = un_objeto.metodos;
    let anchoMax = tamMaxCadena(clase.concat(variables, metodos)) * 12;
    var color = un_objeto.color;
    var posTextY = un_objeto.y;
    var altoMax = 5;
    for (let listaValores of [un_objeto.clase, un_objeto.variables,
    un_objeto.metodos]) {
      for (let texto of listaValores) {
        altoMax += 16;
        posTextY += 16;
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.font = '10pt Verdana';
        ctx.fillText(texto, un_objeto.x, posTextY);
      }
      ctx.beginPath();
      ctx.strokeStyle = "color";
      ctx.rect(un_objeto.x, un_objeto.y, anchoMax, altoMax);
      ctx.stroke();
    }
    un_objeto.width = anchoMax;
    un_objeto.height = altoMax;
  }
}


function addClass() {
  console.log(objetoActual);
  var classInput = document.getElementById("input-class").value;
  if (objetoActual === null) {
    objetos.push({
      x: 10, y: 10,
      width: 40, height: 20,
      color: "black",
      clase: [classInput],
      variables: ["var1;"],
      metodos: ["algo();"]
    });
  } else {
    limpiarCanvas();
    objetoActual.name = [classInput];

  }
  dibujarRect();

}


function addVariable() {
  var varInput = document.getElementById("input-var").value;
  if (objetoActual != null) {
    limpiarCanvas();
    var listaDeVar = objetoActual.variables;
    listaDeVar.push(varInput);
    objetoActual.variables = listaDeVar;
    dibujarRect();
  }
}


function addMethod() {
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