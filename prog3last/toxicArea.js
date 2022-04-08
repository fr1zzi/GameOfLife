  
let LivingCreature = require('./LivingCreature')

module.exports = class toxicArea extends LivingCreature{
    
    mul() {
            let emptyCells = super.chooseCell(0)
            let newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
            if (this.multiply >= 5 && newCell) {
                let x = newCell[0]
                let y = newCell[1]
                matrix[y][x] = 6
                ToxicAreaArr .push(new toxicArea(x, y))
                this.multiply = 0;
            }
    }
}