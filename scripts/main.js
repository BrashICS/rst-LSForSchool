/**
 * RST Project
 *
 * Author: Luke Smith
 */

'use strict';

document.getElementById("space0_0").addEventListener("click", onSelect0_0);
document.getElementById("space0_1").addEventListener("click", onSelect0_1);
document.getElementById("space0_2").addEventListener("click", onSelect0_2);
document.getElementById("space0_3").addEventListener("click", onSelect0_3);

document.getElementById("space1_0").addEventListener("click", onSelect1_0);
document.getElementById("space1_1").addEventListener("click", onSelect1_1);
document.getElementById("space1_2").addEventListener("click", onSelect1_2);
document.getElementById("space1_3").addEventListener("click", onSelect1_3);

document.getElementById("space2_0").addEventListener("click", onSelect2_0);
document.getElementById("space2_1").addEventListener("click", onSelect2_1);
document.getElementById("space2_2").addEventListener("click", onSelect2_2);
document.getElementById("space2_3").addEventListener("click", onSelect2_3);

document.getElementById("space3_0").addEventListener("click", onSelect3_0);
document.getElementById("space3_1").addEventListener("click", onSelect3_1);
document.getElementById("space3_2").addEventListener("click", onSelect3_2);
document.getElementById("space3_3").addEventListener("click", onSelect3_3);

const wordGrid = [[false, false, false, false], [false, false, false, false], [false, false, false, false], [false, false, false, false]];


function onSelect0_0() {
  selectColour();
}

function selectColour() {
  for (let index = 0; index <= 3; index++) {
    for (let sIndex = 0; sIndex <= 3; sIndex++) {
      let coordVariable = "space" + String(index) + "_" + String(sIndex);

      if (document.getElementById(coordVariable).innerText == "Kneecap check") {
        document.getElementById(coordVariable).innerText = "'sup?";
      } else {
        document.getElementById(coordVariable).innerText = "Kneecap check";
      }

    }
  }
}
