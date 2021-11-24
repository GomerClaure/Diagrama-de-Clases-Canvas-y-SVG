var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var clases = ["ho","las","1","jejej"];
var variables = ["var","asdf","asdasf"];
let tamanioMax = tamMaxCadena(clases.concat(variables));
console.log(tamanioMax);
var alto_clase = 0;
for(let elemento of clases){
  alto_clase += 30
  ctx.beginPath();
  ctx.fillStyle = 'red';
  ctx.font = '16pt Verdana';
  ctx.fillText(elemento, 10, alto_clase);
}
ctx.beginPath();
ctx.rect(10,10,tamanioMax*16,alto_clase);
ctx.strokeStyle = "black";
ctx.stroke();
ctx.closePath();
ctx.stroke();

function tamMaxCadena(listaClases){
  var tamMax = 0;
  for(var cadena of listaClases){
    if(cadena.length > tamMax){
      tamMax =cadena.length;
    }
  }
  return tamMax
}