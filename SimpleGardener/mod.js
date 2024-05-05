var modName = "SimpleGardener"
console.log("loaded " + modName);

const simpleGarden = {
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

const goldCloverGrower = {
  g: simpleGarden.g,
  work: function () {
    console.log("work goldCloverGrower")
    let myGoldClover = this.g.plantsById[5];
    let myNurseTulip = this.g.plantsById[16];
    if (Game.cookies >= this.g.getCost(myGoldClover) * 1000) {  // golden clovers in budget
      for (let x = 0; x < 6; x++) {
        for (let y = 0; y < 6; y = y + 2) {
          var tile = this.g.getTile(x, y);
          if (tile[0] == 0) {  // 0 = no plant
            console.log("tryna plant goldenClover");
            document.getElementById("gardenSeed-5").click();
            this.g.clickTile(x, y);
          }
        }
      }
      for (let x = 0; x < 6; x++) {
        for (let y = 1; y < 6; y = y + 2) {
          var tile = this.g.getTile(x, y);
          if (tile[0] == 0) {  // 0 = no plant
            console.log("tryna plant nurseTulip");
            document.getElementById("gardenSeed-16").click();
            this.g.clickTile(x, y);
          }
        }
      }
    } else {
      console.log("not enough cookies to plant")
    }
  }
}

simpleGarden.workers.push(goldCloverGrower);

simpleGarden.tickLoop();
