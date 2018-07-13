const state = {
  player: [0, 1],
  width: 3,
  height: 3,
  grid: {}
};

const setup = lState => {

  let celds = [];

  for (let j = 0; j < lState.height; j++){
    celds[i] = []
    for (let i = 0; i < lState.width; i++ ){
      celds[i][j] = -1;
    }
  }

  console.log(celds);

  root.appendChild(columns);

  console.log(lState.grid);

  //contenedor del grid
  const grid = document.createElement('div');
  grid.className = 'grid';

  
  

  root.appendChild(grid);
}

const render = lState => {

}

setup(state);
render(state);