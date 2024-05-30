/**
 * RST Project
 *
 * Author: Luke Smith
 */

'use strict';

document.getElementById("wordTable").addEventListener("click", onSelect);

const wordGrid = [[false, false, false, false], [false, false, false, false], [false, false, false, false], [false, false, false, false]];
const selectedTiles = ["empty", "empty", "empty", "empty"]

function onSelect(event) {
  let checkTileLock = false;

  // Add Deselect Function
  for (let checkTile = 0; checkTile <= 3; checkTile++) {
    if (selectedTiles[checkTile] == "empty" && !checkTileLock) {
      selectedTiles[checkTile] = event.target.id;
      checkTileLock = true;
    }
  }

  // Colour Change
  if (document.getElementById(event.target.id).style.backgroundColor == "bisque") {
    document.getElementById(event.target.id).style.backgroundColor = "sandybrown";
  } else {
    document.getElementById(event.target.id).style.backgroundColor = "bisque";
  }
}
