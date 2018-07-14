const state = {
  players: ['X', 'O'],
  player: 0,
  size: 3,
  grid: []
};

const setup = lState => {

  //setear valores
  lState.player = 0;

  lState.grid = new Array(lState.size*lState.size);

  const rows = new Array(lState.size);
  const cells = new Array(lState.size*lState.size);

  //contenedor del grid
  const grid = document.createElement('div');
  grid.className = 'grid';

  //set grid values
  for (let j = 0; j < lState.size; j++){
    //create row
    rows[j] = document.createElement('div');
    rows[j].className = 'row';
    for (let i = 0; i < lState.size; i++ ){
      //set value
      lState.grid[j*lState.size + i] = -1;

      //create element cell
      cells[j*lState.size + i] = document.createElement('div');
      cells[j*lState.size + i].className = `cell ${j*lState.size + i}`;

      //add space for the symbol
      const symbol = document.createElement('p');
      symbol.className = `choose`;
      symbol.innerHTML = '~';
      cells[j*lState.size + i].appendChild(symbol);

      //put in row
      rows[j].appendChild(cells[j*lState.size + i]);

      //set listener
      cells[j*lState.size + i].onclick = (self) => select(self.target, lState);
    }

    //append to grid
    grid.appendChild(rows[j]);
  }

  
  
    

  root.appendChild(grid);
}

const render = lState => {

}

setup(state);
render(state);

//listeners

const select = (element, lState) => {
  const classes = element.parentElement.className.split(' ');
  const symbol= element;
  const position = classes[1];

  //check if it is taken
  if (lState.grid[position] != -1){
    //error not valid
    alert("Posición ivalida!\nPor favor escoga otro cuadro.");
  } else {
    //change state of grid
    lState.grid[position] = lState.player;

    //add symbol
    symbol.className = `${symbol.className} on ${lState.players[lState.player]}`;
    symbol.innerHTML = `${lState.players[lState.player]}`;

    //
    win(lState);

    //change player
    lState.player = (lState.player + 1) % lState.players.length;
  }

  //print of state for testing
  let row = ``;
  for (let j = 0; j < lState.size; j++){
    for (let i = 0; i < lState.size; i++){
      row = `${row} ${lState.grid[j*lState.size + i]} `
    }
    row = `${row}\n`;
  }

}

const win = (lState) => {
  const grid = lState.grid;
  const player = lState.player;
  const size = lState.size;
  const win = false;

  //If its not a win
  if (!winH(grid, size, player) && !winV(grid, size, player) && !winD(grid, size, player)){

  } 
  //if it is a win
  else {
    alert (`Jugador ${lState.player+1} a ganado!`)
    root.innerHTML = null;
    setup(lState);
  }

  return win;
}

const winH = (grid, size, player) => {
  for (let j = 0; j < size; j++){
    let times = 0;
    for (let i = 0; i < size; i++){
      if(grid[j*size + i] === player){
        times++;
      }
    }
    if (times === size){
      return true;
    }
  }
  return false;
}

const winV = (grid, size, player) => {
  for (let j = 0; j < size; j++){
    let times = 0;
    for (let i = 0; i < size; i++){
      if(grid[i*size + j] === player){
        times++;
      }
    }
    if (times === size){
      return true;
    }
  }
  return false;
}

const winD = (grid, size, player) => {
  let times = 0;
  for (let h = 0; h < (size*size); h += size + 1){
    if (grid[h] === player){
      times++;
    }
  }
  if (times === size){
    return true;
  }

  times = 0;
  for (let h = size - 1; h <= size * (size-1); h += (size - 1)){
    if (grid[h] === player){
      times++;
    }
  }
  if (times == size) {
    return true;
  }

  return false;
}