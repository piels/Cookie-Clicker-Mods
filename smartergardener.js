/****
 * 
 * 
 * 
 ****/

console.log("");



/************



== Stage 1: Meddleweed & Co. ==
Soil: fertilizer
Let Meddleweed grow
Harvest first mature Meddleweed ASAP
Harvest all Meddleweed as late as possible, 
     until Brown Mold and Crumbspore found

==Stage 2: Simple Crossbreeding==
Soil = Woodchips
Baker's Wheat x Baker's Wheat: Thumbcorn
Baker's Wheat x Baker's Wheat: Bakeberry
Baker's Wheat x Thumbcorn: Cronerice
Cronerice x Thumbcorn: Gildmillet
Baker's Wheat x Gildmillet: Clover
Clover x Gildmillet: Shimmerlily
Shimmerlily x Cronerice: Elderwort

Baker's Wheat x Brown Mold: Chocoroot
Brown Mold: White Mildew
Chocoroot x White Mildew: White Chocoroot

Shimmerlily x White Chocoroot: Whiskerbloom
Shimmerlily x Whiskerbloom: Chimerose
Whiskerbloom x Whiskerbloom: Nursetulip

White Mildew x Clover: Green Rot
Green Rot x Brown Mold: Keenmoss
Chocoroot x Keenmoss: Drowsyfern


    Wardlichen

    1x Cronerice, 1x Keenmoss (0.005)
    1x Cronerice, 1x White Mildew (0.005)

    NOTE: Since White Mildew also has a high probability of generating Brown Mold, it is usually better to use Keenmoss to obtain Wardlichen


Bakeberry x Chocoroot: Queenbeet
Crumbspore x Crumbspore: Doughshroom
Crumbspore x Thumbcorn: Glovemorel
Crumbspore x Shimmerlily: Cheapcap
Crumbspore x Brown Mold: Wrinklegill

Doughshroom x Green Rot: Fool Bolete


Queenbeet x Queenbeet: Duketater
    

Baker’s Wheat x White Chocoroot: Tidygrass

Elderwort x Crumbspore: Ichorpuff

== Stage 3: Harder Combinations ==

3 Tidygrass x 3 Elderwort: Everdaisy

Shriekbulb

1 Wrinklegill, 1x Elderwort (0.001)
5x Elderwort (0.001)
3x Any Duketater (0.005)
4x Any Doughshrom (0.002)
5x Queenbeet (0.001)

Clover x Clover: Golden Clover

Golden Clover

1x Baker’s Wheat, 1x Gildmillet (0.0007)
2x mature Clover, less than 5x total clover (0.0001)
4x or more Clover (0.0007)

NOTE: This means that in order to be able to only grow spawn a Golden Clover, and have no chance of spawning regular clover, you should have at least 5 clovers around each open plot with at least 4 or them being mature.  In order to have the highest mutation rate, albeit with the possibility of generating regular clover, you should have exactly 4x mature clover around each open plot.


Juicy Queenbeet
8x Queenbeet (0.001)


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
lazyGarden.tickLoop();
