class Grass extends LivingCreature {
  constructor(x, y) {
      super(x,y)
      this.energy = 0;
  }
  chooseCell(char) {
      let result = [];
      for (let i = 0; i < this.directions.length; i++) {
          let x = this.directions[i][0];
          let y = this.directions[i][1];
          if ( y < matrix.length && y >= 0 && x < matrix[0].length && x >= 0 ){

              if (matrix[y][x] == char) {
                  result.push(this.directions[i]);
              }
          }

      }

      return result;
  }
  mul() {
      this.energy++;
      let found = this.chooseCell(0);
      let exact = random(found)

      if (exact && this.energy > 1) {
          let x = exact[0];
          let y = exact[1];

          let grass = new Grass(x, y);
          matrix[y][x] = 1;
          grassArr.push(grass);

          this.energy = 0;
      }
  }
}
