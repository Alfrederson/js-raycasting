class Camera{
    /** @type {number} */
    x = 0
    /** @type {number} */
    y = 0
    angle = 0  
    /**
     * @param {number} x
     * @param {number} y
     */
    constructor(x,y){
      this.x = x
      this.y = y
    }
  
    dir(){
      return [
        Math.cos(this.angle),
        -Math.sin(this.angle)
      ]
    }
  }

  
  export { Camera }