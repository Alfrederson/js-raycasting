import { WIDTH, HEIGHT } from "../config"

import { Camera } from "./camera"
import { Map } from "./map"


class Raycaster{
    tela
    pixels
  
    constructor(id){
      let t = document.getElementById(id)
      if (t == null)
        throw "elemento não encontrado"
      this.tela = t
      this.pixels = Array.from({length:HEIGHT}, linha => Array.from({length:WIDTH}, () => "#"))
    }
  
    cls(){
      for(let linha of this.pixels){
        for(let x = 0; x < WIDTH; x++){
          linha[x] = " "
        }
      }
    }
  
    flip(){
      this.tela.innerText = this.pixels.map( linha => linha.join("") ).join("\n")
    }
    /**
     * @param {Map} map
     * @param {Camera} camera
     */
    render(map,camera){
      let letra_counter = 0
      const texto = "isso é só um div cheio de texto! "
      const texto_len = texto.length
      function letra(){
        letra_counter++
        if(letra_counter==texto_len)
          letra_counter=0
        return texto[letra_counter]
      }
      this.cls()
      let height = map.tiles.length
      let width = map.tiles[0].length
  
      const [dirX,dirY] = camera.dir()
      const [posX,posY] = [camera.x,camera.y]
      const f = 1.1
      const [planeX,planeY] = [-dirY*f,dirX*f]
      col:
      for(let x = 0; x < WIDTH; x++){
        const camX = -1 +(x/WIDTH)*2
        const rayDirX = dirX + planeX * (camX)
        const rayDirY = dirY + planeY * (camX)
  
        let mapX = (posX)|0
        let mapY = (posY)|0
  
        let sideDistX=0
        let sideDistY=0
  
        const deltaDistX = Math.sqrt(1 + (rayDirY*rayDirY) / (rayDirX*rayDirX) )
        const deltaDistY = Math.sqrt(1 + (rayDirX*rayDirX) / (rayDirY*rayDirY) )
        let perpWallDist=0
  
        let stepX=0
        let stepY=0
  
        let hit = false  // bateu na parede?
        let side = 0;    // norte-sul ou leste-oeste?
  
        // calcular passo e distancia laterla inicial (não sei o que significa)
        if(rayDirX<0){
          stepX = -1
          sideDistX = (posX - mapX) * deltaDistX
        }else{
          stepX = 1
          sideDistX = (mapX + 1 - posX)*deltaDistX
        }
        if(rayDirY<0){
          stepY = -1
          sideDistY = (posY - mapY) * deltaDistY
        }else{
          stepY = 1
          sideDistY = (mapY + 1 - posY)*deltaDistY
        }
  
        // detecta a parede (DDA)
        while(!hit){
          if (sideDistX < sideDistY){
            sideDistX += deltaDistX
            mapX += stepX
            side = 0
          }else{
            sideDistY += deltaDistY
            mapY += stepY
            side = 1
          }
          // checa se bateu em uma parede... ou se escapou do mapa
          if(mapY < 0 || mapX < 0 || mapY >= height || mapX >= width){
            continue col
          }
          if(map.tiles[mapY][mapX] > 0){
            hit = true
          }
        }
        // calcula a distancia do raio até a parede.
        //perpWallDist = side == 0 ? (sideDistX - deltaDistX) : (sideDistY - deltaDistY)
        perpWallDist = side ? Math.abs( (mapY - posY + (1-stepY)/2)/rayDirY) : Math.abs( (mapX - posX + (1-stepX)/2)/rayDirX)

        // if(side==0){
        //   perpWallDist = Math.abs( (mapX - posX + (1-stepX)/2)/rayDirX)
        // }else{
        //   perpWallDist = Math.abs( (mapY - posY + (1-stepY)/2)/rayDirY)
        // }
        
        // calcula a altura da linha
        let lineHeight = ((HEIGHT / (perpWallDist))/2)
        // plota.
        let drawStart = (-lineHeight + HEIGHT/2)|0
        let drawEnd = (lineHeight + HEIGHT/2)|0
  
        let wallX
        if(side == 0){
          wallX = posY + perpWallDist * rayDirY
        }else{
          wallX = posX + perpWallDist * rayDirX
        }
        wallX -= Math.floor(wallX)
        if(drawStart > 0 && drawStart < HEIGHT){
          this.pixels[drawStart][x] = "▄";
        }
        const edge = wallX < 0.025 || wallX > 0.975 
        for(let y = Math.max(1,drawStart+1); y < Math.min(HEIGHT-1,drawEnd); y++){
          this.pixels[y][x]= edge ? "▀" : perpWallDist > 4 ? perpWallDist > 8 ? perpWallDist > 16 ? "█" : "░" : letra() : " "
        }
        if(drawEnd >0 && drawEnd < HEIGHT){
          this.pixels[drawEnd][x] = "▀"
        }      
      }
  
      this.flip()
    }
  
  }

  
  export { Raycaster }