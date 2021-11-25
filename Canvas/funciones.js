var posX=-1;
var posY=-1;
var x,y,x1,y1;
var cajaActual;
var objetos = [];
var objetosPresionados = [];
var objLineas=[];
var pos = 0;
var objetoActual = null;
var arrastrar = false;
var delta = new Object();
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var posRect={x1:160,x2:100,y1:10,y2:40};
let linea=false;
function linea_button(){
    linea=true;
}
function dibujarRect(){
    for (var i = 0; i < objetos.length; i++) {
        ctx.beginPath();
        ctx.rect(objetos[i].x, objetos[i].y, objetos[i].width, objetos[i].height);
        ctx.strokeStyle = objetos[i].color;
        ctx.stroke();
        ctx.closePath();
      } 
}
function clase_button(){
    objetos.push({
        x: 10, y: 10,
        width: 100, height: 60,
        color: 'black'
      });
      dibujarRect();
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
                break
              }else{
                objetoActual = null;
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
            // objetoActual = null;
        }, false);

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
                var objetoPresionado = objetosPresionados[0]
                if(objetoPresionado.x != objetoActual.x && objetosPresionados[0].y !=objetoActual.y){
                  console.log(objetosPresionados)
                  objetosPresionados.push(objetoActual);   
                }
              }
              
            }            
            if(objetosPresionados.length == 2){
              var obj1=objetosPresionados[0];
              var obj2=objetosPresionados[1];
              ctx.moveTo(obj1.x,obj1.y);
              ctx.moveTo(obj2.x, obj2.y);
              ctx.stroke();
            }
            //pos de donde haces click
          //   x=e.offsetX;
          //   y=e.offsetY;
          //   obtener_caja(x,y);
          //   if (posX>=0 && posY>=0){
          //     ctx.moveTo(posX,posY);
          //     ctx.lineTo(x1,y1);
          //     ctx.strokeStyle='black';
          //     ctx.stroke();
          //     posX=-1;
          //     posY=-1;
          //     objLineas.push({
          //       posIniX: posX,
          //       posIniY: posY
          //     });
          //   }
          //    else{
          //        posX=e.offsetX;
          //        posY=e.offsetY;
                 
          //  }
    }
    // linea=false;
});

function obtener_caja(x,y){
for (var i = 0; i < objetos.length; i++) {
//pos de la primera caja del arreglo
posX=objetos[i].x;
posY=objetos[i].y;
//comparar si es la caja que queremos 
if(x>=posX && x<posX+objetos[i].width && y>=posY 
    && y<posY+objetos[i].height){
      console.log("Entra al if")
      x1=objetos[i].x;
      y1=objetos[i].y;
 }
}
}