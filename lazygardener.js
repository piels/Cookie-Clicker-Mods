
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

const lastChancer = {
  g: lazyGarden.g,
  work: function () {
    // check each tile for new seeds
    console.log("last chancer");
    for (let x = 0; x < 6; x++) {
      for (let y = 0; y < 6; y++) {
        var tile = this.g.getTile(x, y);
        if (tile[0] > 1) {
          var plant = this.g.plantsById[tile[0] - 1];
          var age = tile[1];
          //console.log(x,y,plant.name,age);
          if ((age + plant.ageTick + plant.ageTickR > 100) && !(plant.onDie)) {
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

const jqbGardener = {
  g: lazyGarden.g,
  grids: {
    0: {
      center: [1,1],
      outer: [[0,0],[0,1],[0,2],[1,2],[2,2],[2,1],[2,0],[1,0]]
    },
    1: {
      center: [4,1],
      outer: [[3,0],[3,1],[3,2],[4,2],[5,2],[5,1],[5,0],[4,0]]
    },
    2: {
      center: [1,4],
      outer: [[0,3],[0,4],[0,5],[1,5],[2,5],[2,4],[2,3],[1,3]]
    },
    3: {
      center: [4,4],
      outer: [[3,3],[3,4],[3,5],[4,5],[5,5],[5,4],[5,3],[4,3]]
    }
  },
  work: function () {
    console.log("JQB gardener");
  }
}


lazyGarden.workers.push(seedCollector);
// lazyGarden.workers.push(weedEater);
lazyGarden.workers.push(lastChancer);
lazyGarden.tickLoop();
