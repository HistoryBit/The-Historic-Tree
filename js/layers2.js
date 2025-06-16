addLayer("w", {
    name: "Woodworking", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "W", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#A52A2A",
    requires: new Decimal(100000), // Can be a function that takes requirement increases into account
    resource: "Wood", // Name of prestige currency
    baseResource: "Knowledge", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 2, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
	    if (hasMilestone("p", 2)) mult = mult.div(3);
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "w", description: "W: Reset for wood", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return hasMilestone("p", 1);},
	 upgrades: {  
	    11: { 
	    title: "Notched sticks",
	    description: "wood boosts knowledge (yeah i got tired of explaining. might add explanations later)",
	    cost: new Decimal(1),
	    effect() { 
		    let eff = player.w.points.add(1).pow(2)

		    return eff },
	 effectDisplay() {
        return "x" + format(upgradeEffect('w', 11));
    }, 
		     }, 
		 12: { 
	    title: "Schöningen spears",
	    description: "Wood boosts prehistoric points",
	    cost: new Decimal(3),
	    effect() { 
		    let eff = player.w.points.add(1).pow(3)

		    return eff },
	 effectDisplay() {
        return "x" + format(upgradeEffect('w', 12));
    }, 
			 unlocked() { return hasUpgrade("w", 11); },
		     }, 
 }, 
	milestones: {
    1: {
        requirementDescription: "Get 1 Wood",
        effectDescription: "Unlock more Prehistoric Upgrades",
        done() { return player.w.points.gte(1) },  // Fix here
        unlocked() { return hasUpgrade("p", 31); },
    },
		
}
	 })
