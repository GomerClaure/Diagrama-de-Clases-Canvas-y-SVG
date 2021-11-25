var cajaActual;
var objetos = [];
var objetoPresionado;
var objetosPresionados = [];
var lista_lineas=[];
var pos = 0;
var objetoActual = null;
var arrastrar = false;
var delta = new Object();
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
let linea=false;
let lineaherencia=false;
var posX=-1;
var posY=-1;


function linea_button(){
    linea=true;
}
function lineaHerencia_button(){
  lineaherencia=true;
}
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
    console.log("entra al else")
    limpiarCanvas();
    objetoActual.clase = [classInput];
    console.log(objetoActual);

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

canvas.addEventListener('click',e=>{
    if(linea){
            console.log(objetosPresionados)
            if(objetoActual != null){
              if(objetosPresionados.length == 0){
                console.log(objetosPresionados)
                console.log(objetoActual)
                objetosPresionados.push(objetoActual);
              }else{
                console.log("entra al else")
                objetoPresionado = objetosPresionados[0]
                if(objetoPresionado.x != objetoActual.x && objetoPresionado.y !=objetoActual.y){
                  console.log(objetosPresionados)
                  objetosPresionados.push(objetoActual);   
                }
              }
            }            
            if(objetosPresionados.length == 2){
              var obj1=objetosPresionados[0];
              var obj2=objetosPresionados[1];
              lista_lineas.push(obj1);
              lista_lineas.push(obj2);      
              ctx.beginPath();
              ctx.moveTo(obj1.x+obj1.width,obj1.y);
              ctx.lineTo(obj2.x, obj2.y);
              ctx.strokeStyle='black';
              ctx.stroke();
              ctx.closePath();
              linea=false;
              objetosPresionados=[];
            }
    }
    else if(lineaherencia){
          if(posX>=0 && posY>=0){
            ctx.beginPath();
            ctx.moveTo(posX,posY);
            ctx.lineTo(e.offsetX,e.offsetY);
            ctx.strokeStyle='black';
            ctx.stroke();
            ctx.closePath();
            lineaherencia=false;
            posX=-1;
            posY=-1;
          }else{
            posX=e.offsetX;
            posY=e.offsetY;
          }
    }
  });