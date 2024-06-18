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
document.getElementById("startGameButton").addEventListener("click", chooseCategories)

// Global Variables
const wordGrid = ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"];
const selectedTiles = ["empty", "empty", "empty", "empty"];

const easyCategories = loadFile("rst-LSForSchool/categories/easyCategories.jon");
const mediumCategories = loadFile("rst-LSForSchool/categories/mediumCategories.jon");
const hardCategories = loadFile("rst-LSForSchool/categories/hardCategories.jon");
const stupidCategories = loadFile("rst-LSForSchool/categories/stupidCategories.jon");

let chosenCategories;
let splitCategories;
let tilePositions;

// Allows the user to select items on the grid of tiles
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

// Chooses the 4 random categories from external lists
function chooseCategories() {
  if (confirm("Are you sure you want to start a new game?\nYou will lose your progress on your previous game") == true) {

    clearArray();

    tilePositions = [];
    splitCategories = ["Empty", "Empty", "Empty", "Empty"];
    let idArray = [];
    let shortWordArray = [];
    let randomShortArray = [];

    chosenCategories = [easyCategories[Math.floor(Math.random() * easyCategories.length)], mediumCategories[Math.floor(Math.random() * mediumCategories.length)], hardCategories[Math.floor(Math.random() * hardCategories.length)], stupidCategories[Math.floor(Math.random() * stupidCategories.length)]]

    for (let splitter = 0; splitter <= 3; splitter++) {
      splitCategories[splitter] = chosenCategories[splitter].split(", ");
    }

    for (let categorySelect = 0; categorySelect <= 3; categorySelect++) {
      for (let placeSelected = 1; placeSelected <= 4; placeSelected++) {
        shortWordArray.push(splitCategories[categorySelect][placeSelected]);
      }
    }

    while (tilePositions.length < 16) {
      let randomPosition = Math.floor(Math.random() * 16);
      let tilePushLock = false;
      let tileAdded = false;

      if (tilePositions.length == 0) {
        tilePositions.push(randomPosition);
      } else {
        for (let numCheck = 0; numCheck < tilePositions.length && !tileAdded; numCheck++) {
          if (randomPosition == tilePositions[numCheck]) {
            tilePushLock = true;
          } else if (numCheck == tilePositions.length - 1 && !tilePushLock) {
            tilePositions.push(randomPosition);
            tileAdded = true;
          }
        }
      }
    }

    for (let setRandom = 0; setRandom <= 15; setRandom++) {
      randomShortArray.push(shortWordArray[tilePositions[setRandom]]);
    }

    for (let spaceIdNumOne = 0; spaceIdNumOne <= 3; spaceIdNumOne++) {
      for (let spaceIdNumTwo = 0; spaceIdNumTwo <= 3; spaceIdNumTwo++) {
        idArray.push("space" + spaceIdNumOne + "_" + spaceIdNumTwo);
      }
    }

    for (let thisIsTooManyForLoops = 0; thisIsTooManyForLoops <= 15; thisIsTooManyForLoops++) {
      document.getElementById(idArray[thisIsTooManyForLoops]).innerText = randomShortArray[thisIsTooManyForLoops];
    }
  }
}

// Submits the function as a guess
function submitArray() {
  if (fullSelections()) {
    const sortedSelections = [document.getElementById(selectedTiles[0]).innerText, document.getElementById(selectedTiles[1]).innerText, document.getElementById(selectedTiles[2]).innerText, document.getElementById(selectedTiles[3]).innerText];
    let guessedCategoryNum = -1;
    let guessedCategory = false;
    let splitUsableArray = [];

    const verifyCategories = splitCategories;

    for (let lowerCaser = 0; lowerCaser <= 3; lowerCaser++) {
      sortedSelections[lowerCaser] = sortedSelections[lowerCaser].toLowerCase();
    }
    sortedSelections.sort();

    for (let categoryScroll = 0; categoryScroll <= 3; categoryScroll++) {
      splitUsableArray.push(verifyCategories[categoryScroll]);
    }

    for (let categorySelect = 0; categorySelect <= 3; categorySelect++) {
      for (let lowerCaser = 0; lowerCaser <= 3; lowerCaser++) {
        if (splitUsableArray[categorySelect].length == 4) {
          splitUsableArray[categorySelect][lowerCaser] = splitUsableArray[categorySelect][lowerCaser].toLowerCase();
        }
      }
    }

    for (let categoryScroll = 0; categoryScroll <= 3; categoryScroll++) {
      let verificationArray = splitUsableArray[categoryScroll];

      if (verificationArray.length == 5) {
        verificationArray.shift();
      }

      if (verificationArray.length <= 4 && verificationArray[0].lenght > 1) {
        verificationArray.sort();
      }

      for (let yetAnotherForLoop = 0; yetAnotherForLoop <= 3; yetAnotherForLoop++) {
        // Just trust the process
        sortedSelections[yetAnotherForLoop] += "\n";
        verificationArray[yetAnotherForLoop] += "\n";
        sortedSelections[yetAnotherForLoop] = sortedSelections[yetAnotherForLoop].trimEnd();
        verificationArray[yetAnotherForLoop] = verificationArray[yetAnotherForLoop].trimEnd();
      }

      let correctCount = 0;

      for (let oneMoreHeckingForLoop = 0; oneMoreHeckingForLoop <= 3; oneMoreHeckingForLoop++) {
        if (verificationArray[oneMoreHeckingForLoop] == sortedSelections[oneMoreHeckingForLoop]) {
          correctCount++;
        }
      }

      if (correctCount == 4) {
        guessedCategoryNum = categoryScroll;
        guessedCategory = true;

        lockCategory(guessedCategoryNum);
        clearArray();
      }
      console.log(guessedCategory);
      console.log(guessedCategoryNum);
    }
  } else {
    alert("All submits must have 4 selections.");
  }
}

function lockCategory(categoryToLock) {
  for (let categoryNamer = 0; categoryNamer <= 3; categoryNamer++) {
    splitCategories[categoryToLock][categoryNamer] = chosenCategories[categoryToLock][0];
  }

  console.log(splitCategories);
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
