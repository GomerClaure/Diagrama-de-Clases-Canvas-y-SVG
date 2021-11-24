// const SVG_NS = "svg";
// let objeto = {
//   x: 25,
//   y: 5,
//   width: 100,
//   height: 50,
//   stroke: "black",
//   fill: "gold"
// };
// function dibuja(){
//   let rectangulo = dibujarElementoSVG(objeto, "rect", "elSVG");
// }

// function dibujarElementoSVG(objeto, nombreElemento, elementoPadre) {
//   let elemento = document.createElementNS(SVG_NS, nombreElemento);
//   for (var nombre in objeto) {
//     if (objeto.hasOwnProperty(nombre)) {
//       elemento.setAttributeNS(null, nombre, objeto[nombre]);
//     }
//   }
//   elementoPadre.appendChild(elemento);
//   //opcional: la función devuelve el elemento creado para poder utilizarlo más tarde
//   return elemento;
// }
var figurita = null; 
function dibujar(){
  const container = document.getElementById("elSVG");
  const circle = document.createElementNS("http://www.w3.org/2000/svg","circle");
  circle.setAttribute("cx", 0 );
  circle.setAttribute("cy", 20 );
  circle.setAttribute("r", 20);
  console.log(circle.cx.baseVal.value)
  circle.onmouseup = function(eve){
    figurita = circle;
  };

  container.onmousemove  = function(eve){
    reescalarIncrementar(eve,circle)
  };
  
  container.appendChild(circle);
}
function reescalarIncrementar(evento, objeto){
  
  if(figurita != null){
    console.log("Holitas");
    var nuevo_cx = objeto.cx.baseVal.value+evento.movementX/2;
    var nuevo_cy = objeto.cy.baseVal.value+evento.movementY/2;
   
    objeto.setAttribute("cx",nuevo_cx);
    objeto.setAttribute("cy",nuevo_cy);
    console.log("psx="+evento.screenX+" psy="+evento.screenY);
  }
}

canvas.addEventListener("mousedown", function(evt) {
  for (var i = 0; i < objetos.length; i++) {
      if (objetos[i].x < evt.offsetX
          && (objetos[i].width + objetos[i].x > evt.offsetX)
          && objetos[i].y < evt.offsetY
          && (objetos[i].height + objetos[i].y > evt.offsetY) ){
          pos = i;
          objetoActual =objetos[i];
          arrastrar = true;
          delta.x = evt.clientX - objetos[i].x;
          delta.y = evt.clientY - objetos[i].y;
        }
  }
  }, false);
  
  canvas.addEventListener("mousemove", function(evt) {
      if (arrastrar == true) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        objetoActual.x = evt.clientX - delta.x;
        objetoActual.y = evt.clientY - delta.y;
        dibujarRect();
      }
  }, false);
  
  canvas.addEventListener("mouseup", function(evt) {
      arrastrar = false;
      objetoActual = null;
  }, false);
