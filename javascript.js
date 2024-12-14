const container = document.querySelector("#container");
let colorOn = false;

// Set container size as a fraction of the screen
function setContainerSize() {
    const width = Math.min(window.innerWidth * 0.8, 512, window.innerHeight); // 80% of viewport width
    const height = Math.min(window.innerWidth * 0.8, 512, window.innerHeight); // 80% of viewport height
    container.style.width = width + "px";
    container.style.height = height + "px";
}

// Create the grid
function createGrid(rows, cols) {
    container.innerHTML = "";  // Clear existing grid
    for (let i = 0; i < rows * cols; i++) {
        const div = document.createElement("div");
        div.classList.add("grid-item");
        div.style.height = `calc(100% / ${rows})`;
        div.style.width = `calc(100% / ${cols})`;
        div.style.opacity = "1"; // Set opacity to 1
        div.style.border = "1px solid rgba(211, 211, 211, 1)";
        container.appendChild(div);

        div.addEventListener("mouseover", () => {
            if (isMouseDown) handleHover(div);
        });

        div.addEventListener("click", () => {
            handleHover(div);
        });
    }
}

// Handle hover action (set background color)
function handleHover(div) {
    div.style.backgroundColor = colorOn ? getRandomRgbColor() : "black";
}

// Track mouse state
let isMouseDown = false;
document.addEventListener("mousedown", () => (isMouseDown = true));
document.addEventListener("mouseup", () => (isMouseDown = false));

// Switch button functionality
const switchButton = document.querySelector("#mySwitch");

// Store the event listener functions to reference later
const handleClickOn = (cell) => {
    cell.style.backgroundColor = "white";
};

const handleClickOff = (cell) => {
    handleHover(cell);
};

// Switch button functionality
switchButton.addEventListener("change", () => {
    const cells = document.querySelectorAll(".grid-item");
    if (switchButton.checked) {
        // Switch is ON: reset grid cells to white when clicked and hover doesn't change color
        cells.forEach(cell => {
            cell.removeEventListener("click", handleClickOff); // Remove previous 'click' listener
            cell.addEventListener("click", () => handleClickOn(cell)); // Add the 'click' listener for the ON state
        });
        cells.forEach(cell =>{
            cell.removeEventListener("mouseover", handleClickOff); // Remove previous 'click' listener
            cell.addEventListener("mouseover", () => {
                if(isMouseDown) {
                handleClickOn(cell)
                }
            }); // Add the 'click' listener for the
        })
    } else {
        // Switch is OFF: handle hover functionality (color changes)
        cells.forEach(cell => {
            cell.removeEventListener("click", handleClickOn); // Remove previous 'click' listener
            cell.addEventListener("click", () => handleClickOff(cell)); // Add the 'click' listener for the OFF state
        });
        cells.forEach(cell => {
            cell.removeEventListener("mouseover", handleClickOn); // Remove previous 'click' listener
            cell.addEventListener("mouseover", () => {
                if(isMouseDown) {
                handleClickOff(cell)
                }
        });
        });
    }
});

// Reset button functionality
const reset = document.querySelector("#reset");
reset.addEventListener("click", () => {
    document.querySelectorAll(".grid-item").forEach(cell => {
        cell.style.backgroundColor = "white";
    });
});

// Handle size changes from input
const go = document.querySelector("#go");
go.addEventListener("click", () => {
    const size = document.querySelector("#size");
    const newSize = parseInt(size.value);
    if (newSize >= 1 && newSize <= 100) {
        createGrid(newSize, newSize);
        size.value = "";
    } else {
        alert("Please enter a valid number between 1 - 100!");
        size.value = "";
    }
});

// Toggle color mode
const color = document.querySelector("#color");
color.addEventListener("click", () => {
    reset.click();
    colorOn = !colorOn;
    color.textContent = colorOn ? "No Color" : "Color";
});

// Generate random RGB color
function getRandomRgbColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

// Initialize
setContainerSize();
createGrid(16, 16);
window.addEventListener("resize", setContainerSize);
