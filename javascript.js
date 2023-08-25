const container = document.querySelector(`.container`);
let dimension = createGrid(8);
let grid = document.querySelectorAll('.grid');
const dimensionSelector = document.querySelector(`#resolution`);

//handle creation and manipulation of grid
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

//functions to handle current draw options used 
const penColor = document.querySelector('#pen');
const colorWheel = document.querySelector('#color-wheel');
const colorContainer = document.querySelector('#color-container');
let colorValue = `rgb(0, 0, 0)`;
const erasor = document.querySelector('#erasor');
let erasorOn = false;
const shader = document.querySelector('#shading');
const shadingContainer = document.querySelector('#shading-container');
let shaderOn = false;

shader.addEventListener('change', ()=> {
  shaderOn ? shaderOn = false: shaderOn = true;
});

shadingContainer.addEventListener('click', ()=> {
  shader.click();
})

erasor.addEventListener('click', ()=> {
  colorValue = 'rgb(184, 184, 184)';
  erasorOn = true;
});

penColor.addEventListener('click', (event)=>{
  erasorOn = false;
  colorValue = hexToRgb(colorWheel.value);
});
colorContainer.addEventListener('click', (event)=>{
  colorWheel.click();
});

colorWheel.addEventListener('change', (event) => {
  erasorOn = false;
  colorValue = hexToRgb(event.target.value);
});

function hexToRgb(hex){
  hex = hex.replace('#', ''); 
  // Extract individual RGB components
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  return `rgb(${r}, ${g}, ${b})`;
}


//functions to handle tile color changes

//If the erasor isn't selected then check if the tile has already been colored
//with the currently selected color. If so check if shader is on, otherwise only update brightness.
//If the tile hasn't been colored yet then color the tile and set status to colored
function colorTile(event) {
  const tile = event.currentTarget;
  if(!erasorOn){
    if(tile.getAttribute('data-value') && tile.style['background-color'] == colorValue){
      if(shaderOn){
        shade(tile);
      } else{
        tile.style['filter'] = `brightness(1)`;
      } 
    } else{
      tile.style['background-color'] = `${colorValue}`;
      tile.style['filter'] = `brightness(1)`;
      tile.setAttribute('data-value', `1`);
    }
  } else{
    tile.style['background-color'] = `${colorValue}`;
    tile.style['filter'] = `brightness(1)`;
    tile.removeAttribute('data-value');
  }
}

function shade(tile){
  let currentBrightness = tile.getAttribute('data-value');
 if(currentBrightness > 0.1){
    currentBrightness = (currentBrightness - 0.1).toFixed(1);
    tile.setAttribute('data-value', currentBrightness);
    tile.style['filter'] = `brightness(${currentBrightness})`;
  }
}

//mouse handling functions
window.addEventListener('dragstart', (event) => {
  event.preventDefault();
})

window.addEventListener('mousedown', (event) =>{
  let current = event.target.closest('.grid');
  if(current) {current.style[`background-color`] = `${colorValue}`;
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