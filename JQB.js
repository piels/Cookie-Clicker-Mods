/************

Quad states
Empty ◄─────────────────────┬──┐
└─► Growing QBs             │  │
    └─► Breeding QBs ◄────┐ │  │
        ├─► Wrong Sprout ─┘ │  │
        ├─► Dying QBs ──────┘  │
        └─► JQB Sprout         │
            └─► Mature JQB ────┘


************/


console.log('loaded JQB');
const G = Game.Objects['Farm'].minigame;
var JQB = new JqbGarden;
JQB.tickLoop();

function JqbGarden() {
  // const gardenGame = Game.Objects['Farm'].minigame;
  this.soilMode = undefined;
  this.quads = [];
  this.tiles = [];
  var i, j;
  for (i = 0; i < 6; i++) {
    this.tiles[i] = new Array();
    for (j = 0; j < 6; j++) {
      this.tiles[i][j] = new JqbTile(this, i, j);
    }
  }
  for ( i = 0; i < 4; i++) {
    this.quads[i] = new JqbQuad(this, i);
  }
  this.tickLoop = function(){
    for (i = 0; i < 4; i++) {
			this.quads[i].check();
		}
    var nextLoop = setTimeout(this.tickLoop, G.nextStep - Date.now() + 5000);
  }

}

function JqbQuad(g, i) {
  this.n = i;
  this.garden = g;
  const x0 = (n % 2) * 3;
  const y0 = Math.floor(n / 2) * 3;
  this.tiles = [
    garden.tiles[x0    , y0],      //northwest
    garden.tiles[x0 + 1, y0],      //north
    garden.tiles[x0 + 2, y0],      //northeast
    garden.tiles[x0 + 2, y0 + 1],  //east
    garden.tiles[x0 + 2, y0 + 2],  //southeast
    garden.tiles[x0 + 1, y0 + 2],  //south
    garden.tiles[x0    , y0 + 2],  //southwest
    garden.tiles[x0    , y0 + 1],  //west
    garden.tiles[x0 + 1, y0 + 1]   //center
  ];
  this.outer = this.tiles.slice(0,7);
  this.center = this.tiles[8];

  this.check = function() {
    console.log("quad " + this.n);
    this.outer.forEach(t => console.log(t.plantName()));
  }

}

function JqbTile(garden, i, j) {
  this.garden = garden;
  this.tile = G.getTile(i, j);
  this.plantName = function() {
    return G.plantsbyId[this.tile[0] - 1].name;
  }
}
