/*********************************************************
 *
 *
 *                    utils.js
 *
 * This file contains utility functions for most of the project front-end.
 *
 *
 *******************************************************/

// Movie-ticket component function to toggle the display of the moreInfo div :
function moreInfo() {
  var moreInfo = document.getElementById("moreInfo");
  var moreInfoBtn = document.getElementById("moreInfoBtn");
  var lessInfoBtn = document.getElementById("lessInfoBtn");

  if (moreInfo.style.display === "none") {
    moreInfo.style.display = "block";
    moreInfoBtn.classList.add("d-none");
    lessInfoBtn.classList.remove("d-none");
  } else {
    moreInfo.style.display = "none";
    moreInfoBtn.classList.remove("d-none");
    lessInfoBtn.classList.add("d-none");
  }
}

// Show selection page component function to enable the date picker:
$(function () {
  $("#datepicker").datepicker();
  $("#format").on("change", function () {
    $("#datepicker").datepicker("option", "dateFormat", $(this).val());
  });
});
