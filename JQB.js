/************

Quad states
Empty ──────────────────────┬──┐
└── Growing QBs             │  │
    └── Breeding QBs ─────┐ │  │
        ├── Wrong Sprout ─┘ │  │
        ├── Dying QBs ──────┘  │
        └── JQB Sprout         │
            └── Mature JQB ────┘


************/


console.log('loaded JQB');
var JQB = {
	G : Game.Objects['Farm'].minigame,
	q : [],
	soilMode : undefined,
	tickLoop : function () {
		for (i = 0; i < 6; i++) {
			for (j = 0; j < 6; j++) {
				console.log(JQB.G.getTile(i,j));
			}
		}
		var nextLoop = setTimeout(JQB.tickLoop, JQB.G.nextStep - Date.now() + 5000);
	}
}

for (var i = 0; i<4; i++) {
	JQB.q[i] = {
		
	}	
}

JQB.tickLoop();