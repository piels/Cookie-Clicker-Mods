/************

checks all plants
if


************/

console.log('loaded lazy gardener');
const lazyGarden = {
  g : Game.Objects['Farm'].minigame,
  workers : [],
  fast: false,
  tickLoop: function(){
    // call workers
    this.workers.forEach(w => w.work());
    // close out tickLoop function
    var tOut = this.fast ? 10000 : this.g.nextStep - Date.now() + 5000;
    var self = this;
    var nextLoop = setTimeout(() => {self.tickLoop()}, tOut);
  }

}

const seedCollector = {
  g: lazyGarden.g,
  work: function(){
    // check each tile for new seeds
    console.log("seed collector");
    for (let x = 0; x < 6; x++) {
      for (let y = 0; y < 6; y++) {
        var tile = this.g.getTile(x,y);
        if (tile[0] > 1) {
          var plant = this.g.plantsById[tile[0] - 1];
          var age = tile[1];
          console.log(x,y,plant.name,age);
          if (!plant.unlocked && (age > plant.mature) ) {
            this.g.harvest(x,y);
            console.log("harvested");
          }
        }
      }
    }
  }


}

lazyGarden.workers.push(seedCollector);
lazyGarden.tickLoop();
