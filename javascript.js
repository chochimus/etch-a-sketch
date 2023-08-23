const container = document.querySelector(`.container`);
let dimension = createGrid(32);
let grid = document.querySelectorAll('.grid');

const dimensionSelector = document.querySelector(`#resolution`);
dimensionSelector.addEventListener('change', () => {
  dimension = dimensionSelector.value;
  deleteGrid();
  createGrid(dimension)
  grid = document.querySelectorAll('.grid');
})

function createGrid(dimension){
  const divWidth = (512/dimension)/2 - 1;
  for(let i = 0; i < dimension; i++){
    for(let j = 0; j < dimension; j++){
      const div = document.createElement('div');
      div.style.padding = `${divWidth}px`;
      div.classList.add('grid');
      container.appendChild(div);
    }
  }
}

function deleteGrid(){
  while(container.firstChild) {
    container.removeChild(container.lastChild);
  }
}

function colorTile(event) {
  event.currentTarget.style['background-color'] = 'black';
}

//default drag behavior ruins some functionality
window.addEventListener('dragstart', (event) => {
  event.preventDefault();
})

window.addEventListener('mousedown', (event) =>{
  let current = event.target.closest('.grid');
  if(current) {current.style[`background-color`] = 'black';
  }
  grid.forEach((div) => {
    div.addEventListener('mouseenter', colorTile)
  });
})
window.addEventListener('mouseup', () => {
  grid.forEach((div) => {
    div.removeEventListener('mouseenter', colorTile)
  });
})