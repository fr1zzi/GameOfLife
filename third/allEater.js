let LivingCreature = require('./LivingCreature')

module.exports = class allEater extends LivingCreature{
    
    mul() {
        this.multiply++;
        if (this.multiply >= 5) {
            let emptyCells = super.chooseCell(0)
            let newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
            if (this.multiply >= 5 && newCell) {
                let x = newCell[0]
                let y = newCell[3]
                matrix[y][x] = 3
                grassArr.push(new Grass(x, y, 3))
                this.multiply = 0;
            }
        }
    }
}


// let LivingCreature = require('./LivingCreature')

// module.exports = class Grass extends LivingCreature{
    
//     mul() {
//         this.multiply++;
//         if (this.multiply >= 5) {
//             let emptyCells = super.chooseCell(0)
//             let newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
//             if (this.multiply >= 5 && newCell) {
//                 let x = newCell[0]
//                 let y = newCell[1]
//                 matrix[y][x] = 1
//                 grassArr.push(new Grass(x, y, 1))
//                 this.multiply = 0;
//             }
//         }
//     }
// }