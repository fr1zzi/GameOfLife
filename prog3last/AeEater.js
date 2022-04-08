let LivingCreature = require('./LivingCreature')

module.exports = class AeEater extends LivingCreature{
    constructor(x,  y) {
        super(x, y)
        this.energy = 150;
    }
    chooseCell(char) {
      this.getNewDirections();
      return super.chooseCell(char)
       
    }
    mul() {
        let found = super.chooseCell(0);
        let exact = found[Math.floor(Math.random() * found.length)]

        if (exact && this.energy > 170) {
            let x = exact[0];
            let y = exact[1];

            let ae_Eater = new AeEater(x, y);
            matrix[y][x] = 4;
            aeEaterArr.push(ae_Eater);

            this.energy = 100;
        }
        //  else {
        //     console.error('there is no way to multiply');
        // }
    }
    eat(){
        let found = super.chooseCell(3);
        let exact = found[Math.floor(Math.random() * found.length)]

        if (exact){
            this.energy +=10;
            let x = exact[0];
            let y = exact[1];

            for (let i = 0; i < allEaterArr.length; i++) {
                if( allEaterArr[i].x == x && allEaterArr[i].y == y ){
                    allEaterArr.splice(i, 1)
                }
            }

            matrix[y][x] = 4
            matrix[this.y][this.x] = 0
            
            this.x = x;
            this.y = y

            if(this.energy > 50){
                this.mul()
            }
        }else {
            this.move()
        }
    }
    move(){
        let found1 = super.chooseCell(0);
        let found2 = super.chooseCell(1);
        let exact1 = found1[Math.floor(Math.random() * found1.length)];
        let exact2 = found2[Math.floor(Math.random() * found2.length)]

        if (exact1){
            let x = exact1[0];
            let y = exact1[1];

            matrix[y][x] = 4
            matrix[this.y][this.x] = 0

            this.x = x;
            this.y = y;

            this.energy--

            if(this.energy < 0){
                this.die()
            }
        }
        else if(exact2){
            let x = exact2[0];
            let y = exact2[1];

            matrix[y][x] = 4
            matrix[this.y][this.x] = 0

            this.x = x;
            this.y = y;

            // this.energy--

            if(this.energy < 0){
                this.die()
            }
        }
        else {
            this.energy--
            if(this.energy < 0){
                this.die()
            }
        }
    }
    die(){
        for (let i = 0; i < aeEaterArr.length; i++) {
            if( aeEaterArr[i].x == this.x && aeEaterArr[i].y == this.y ){
                aeEaterArr.splice(i, 1)
            }
        }
        matrix[this.y][this.x] = 0
    }
}