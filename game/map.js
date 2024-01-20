const raw = 
`
######################################
#   #       #       #     #    ##    #
#   #   #   #       ###   #   #      #
#   #   #   #   ##  #     #   #  #   #
#       #   #    #  ####  ###  ##    #
#########   #    ##                  #
#           # ##  #   ###########    #
###  ########  #  #  #           #   #
#    #         #### #  ##    ##  #   #
###  #  ####     ## #  ##    ##  #   #
#    #  #  ##     #              #   #
#  ###  #   ##    # #  #      #  #   #
#  #    ##   #    # #   ######   #   #
#  #      #  #  ###  #          #    #
#  # # #  #      #    ##########     #
#         #                          #
######################################
`

const map = raw.trim().split("\n").map(linha => linha.split("").map( c => c == "#" ? 1 : 0))

class Map{
    /** @type {number[][]} */
    tiles
    width
    height
    constructor(){
      this.tiles = map
      this.width = this.tiles[0].length
      this.height = this.tiles.length
    }
  }
  

export {map, Map}