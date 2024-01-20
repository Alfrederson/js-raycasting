import { Raycaster } from "./game/raycaster"
import { map, Map } from "./game/map"
import { Camera } from "./game/camera"

const WALK_SPEED = 0.05
const TURN_SPEED = 0.025


let r = new Raycaster("app")
let m = new Map()
let p = new Camera(35,8)

const input = {}

document.addEventListener("keydown", event=>{
  input[event.key] = true
})
document.addEventListener("keyup", event=>{
  input[event.key] = false
})

/** @type {HTMLCanvasElement} */
// @ts-ignore
const minimap = document.getElementById("minimap")
const MINIMAP_BLOCK_SIZE = 5

minimap.width = m.width * MINIMAP_BLOCK_SIZE
minimap.height = m.height * MINIMAP_BLOCK_SIZE
/**
 * @param {CanvasRenderingContext2D} ctx
 * @param {Map} map
 * @param {Camera} camera
 */
function drawMiniMap(ctx,map,camera){
  ctx.clearRect(0,0,MINIMAP_BLOCK_SIZE*map.width,MINIMAP_BLOCK_SIZE*map.height)
  let height = map.height
  let width = map.width
  ctx.fillStyle = '#FFBF00';
  ctx.strokeStyle = '#FFBF00';

  for(let x = 0; x < width; x++){
    for(let y=0; y < height; y++){
      if(map.tiles[y][x])
      ctx.fillRect(x*MINIMAP_BLOCK_SIZE,y*MINIMAP_BLOCK_SIZE,MINIMAP_BLOCK_SIZE,MINIMAP_BLOCK_SIZE)
    }
  }
  let [x,y] = [camera.x*MINIMAP_BLOCK_SIZE,camera.y*MINIMAP_BLOCK_SIZE]
  let [dirX,dirY] = camera.dir()

  ctx.lineWidth = 1;

  ctx.beginPath();
  ctx.arc(x, y, MINIMAP_BLOCK_SIZE/2, 0, 2 * Math.PI);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + dirX * 20, y + dirY * 20);

  ctx.stroke();
}
const ctx = minimap.getContext('2d')
if(!ctx)
  throw "cade o contexto?"

function frame(){

  let sX = 0, sY = 0
  let [x,y] = p.dir()
  if ( input.w ){
    sX += x * WALK_SPEED
    sY += y * WALK_SPEED
  }
  if ( input.s ){
    sX -= x * WALK_SPEED
    sY -= y * WALK_SPEED
  }

  // a resolução é tão baixa que isso funciona, mas não
  // faça isso no geral.
  if(m.tiles[p.y|0][(p.x + sX)|0])
    sX = 0
  if(m.tiles[(p.y+sY)|0][(p.x)|0])
    sY = 0

  p.x += sX
  p.y += sY

  if (input.a)
    p.angle += TURN_SPEED
  if (input.d)
    p.angle -= TURN_SPEED

  if(input.w || input.s || input.a || input.d){
    r.render(m,p)
  }
  if(ctx){
    drawMiniMap(ctx,m,p)
  }
  requestAnimationFrame(frame)
}

r.render(m,p)
frame()

