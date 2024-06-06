/**
 * RST Project
 *
 * Author: Luke Smith
 */

'use strict';

// Event Listeners
document.getElementById("wordTable").addEventListener("click", onSelect);
document.getElementById("clearArrayButton").addEventListener("click", clearArray);
document.getElementById("submitArrayButton").addEventListener("click", submitArray)
document.getElementById("startGameButton").addEventListener("click", chooseCategory)

// Global Variables
const wordGrid = ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"];
const selectedTiles = ["empty", "empty", "empty", "empty"];

const easyCategories = loadFile("../categories/easyCategories.jon");
const mediumCategories = loadFile("../categories/mediumCategories.jon");
const hardCategories = loadFile("../categories/hardCategories.jon");
const stupidCategories = loadFile("../categories/stupidCategories.jon");

let chosenCategories;
let splitCategories;

function onSelect(event) {
  // Local Variables
  let checkTileLock = false;
  let deselectLock = false;
  let colourLock = fullSelections();

  // Checks to see if the new selected item is already in the array of selected tiles. I don't want duplicates
  for (let checkTile = 0; checkTile <= 3; checkTile++) {
    if (selectedTiles[checkTile] == event.target.id) {
      selectedTiles[checkTile] = "empty";
      colourLock = fullSelections();
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

  // Colour Change, (it will only select 4 at a time)
  if (!colourLock) {
    if (document.getElementById(event.target.id).style.backgroundColor != "sandybrown") {
      document.getElementById(event.target.id).style.backgroundColor = "sandybrown";
    } else {
      document.getElementById(event.target.id).style.backgroundColor = "bisque";
    }
  }
}

// Checks the array of selections to see if the array is full
function fullSelections() {
  for (let checkTile = 0; checkTile <= 3; checkTile++) {
    if (selectedTiles[checkTile] == "empty") {
      return false;
    } else if (checkTile == 3 && selectedTiles[checkTile] != "empty") {
      return true;
    }
  }
}

// Adds a button that instantly clears selections
function clearArray() {
  for (let zamboniX = 0; zamboniX <= 3; zamboniX++) {
    selectedTiles[zamboniX] = "empty";
    for (let zamboniY = 0; zamboniY <= 3; zamboniY++) {
      let clearColour = "space" + zamboniX + "_" + zamboniY;
      document.getElementById(clearColour).style.backgroundColor = "bisque";
    }
  }
}

// Submits the function as a guess
function submitArray() {
  if (fullSelections()) {
    const wordArray = [document.getElementById(selectedTiles[0]).innerText, document.getElementById(selectedTiles[1]).innerText, document.getElementById(selectedTiles[2]).innerText, document.getElementById(selectedTiles[3]).innerText];

    const sortedArray = wordArray.sort();
  } else {
    alert("All submits must have 4 selections.");
  }
}

function chooseCategory() {
  const tilePositions = []
  splitCategories = ["Empty", "Empty", "Empty", "Empty"];
  let positionLock = false;

  chosenCategories = [easyCategories[Math.floor(Math.random() * easyCategories.length)], mediumCategories[Math.floor(Math.random() * mediumCategories.length)], hardCategories[Math.floor(Math.random() * hardCategories.length)], stupidCategories[Math.floor(Math.random() * stupidCategories.length)]]

  for (let splitter = 0; splitter < chosenCategories.length; splitter++) {
    splitCategories[splitter] = chosenCategories[splitter].split(", ");
  }

  for (let numAdder = 0; numAdder <= 15; numAdder++) {
    let randomPosition = Math.floor(Math.random() * 16);
    for (let numCheck = 0; numCheck < tilePositions.length; numCheck++) {
      positionLock = false;
      if (numCheck == 0) {
        tilePositions.push(randomPosition);
      } else if (randomPosition == tilePositions[numCheck]) {
        positionLock = true;
      }

      if (numCheck == tilePositions.length - 1 && randomPosition != tilePositions[numCheck - 1] && !positionLock) {
        tilePositions.push(randomPosition);
      }
    }
  }

  console.log(tilePositions);
}

/** Returns an array, split on new line character by default */
function loadFile(filePath, splitChar = '|') {
  var result = null;
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", filePath, false);
  xmlhttp.send();
  if (xmlhttp.status==200) {
    result = xmlhttp.responseText;
  }
  return result.split(splitChar);
}
