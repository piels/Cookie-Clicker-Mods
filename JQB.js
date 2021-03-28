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
var JQB = new JqbGarden;
JQB.tickLoop();

function JqbGarden() {
  const gardenGame = Game.Objects['Farm'].minigame;
  var soilMode = undefined;
  var quads = [];
  var tiles = [];
  var i, j;
  for (i = 0; i<6;i++) {
    for (j = 0; j < 6; j++) {
      tiles[i][j] = new JqbTile(this,i,j);
    }
  }
  for ( i = 0; i < 4; i++) {
    quads[i] = new JqbQuad(this,i);
  }
  function tickLoop(){
    for (i = 0; i < 4; i++) {
			quads[i].check();
		}
    var nextLoop = setTimeout(tickLoop, this.gardenGame.nextStep - Date.now() + 5000);
  }

}

function JqbQuad(g, i) {
  const n = i;
  const garden = g;
  const x0 = (n % 2) * 3;
  const y0 = Math.floor(n / 2) * 3;
  const tiles = [
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
  const outer = tiles.slice(0,7);
  const center = tiles[8];

  function check() {
    console.log("quad " + n);
    tiles.forEach(t => console.log(t.name));
  }

}

function JqbTile(g, i, j) {
  const garden = g;
  const tile = garden.gardenGame.getTile(i, j);
  get name() {
    return garden.gardenGame.plantsbyId[tile[0] - 1].name;
  }
}
