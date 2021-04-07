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
    this.workers.forEach(w => w.work(this.g));
    // close out tickLoop function
    var tOut = this.fast ? 10000 : this.g.nextStep - Date.now() + 5000;
    var self = this;
    var nextLoop = setTimeout(() => {self.tickLoop()}, tOut);
  }

}

const seedCollector = {

  work: function(g){
    // check each tile for new seeds
    console.log("seedCollector.work");
    for (let x = 0; x < 6; x++) {
      for (let y = 0; y < 6; y++) {
        var tile = g.getTile(x,y);
        if (tile[0] > 1) {
          var plant = g.plantsbyId[t[0] - 1];
          var age = tile[1];
          if (!plant.unlocked && (age > plant.mature) ) {
            g.harvest(x,y);
          }
        }
      }
    }
  }


}

lazyGarden.workers.push(seedCollector);
lazyGarden.tickLoop();
