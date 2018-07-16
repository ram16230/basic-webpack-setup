const state = {
  players: ['X', 'O'],
  player: 0,
  size: 3,
  grid: [],
  over: false,
  winner: -1
};

const setup = lState => {
  // create new array for board
  lState.grid = new Array(lState.size*lState.size);

  // contenedor del grid, rows and cells
  const grid = document.createElement('div');
  const rows = new Array(lState.size);
  const cells = new Array(lState.size*lState.size);

  
  grid.className = 'grid';

  // set grid values
  for (let j = 0; j < lState.size; j++){
    // create row
    rows[j] = document.createElement('div');
    rows[j].className = 'row';
    for (let i = 0; i < lState.size; i++ ){
      // set value
      lState.grid[j*lState.size + i] = -1;

      // create element cell
      cells[j*lState.size + i] = document.createElement('div');
      cells[j*lState.size + i].className = `cell ${j*lState.size + i}`;

      // add space for the symbol
      const symbol = document.createElement('div');
      symbol.className = `choose`;
      symbol.innerHTML = '~';
      cells[j*lState.size + i].appendChild(symbol);

      // put in row
      rows[j].appendChild(cells[j*lState.size + i]);

      // set listener
      cells[j*lState.size + i].onclick = (self) => select(self.target, lState);
    }

    // append to grid
    grid.appendChild(rows[j]);
  }

  
  // create announcer
  const announcer = document.createElement('h3');
  announcer.innerHTML = `El turno es del jugador `;
  announcer.className = 'announcer';
  // create variable
  const variable = document.createElement('h3');
  variable.className = `variable ${lState.players[lState.player]}`;
  variable.innerHTML = `${lState.players[lState.player]}`;
  announcer.appendChild(variable);

  root.appendChild(grid);
  root.appendChild(announcer);

  console.log(lState.player);
}

const render = lState => {

  if (lState.over){
    // get elements to print
    const text = document.getElementsByClassName('announcer')[0];
    const icon = document.getElementsByClassName('variable')[0];

    // check for tie
    if (lState.winner == -1) {
      // mostrar empate
      alert("Empate!");
      // mostrar empate
      text.innerHTML = 'Empate';
      icon.innerHTML = '';
    } 
    // check for winner
    else {
      // mostrar ganador
      alert(`El ganador es el jugador: ${lState.players[lState.player]}`);
      // mostrar ganador
      icon.innerHTML = `${lState.players[lState.player]}`;
      const icon_ = icon;
      text.innerHTML = 'El ganador es: ';
      text.appendChild(icon_)
    }

    // restart button;
    const restart = document.createElement('button');
    restart.innerHTML = 'Volver a jugar'
    restart.className = 'grow button restart';

    restart.onclick = (self) => {
      // empty root;
      if (root.hasChildNodes()) {
        root.innerHTML = null;
      }

      // reset state;
      lState.over = false;
      lState.winner = -1;

      // set 
      setup(lState)
    };
    root.appendChild(restart);
  } else {

    // change player
    lState.player = (lState.player + 1) % lState.players.length;
    // show next player
    const variable = document.getElementsByClassName('variable')[0];
    variable.innerHTML = `${lState.players[lState.player]}`;
    variable.className = `variable ${lState.players[lState.player]}`
  }
  

}

setup(state);

// listeners
const select = (element, lState) => {
  // extract data 
  const classes = element.parentElement.className.split(' ');
  const symbol= element;
  const position = classes[1];

  // check if it is taken
  if (lState.grid[position] != -1){
    // error not valid
    alert("Posición ivalida!\nPor favor escoga otro cuadro.");
  } else if (!lState.over) {
    // change state of grid
    lState.grid[position] = lState.player;

    // add symbol
    symbol.className = `${symbol.className} on ${lState.players[lState.player]}`;
    symbol.innerHTML = `${lState.players[lState.player]}`;

    // if wins
    if (win(lState)) {
      // set winner and set over
      lState.winner = lState.player;
      lState.over = true;
    } else {
      // check if its not any cell free
      if(!lState.grid.includes(-1)){
        lState.over = true;
      }
    }

    render(lState);
  } else {
    render(lState);
  }

}

const win = (lState) => {
  // extract data 
  const grid = lState.grid;
  const player = lState.player;
  const size = lState.size;

  // If wins
  if (winH(grid, size, player) || winV(grid, size, player) || winD(grid, size, player)){
    return true;
  }

  return false;
}

const winH = (grid, size, player) => {
  // recorrer rows
  for (let j = 0; j < size; j++){
    let times = 0;
    for (let i = 0; i < size; i++){
      // check if the player has the spot
      if(grid[j*size + i] === player){
        times++;
      }
    }
    // if times is equal to size
    if (times === size){
      let e = [];
      for (let i = 0; i < size; i++) {
        // get de elements
        e.push(document.getElementsByClassName(`${j*size + i}`)[0]);
      }
      console.log(e);
      // set class
      e.forEach((element) => element.className = `${element.className} won`);
      return true;
    }
  }
  return false;
}

const winV = (grid, size, player) => {
  // recorrer columns
  for (let j = 0; j < size; j++){
    let times = 0;
    for (let i = 0; i < size; i++){
      // check if the player has the spot
      if(grid[i*size + j] === player){
        times++;
      }
    }
    // if times is equal to size
    if (times === size){
      let e = [];
      for (let i = 0; i < size; i++) {
        // get de elements
        e.push(document.getElementsByClassName(`${i*size + j}`)[0]);
      }
      // set class
      e.forEach((e) => e.className = `${e.className} won`);
      return true;
    }
  }
  return false;
}

const winD = (grid, size, player) => {
  let times = 0;
  // recorrer diagonal
  for (let h = 0; h < (size*size); h += size + 1){
    // check if the player has the spot
    if (grid[h] === player){
      times++;
    }
  }
  // if times is equal to size
  if (times === size){
    let e = [];
    for (let h = 0; h < (size*size); h += size + 1){
      // get de elements
      e.push(document.getElementsByClassName(`${h}`)[0]);
    }
    // set class
    e.forEach((element) => element.className = `${element.className} won`);
    return true;
  }

  times = 0;
  // recorrer diagonal
  for (let h = size - 1; h <= size * (size-1); h += (size - 1)){
    // check if the player has the spot
    if (grid[h] === player){
      times++;
    }
  }
  // if times is equal to size
  if (times == size) {
    let e = [];
    for (let h = size - 1; h <= size * (size-1); h += (size - 1)){
      // get de elements
      e.push(document.getElementsByClassName(`${h}`)[0]);
    }
    e.forEach((element) => element.className = `${element.className} won`);
    return true;
  }

  return false;
}