let LivingCreature = require('./LivingCreature')

module.exports = class allEater extends LivingCreature{
    constructor(x, y) {
        super(x, y)
        this.energy = 20;
    }
    chooseCell(char) {
      this.getNewDirections();
      return super.chooseCell(char)
       
    }
    mul() {
        let found = super.chooseCell(0);
        let exact = found[Math.floor(Math.random() * found.length)];

        if (exact && this.energy > 150) {
            let x = exact[0];
            let y = exact[1];

            let all__eater = new allEater(x, y, 3);
            matrix[y][x] = 3;
            allEaterArr.push(all__eater);

            this.energy = 20;
        } 
        // else {
        //     console.error('there is no way to multiply');
        // }
    }
    eat(){
        let found1 = super.chooseCell(1);
        let exact1 = found1[Math.floor(Math.random() * found1.length)];
        let found2 = super.chooseCell(2);
        let exact2 = found2[Math.floor(Math.random() * found2.length)];

        if (exact2){
            this.energy +=4;
            let x = exact2[0];
            let y = exact2[1];

            for (let i = 0; i < grassEaterArr.length; i++) {
                if( grassEaterArr[i].x == x && grassEaterArr[i].y == y ){
                    grassEaterArr.splice(i, 1)
                }
            }

            matrix[y][x] = 3
            matrix[this.y][this.x] = 0
            
            this.x = x;
            this.y = y

            if(this.energy > 150){
                this.mul()
            }
        }
        else if(exact1){
            this.energy++;
            let x = exact1[0];
            let y = exact1[1];

            for (let i = 0; i < grassArr.length; i++) {
                if( grassArr[i].x == x && grassArr[i].y == y ){
                    grassArr.splice(i, 1)
                }
            }

            matrix[y][x] = 3
            matrix[this.y][this.x] = 0
            
            this.x = x;
            this.y = y

            if(this.energy > 150){
                this.mul()
            }
        }
        else {
            this.move()
        }
    }
    move(){
        let found = super.chooseCell(0);
        let exact = found[Math.floor(Math.random() * found.length)]

        if (exact){
            let x = exact[0];
            let y = exact[1];

            matrix[y][x] = 3
            matrix[this.y][this.x] = 0

            this.x = x;
            this.y = y;

            this.energy -= 3

            if(this.energy < 0){
                this.die()
            }
        }else {
            this.energy -= 3
            if(this.energy < 0){
                this.die()
            }
        }
    }
    die(){
        for (let i = 0; i < allEaterArr.length; i++) {
            if( allEaterArr[i].x == this.x && allEaterArr[i].y == this.y ){
                allEaterArr.splice(i, 1)
            }
        }
        matrix[this.y][this.x] = 0
    }

}