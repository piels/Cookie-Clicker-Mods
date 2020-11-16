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
		console.log('JQB loop');
		var nextLoop = setTimeout(JQB.tickLoop, JQB.G.nextStep - Date.now() + 5000);
	}
}

for (var i = 0; i<4; i++) {
	JQB.q[i] = {
		
	}
	
}

JQB.tickLoop();