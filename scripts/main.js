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
const wordGrid = [["empty", "empty", "empty", "empty"], ["empty", "empty", "empty", "empty"], ["empty", "empty", "empty", "empty"], ["empty", "empty", "empty", "empty"]];
const selectedTiles = ["empty", "empty", "empty", "empty"];

const easyCategories = loadFile("../categories/easyCategories.jon");
const mediumCategories = loadFile("../categories/mediumCategories.jon");
const hardCategories = loadFile("../categories/hardCategories.jon");
const stupidCategories = loadFile("../categories/stupidCategories.jon");

let chosenEasy = [];
let chosenMedium = [];
let chosenHard = [];
let chosenStupid = [];

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
  chosenEasy = easyCategories[Math.floor(Math.random() * easyCategories.length - 1)];
  chosenMedium = mediumCategories[Math.floor(Math.random() * mediumCategories.length - 1)];
  chosenHard = hardCategories[Math.floor(Math.random() * hardCategories.length - 1)];
  chosenStupid = stupidCategories[Math.floor(Math.random() * stupidCategories.length - 1)];

  chosenEasy = chosenEasy.split(", ");
  chosenMedium = chosenMedium.split(", ");
  chosenHard = chosenHard.split(", ");
  chosenStupid = chosenStupid.split(", ");

  console.log(chosenEasy);
  console.log(chosenMedium);
  console.log(chosenHard);
  console.log(chosenStupid);

  for (let scroll = 0; scroll <= 3; scroll++) {
    for (let through = 0; through <= 3; through++) {
      let idVariable = "space" + scroll + "_" + through;
    }
  }
}

/** Returns an array, split on new line character by default */
function loadFile(filePath, splitChar = '\n') {
  var result = null;
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", filePath, false);
  xmlhttp.send();
  if (xmlhttp.status==200) {
    result = xmlhttp.responseText;
  }
  return result.split(splitChar);
}
