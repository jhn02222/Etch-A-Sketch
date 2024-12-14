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
        div.style.opacity = "0.1";
        div.style.border = "1px solid rgba(156, 127, 127, 1)";
        container.appendChild(div);

        function handleHover() {
            let currentOpacity = parseFloat(div.style.opacity);
            if (currentOpacity < 1) {
                currentOpacity += 0.1;
                div.style.opacity = currentOpacity.toFixed(1);
            }
            div.style.backgroundColor = colorOn ? getRandomRgbColor() : "black";
            div.classList.add("black");
        }

        div.addEventListener("mouseover", () => {
            if (isMouseDown) handleHover();
        });

        div.addEventListener("click", handleHover);
    }
}

// Track mouse state
let isMouseDown = false;
document.addEventListener("mousedown", () => (isMouseDown = true));
document.addEventListener("mouseup", () => (isMouseDown = false));

// Reset button functionality
const reset = document.querySelector("#reset");
reset.addEventListener("click", () => {
    document.querySelectorAll(".grid-item").forEach(cell => {
        cell.style.backgroundColor = "white";
        cell.style.opacity = "0.1";
        cell.classList.remove("black");
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
    color.textContent = colorOn ? "Color" : "No Color";
    colorOn = !colorOn;
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
