/**
 * RST Project
 *
 * Author: Luke Smith
 */

'use strict';

document.getElementById("wordTable").addEventListener("click", onSelect);
document.getElementById("clearArray").addEventListener("click", clearArray);

const wordGrid = [[false, false, false, false], [false, false, false, false], [false, false, false, false], [false, false, false, false]];
const selectedTiles = ["empty", "empty", "empty", "empty"]

function onSelect(event) {
  let checkTileLock = false;
  let deselectLock = false;

  // Checks to see if the new selected item is already in the array of selected tiles. I don't want duplicates
  for (let checkTile = 0; checkTile <= 3; checkTile++) {
    if (selectedTiles[checkTile] == event.target.id) {
      selectedTiles[checkTile] = "empty";
      deselectLock = true;
    }
  }

  // Checks to see if a tile fits into the selected tile array
  for (let checkTile = 0; checkTile <= 3; checkTile++) {
    if (selectedTiles[checkTile] == "empty" && !checkTileLock && !deselectLock) {
      selectedTiles[checkTile] = event.target.id;
      checkTileLock = true;
    }
  }

  // Colour Change
  if (document.getElementById(event.target.id).style.backgroundColor != "sandybrown") {
    document.getElementById(event.target.id).style.backgroundColor = "sandybrown";
  } else {
    document.getElementById(event.target.id).style.backgroundColor = "bisque";
  }
}

function clearArray() {
  for (let zamboniX = 0; zamboniX <= 3; zamboniX++) {
    selectedTiles[zamboniX] = "empty";
    for (let zamboniY = 0; zamboniY <= 3; zamboniY++) {
      let clearColour = "space" + zamboniX + "_" + zamboniY;
      document.getElementById(clearColour).style.backgroundColor = "bisque";
    }
  }
}
