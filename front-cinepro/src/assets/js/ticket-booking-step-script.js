const seatSvg = `<svg fill="white" width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6.75 21.5V20M17.25 21.5V20" stroke="currentcolor"></path><path clip-rule="evenodd" d="M18.144 19.75H5.856c-.746 0-1.356-.66-1.356-1.466L5.585 6.47c0-1.771 1.34-3.22 2.98-3.22h6.87c1.64 0 2.98 1.449 2.98 3.22L19.5 18.284c0 .806-.61 1.466-1.356 1.466Z" stroke="currentcolor"></path><path d="M10 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM10 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM14 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM14 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" fill="currentcolor"></path><path d="M4.5 15.5h15M2.5 12v4.5H5M19 16.5h2.5V12" stroke="currentcolor"></path></svg>`;

function showSeatInfo(seatId, seatElement) {
  const allSeats = document.querySelectorAll(".seat");
  allSeats.forEach((seat) => {
    seat.style.boxShadow = "none";
  });

  const seatInfo = document.querySelector(`.${seatElement}`);
  const [section, row, column] = seatId.split("-").slice(1); // Extract section, row, and column from seatId
  const textContent = `Seat ${column}, row ${row}, section ${section}`;

  const currentSeat = document.getElementById(seatId);
  currentSeat.style.boxShadow = "0 0 10px rgba(255,255,255, 0.5)";

  seatElement === "seat-selection"
    ? (seatInfo.textContent = "Votre selection: " + textContent)
    : (seatInfo.textContent = "Siege courant: " + textContent);

  return textContent;
}

function toggleSeatStatus(seatId, isDisabled = false) {
  const seatElement = document.getElementById(seatId);
  if (!seatElement) {
    console.error(`Seat with ID ${seatId} not found.`);
    return;
  }

  const svgElement = seatElement.querySelector("svg");
  if (!svgElement) {
    console.error(`SVG not found inside seat ${seatId}.`);
    return;
  }

  if (isDisabled) {
    seatElement.style.pointerEvents = "none";
    svgElement.setAttribute("fill", "grey");
  } else {
    seatElement.style.pointerEvents = "auto";
    svgElement.setAttribute("fill", "blue");
  }
  showSeatInfo(seatId, "seat-selection");
}

function randomlyToggleSeats(rows, columns, sections) {
  const seatsToToggle = [];

  for (let i = 0; i < 10; i++) {
    const section = Math.floor(Math.random() * sections) + 1;
    const row = Math.floor(Math.random() * rows) + 1;
    const column = Math.floor(Math.random() * columns) + 1;
    seatsToToggle.push(`seat-${section}-${row}-${column}`);
  }

  seatsToToggle.forEach((seatId) => toggleSeatStatus(seatId, true));
}

function generateSeatMap(rows, columns, sections) {
  let seatMapHTML =
    '<div class="container d-flex justify-content-center mx-auto px-5 seat-map d-flex flex-wrap w-75 gap-5 justify-content-center mx-5 upside-down">';

  for (let s = 1; s <= sections; s++) {
    // Iterate over sections in increasing order
    seatMapHTML += `<div id="section-${s}" class="section d-flex flex-column">`;
    for (let i = 1; i <= rows; i++) {
      seatMapHTML += `<div class="d-flex flex-row">`;
      for (let j = 1; j <= columns; j++) {
        const seatId = `seat-${s}-${i}-${j}`;
        seatMapHTML += `<div id="${seatId}" class="seat" onclick="toggleSeatStatus('${seatId}')" onmouseover="showSeatInfo('${seatId}','current-seat')">${seatSvg}</div>`;
      }
      seatMapHTML += `</div>`;
    }
    seatMapHTML += `</div>`;
  }

  seatMapHTML += `   </div><div
     class="legend m-2 w-100 p-3 d-flex flex-column align-items-center"
   >
     <h2>Légende</h2>
     <div class="sieges d-flex flex-wrap justify-content-between gap-2 p-4">
       <div class="siege d-flex">
         <div class="mx-2"><svg fill="white" width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6.75 21.5V20M17.25 21.5V20" stroke="currentcolor"></path><path clip-rule="evenodd" d="M18.144 19.75H5.856c-.746 0-1.356-.66-1.356-1.466L5.585 6.47c0-1.771 1.34-3.22 2.98-3.22h6.87c1.64 0 2.98 1.449 2.98 3.22L19.5 18.284c0 .806-.61 1.466-1.356 1.466Z" stroke="currentcolor"></path><path d="M10 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM10 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM14 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM14 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" fill="currentcolor"></path><path d="M4.5 15.5h15M2.5 12v4.5H5M19 16.5h2.5V12" stroke="currentcolor"></path></svg></div>
         <div class="description">Libre</div>
       </div>
       <div class="siege d-flex">
         <div class="img mx-2"><svg fill="grey" width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6.75 21.5V20M17.25 21.5V20" stroke="currentcolor"></path><path clip-rule="evenodd" d="M18.144 19.75H5.856c-.746 0-1.356-.66-1.356-1.466L5.585 6.47c0-1.771 1.34-3.22 2.98-3.22h6.87c1.64 0 2.98 1.449 2.98 3.22L19.5 18.284c0 .806-.61 1.466-1.356 1.466Z" stroke="currentcolor"></path><path d="M10 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM10 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM14 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM14 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" fill="currentcolor"></path><path d="M4.5 15.5h15M2.5 12v4.5H5M19 16.5h2.5V12" stroke="currentcolor"></path></svg></div>
         <div class="description">Occupé</div>
       </div>
       <div class="siege d-flex">
         <div class="img mx-2"><svg fill="blue" width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6.75 21.5V20M17.25 21.5V20" stroke="currentcolor"></path><path clip-rule="evenodd" d="M18.144 19.75H5.856c-.746 0-1.356-.66-1.356-1.466L5.585 6.47c0-1.771 1.34-3.22 2.98-3.22h6.87c1.64 0 2.98 1.449 2.98 3.22L19.5 18.284c0 .806-.61 1.466-1.356 1.466Z" stroke="currentcolor"></path><path d="M10 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM10 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM14 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM14 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" fill="currentcolor"></path><path d="M4.5 15.5h15M2.5 12v4.5H5M19 16.5h2.5V12" stroke="currentcolor"></path></svg></div>
         <div class="description">Sélectionné</div>
       </div>
     </div>
   </div>`;

  return seatMapHTML;
}

function initSeatMap(rows, columns, sections) {
  const theaterSeatMap = generateSeatMap(rows, columns, sections);
  const seatMap = document.getElementById("seat-map");
  seatMap.innerHTML = theaterSeatMap;
}
