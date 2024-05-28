/**
 * RST Project
 *
 * Author: Luke Smith
 */

'use strict';

document.getElementById("space03").addEventListener("click", onSelect);

let testCount = 0;

function onSelect() {
  document.getElementById("space03").innerText = ++testCount;
}
