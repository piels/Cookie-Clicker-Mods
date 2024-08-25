// this isn't anything yet

for (const [index, element] of Game.Objects['Bank'].minigame.goodsById.entries()) {
    console.log(element.name,Game.Objects['Bank'].minigame.getRestingVal(index));
}