addLayer("p", {
    name: "Paleolithic", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#8B5C2A",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Paleolithic Points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5,
    
    	// Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
	    if (hasUpgrade("p", 21)) mult = mult.add(upgradeEffect("p",11)/5);
	    if (hasUpgrade("p", 12)) mult = mult.mul(upgradeEffect("p",12));
	    if (hasUpgrade("p", 23)) mult = mult.mul(upgradeEffect("p",23));
	    if (hasUpgrade("w", 12)) mult = mult.mul(upgradeEffect("w",12));
	    let softcap = new Decimal(10000);
    let power = 1/3;
    if (player.p.points.gt(softcap)) {
        mult = mult.pow(power);
    }
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    upgrades: {  
	    11: { 
	    title: "Stone tools",
	    description: "Stone tools were humanity’s first innovation thus +2 Knowledge point generation",
	    cost: new Decimal(1),
	    effect() { 
		    let eff = new Decimal(2);
		    if (hasUpgrade("p", 13)) eff = eff.mul(upgradeEffect("p", 13));
		    if (hasUpgrade("p", 22)) eff = eff.mul(upgradeEffect("p", 22));

		    return eff },
	 effectDisplay() {
        return "+" + format(upgradeEffect('p', 11));
    }, 
		},
	     12: { 
	    title: "Control of Fire",
	    description: "early humans gained warmth, protection, and the spark of innovation (Boosts Paleolithic points)",
	    cost: new Decimal(5),
	    effect() { 
		    let eff = new Decimal(2);
		    if (hasUpgrade("p", 31)) eff = eff.add(upgradeEffect("p", 31));

		    return eff },
	 effectDisplay() {
        return "x" + format(upgradeEffect('p', 12));
    }, 
     unlocked() { return hasUpgrade("p", 11); },
	    
		    },
	    13: { 
	    title: "Advanced Stone Tools",
	    description: "Better, harder, stronger stone tools (Boosts First upgrade based on Knowledge)",
	    cost: new Decimal(10),
	    effect() { 
    let base = Decimal.max(player.points, 1)
    let eff = new Decimal(base).pow(0.2)
    return eff
},
		    	 effectDisplay() {
        return "x" + format(upgradeEffect('p', 13));
    }, 
		         unlocked() { return hasUpgrade("p", 12); },
		    },
		    21: { 
	    title: "Language",
	    description: "The emergence of complex vocal communication (boosts knowledge based on Paleolithic points also let first upgrade affect paleolithic points with a reduced effect)",
	    cost: new Decimal(25),
	    effect() { 
    let base = Decimal.max(player.p.points, 1)
    let eff = new Decimal(base).pow(0.3)
    if (hasUpgrade("p", 42)) eff = eff.pow(upgradeEffect("p", 42));
    return eff
},

		  
	 effectDisplay() {
        return "x" + format(upgradeEffect('p', 21));
    }, 
     unlocked() { return hasUpgrade("p", 13); },
	    
		    },
	     22: { 
	    title: "Bone tools",
	    description: "Are bone tools better than stone tools!? (boosts first upgrade based on Paleolithic points)",
	    cost: new Decimal(125),
	    effect() { 
    let base = player.p.points
    let eff = new Decimal(base).pow(0.3)
    return eff
},

		  
	 effectDisplay() {
        return "x" + format(upgradeEffect('p', 22));
    }, 
     unlocked() { return hasUpgrade("p", 21); },
	    
		    },
	    	     23: { 
	    title: "Boats",
	    description: "Enabled early humans to cross rivers, navigate coastlines, and expand trade networks. (knowledge boosts Paleolithic points",
	    cost: new Decimal(500),
	    effect() { 
    let base = player.points
    let eff = new Decimal(base).pow(0.1)
	if (hasUpgrade("p", 41)) eff = eff.add(upgradeEffect("p", 41));
	if (hasUpgrade("p", 33)) eff = eff.pow(upgradeEffect("p", 33));
    return eff
},
			     effectDisplay() {
        return "x" + format(upgradeEffect('p', 23));
    }, 
	unlocked() { return hasUpgrade("p", 22); },	    
    },  
	    31: { 
	    title: "Hafting",
	    description: "By securing stone tools to wooden shafts, early humans enhanced their hunting, crafting, and construction abilities. (Knowledge adds upgrade 12 base)",
	    cost: new Decimal(10000),
	    effect() { 
    let base = Decimal.max(player.points, 1)
    let eff = new Decimal(base).pow(0.05)
		if (hasUpgrade("p", 43)) {
    eff = eff.mul(upgradeEffect("p", 32));
} else if (hasUpgrade("p", 32)) {
    eff = eff.add(upgradeEffect("p", 32));
}
    return eff
},
		    effectDisplay() {
        return "+" + format(upgradeEffect('p', 31));
    }, 
		 unlocked() { return hasUpgrade("p", 23); },	
	    
	     }, 
	     32: { 
	    title: "Food Storage",
	    description: "The ability to store food (Wood adds to hafting(Up31) base)",
	    cost: new Decimal(12500),
	    effect() { 
    let base = Decimal.max(player.w.points, 1)
    let eff = new Decimal(base).pow(12/9)
    return eff
},
		   effectDisplay() {
    if (hasUpgrade("p", 43)) {
        return "x" + format(upgradeEffect('p', 32));
    } else {
        return "+" + format(upgradeEffect('p', 32));
    }
}
		 unlocked() { return hasMilestone("w", 1); },	
	    
	     }, 
	    33: { 
	    title: "Pigments",
	    description: "allowed early humans to produce colors (Paleolithic points raises boats(up21) before being raised by up32)",
	    cost: new Decimal(20000),
	    effect() { 
    let base = Decimal.max(player.p.points, 1)
    let eff = new Decimal(base).pow(0.03)
    return eff
},
		    effectDisplay() {
        return "^" + format(upgradeEffect('p', 33));
    }, 
		 unlocked() { return hasUpgrade("p", 32); },	
	    
	     }, 
	     41: { 
	    title: "Trade",
	    description: "Wood adds to boats(up21) base",
	    cost: new Decimal(1e6),
	    effect() { 
    let base = Decimal.max(player.w.points, 1)
    let eff = new Decimal(base).pow(0.5)
		    if (hasUpgrade("p", 43)) {
    eff = eff.pow(2);
		    
    return eff
},
		    effectDisplay() {
        return "+" + format(upgradeEffect('p', 41));
    }, 
		 unlocked() { return hasUpgrade("p", 33); },	
	    
	     }, 
	     42: { 
	    title: "Adhesive",
	    description: "Knowledge raises language upgrade ",
	    cost: new Decimal(1e7),
	    effect() { 
    let base = Decimal.max(player.points, 1)
    let eff = new Decimal(base).pow(0.025)
    return eff
},
		    effectDisplay() {
        return "^" + format(upgradeEffect('p', 42));
    }, 
		 unlocked() { return hasUpgrade("p", 41); },	
	    
	     }, 
	     43: { 
	    title: "Pottery",
	    description: "Food storage(up32) instead of adding it multiplies, also trade is squared",
	    cost: new Decimal(2e8),
	    
    
		 unlocked() { return hasUpgrade("p", 42); },	
	    
	     }, 
	    
	    }, 
	milestones: {
		1: {
	requirementDescription: "Unlock Hafting",
        effectDescription:"Unlock the woodworking layer (theres a softcap applied at 10000 Paleolithic points)",
        done() { return hasUpgrade("p", 31); },  
        unlocked() { return hasUpgrade("p", 31); }, 
},
		2: {
	requirementDescription: "Unlock trade",
        effectDescription:"divides wood requierement by 3 (theres a second softcap applied at 1e8 Paleolithic points)",
        done() { return hasUpgrade("p", 41); },  
        unlocked() { return hasMilestone("p", 1); }, 
},
		},
			
     
	    
	     
	
})
