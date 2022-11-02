var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var grid = 16;
var snake = {
  x: 160,
  y: 160,
  dx: grid,
  dy: 0,
  cells: [],
  maxCells: 5,
};
var count = 0;
var apple = {
  x: 320,
  y: 320
};
var apple1 = {
  x: 240,
  y: 240,
};
var apple2 = {
  x: 80,
  y: 320,
};
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
// entire game loop
function loop() {
  requestAnimationFrame(loop);
  // slow game loop to 46 fps instead of 60 - 60/15 = 4
  if (++count < 3)
	{
    return;
  }
  count = 0;
  context.clearRect(0,0,canvas.width,canvas.height);
	drawBoard()
  snake.x += snake.dx;
  snake.y += snake.dy;
  // wrap snake position on edge of screen
  if (snake.x < 0) {
    snake.x = canvas.width - grid;
  }
  else if (snake.x >= canvas.width) {
    snake.x = 0;
  }
  if (snake.y < 0) {
    snake.y = canvas.height - grid;
  }
  else if (snake.y >= canvas.height) {
    snake.y = 0;
  }
  // keep track of where snake has been. front of the array is always the head
  snake.cells.unshift({x: snake.x, y: snake.y});
  // remove cells as we move away from them
  if (snake.cells.length > snake.maxCells) {
    snake.cells.pop();
  }
  // draw apple
  context.fillStyle = '#FF0000';
  context.fillRect(apple.x, apple.y, grid-1, grid-1);
  // draw apple
  context.fillStyle = '#FF0000';
  context.fillRect(apple1.x, apple1.y, grid-1, grid-1);
   // draw apple
  context.fillStyle = '#FF0000';
  context.fillRect(apple2.x, apple2.y, grid-1, grid-1);
 // draw snake
  context.fillStyle = '#00FF3C';
  snake.cells.forEach(function(cell, index) {
		context.fillStyle = (index == 0) ? "#009900" : "#006400";
    context.fillRect(cell.x, cell.y, grid-1, grid-1);
    // snake ate apple
    if (cell.x === apple.x && cell.y === apple.y) {
      snake.maxCells++;
      apple.x = getRandomInt(0, 25) * grid;
      apple.y = getRandomInt(0, 25) * grid;
    }
     // snake ate apple
    if (cell.x === apple1.x && cell.y === apple1.y) {
      snake.maxCells++;
      apple1.x = getRandomInt(0, 25) * grid;
      apple1.y = getRandomInt(0, 25) * grid;
    }
     // snake ate apple
    if (cell.x === apple2.x && cell.y === apple2.y) {
      snake.maxCells++;
      apple2.x = getRandomInt(0, 25) * grid;
      apple2.y = getRandomInt(0, 25) * grid;
    }
    // check collision with all cells after this one (modified bubble sort)
    for (var i = index + 1; i < snake.cells.length; i++) {
      
      // collision. reset game
      if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
        snake.x = 160;
        snake.y = 160;
        snake.cells = [];
        snake.maxCells = 5;
        snake.dx = grid;
        snake.dy = 0;
        apple.x = getRandomInt(0, 25) * grid;
        apple.y = getRandomInt(0, 25) * grid;
				drawBoard()
      }
    }
  });
}
document.addEventListener('keydown', function(e) {
  // prevent snake from backtracking on itself
  if (e.which === 37 && snake.dx === 0) {
    snake.dx = -grid;
    snake.dy = 0;
  }
  else if (e.which === 38 && snake.dy === 0) {
    snake.dy = -grid;
    snake.dx = 0;
  }
  else if (e.which === 39 && snake.dx === 0) {
    snake.dx = grid;
    snake.dy = 0;
  }
  else if (e.which === 40 && snake.dy === 0) {
    snake.dy = grid;
    snake.dx = 0;
  }
});
requestAnimationFrame(loop);