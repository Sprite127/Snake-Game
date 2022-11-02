var canvas = document.getElementById("game");
var context = canvas.getContext("2d");
// Box width
var bw = 400;
// Box height
var bh = 400;
// Padding
var p = -1

function drawBoard(){
    for (var x = 0; x <= bw; x += 16) {
        context.moveTo(0.5 + x + p, p);
        context.lineTo(0.5 + x + p, bh + p);
    }

    for (var x = 0; x <= bh; x += 16) {
        context.moveTo(p, 0.5 + x + p);
        context.lineTo(bw + p, 0.5 + x + p);
    }
    context.strokeStyle = "#606060";
    context.stroke();
}



