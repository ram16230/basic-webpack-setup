 const state = {
  players: ['X', 'O'],
  player: 0,
  size: 3,
  grid: [],
  over: false,
  winner: -1
};

const setup = lState => {

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
      const symbol = document.createElement('div');
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

  
  //create announcer
  const announcer = document.createElement('h3');
  announcer.innerHTML = `El turno es del jugador `;
  announcer.className = 'announcer';
  //create variable
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
    //check for tie
    if (lState.winner == -1) {
      //mostrar empate
      alert("Empate!");
    } 
    //check for winner
    else {
      //mostrar ganador
      alert(`El ganador es el jugador: ${lState.players[lState.player]}`);
    }

    //boton de return;
  } else {

    //change player
    lState.player = (lState.player + 1) % lState.players.length;
    //show next player
    const variable = document.getElementsByClassName('variable')[0];
    variable.innerHTML = `${lState.players[lState.player]}`;
    variable.className = `variable ${lState.players[lState.player]}`
  }
  

}

setup(state);

//listeners

const select = (element, lState) => {
  console.log(lState);
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

    //if wins
    if (win(lState)) {
      lState.winner = lState.player;
      lState.over = true;
    } else {
      //check if its not any cell free
      if(!lState.grid.includes(-1)){
        lState.over = true;
      }
    }

    render(lState);
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

  //If wins
  if (winH(grid, size, player) || winV(grid, size, player) || winD(grid, size, player)){
    return true;
  }

  return false;
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
      let e = [];
      console.log(e);
      e.push(document.getElementsByClassName(`${j*size + 0}`)[0]);
      e.push(document.getElementsByClassName(`${j*size + 1}`)[0]);
      e.push(document.getElementsByClassName(`${j*size + 2}`)[0]);
      console.log(e);
      e.forEach((element) => element.className = `${element.className} won`);
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
      let e = [];
      e.push(document.getElementsByClassName(`${0*size + j}`)[0]);
      e.push(document.getElementsByClassName(`${1*size + j}`)[0]);
      e.push(document.getElementsByClassName(`${2*size + j}`)[0]);
      e.forEach((e) => e.className = `${e.className} won`);
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
    let e = [];
    for (let h = 0; h < (size*size); h += size + 1){
      e.push(document.getElementsByClassName(`${h}`)[0]);
    }
    e.forEach((element) => element.className = `${element.className} won`);
    return true;
  }

  times = 0;
  for (let h = size - 1; h <= size * (size-1); h += (size - 1)){
    if (grid[h] === player){
      times++;
    }
  }
  if (times == size) {
    let e = [];
    for (let h = size - 1; h <= size * (size-1); h += (size - 1)){
      e.push(document.getElementsByClassName(`${h}`)[0]);
    }
    e.forEach((element) => element.className = `${element.className} won`);
    return true;
  }

  return false;
}