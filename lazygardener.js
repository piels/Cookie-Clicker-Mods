/************

checks all plants
if


************/

console.log('loaded lazy gardener');
const lazyGarden = {
  g: Game.Objects['Farm'].minigame,
  workers: [],
  fast: false,
  tickLoop: function () {
    // call workers
    this.workers.forEach(w => w.work());
    // close out tickLoop function
    var tOut = this.fast ? 10000 : this.g.nextStep - Date.now() + 5000;
    var self = this;
    var nextLoop = setTimeout(() => { self.tickLoop() }, tOut);
  }

}

const seedCollector = {
  g: lazyGarden.g,
  work: function () {
    // check each tile for new seeds
    console.log("seed collector");
    for (let x = 0; x < 6; x++) {
      for (let y = 0; y < 6; y++) {
        var tile = this.g.getTile(x, y);
        if (tile[0] > 1) {
          var plant = this.g.plantsById[tile[0] - 1];
          var age = tile[1];
          //console.log(x,y,plant.name,age);
          if (!plant.unlocked && (age > plant.mature)) {
            this.g.harvest(x, y);
            console.log("harvested " + plant.name);
          }
        }
      }
    }
  }
}

const weedEater = {
  g: lazyGarden.g,
  unlockedPlantsLastCheck: 0,
  depletedPlants: new WeakMap(),
  work: function () {
    console.log("weed eater");
    if (this.unlockedPlantsLastCheck < this.g.plantsUnlockedN) {
      console.log("checking unlocked plants");
      for (var p of this.g.plantsById) {
        if (p.unlocked) {
          // console.log(p.name, "children:");
          let lockedChildren = 0;
          for (var cname of p.children) {
            // console.log(cname);
            if (!this.g.plants[cname].unlocked) {lockedChildren++;}
          }
          console.log(p.name, "children:", p.children.length, "locked:", lockedChildren);
          if (lockedChildren == 0) this.depletedPlants.set(p, true);
        }
      }
      this.unlockedPlantsLastCheck = this.g.plantsUnlockedN;
      console.log(this.depletedPlants);
    }
    for (let x = 0; x < 6; x++) {
      for (let y = 0; y < 6; y++) {
        var tile = this.g.getTile(x, y);
        if (tile[0] > 0) {
          //what kind of plant is it?
          //what offspring can it have?
          //do I have seeds for all of them?
          //
          var plant = this.g.plantsById[tile[0] - 1];
          if (this.depletedPlants.get(plant)) {
            this.g.harvest(x, y);
            console.log("weeded " + plant.name);
          }
        }
      }
    }
  }


}


lazyGarden.workers.push(seedCollector);
lazyGarden.workers.push(weedEater);
lazyGarden.tickLoop();
