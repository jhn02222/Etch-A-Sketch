const width = 512;
const height = 512;
const container = document.querySelector("#container");
container.style.height = height + "px";
container.style.width = width + "px";
let colorOn = false;

function createGrid(rows, cols) {
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
            div.style.border = "1px solid rgba(156, 127, 127, 1)";
            if (colorOn) {
                div.style.backgroundColor = getRandomRgbColor();
                div.classList.add("black");
            } else {
                div.style.backgroundColor = "black";
                div.classList.add("black");
            }
        }

        div.addEventListener("mouseover", () => {
            if (isMouseDown) handleHover();
        });

        div.addEventListener("touchstart", (e) => {
            e.preventDefault();
            handleHover();
        });

        div.addEventListener("click", () => {
            if (div.classList.contains("black")) {
                div.style.opacity = "0.1";
                div.style.backgroundColor = "white";
                div.classList.remove("black");
            }
        });
    }
}

createGrid(16, 16);

let isMouseDown = false;
document.addEventListener("mousedown", () => (isMouseDown = true));
document.addEventListener("mouseup", () => (isMouseDown = false));

const reset = document.querySelector("#reset");
reset.addEventListener("click", () => {
    const cells = document.querySelectorAll(".grid-item");
    cells.forEach((cell) => {
        cell.style.backgroundColor = "white";
        cell.style.opacity = "0.1";
        if (cell.classList.contains("black")) {
            cell.classList.remove("black");
        }
    });
});

const go = document.querySelector("#go");
go.addEventListener("click", () => {
    const size = document.querySelector("#size");
    const newSize = parseInt(size.value);
    if (newSize >= 1 && newSize <= 100) {
        const cells = document.querySelectorAll(".grid-item");
        cells.forEach((cell) => container.removeChild(cell));
        createGrid(newSize, newSize);
        size.value = "";
    } else {
        alert("Please enter a valid number between 1 - 100!");
        size.value = "";
    }
});

function getRandomRgbColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

const color = document.querySelector("#color");
color.addEventListener("click", () => {
    reset.click();
    if (color.textContent === "Color") {
        color.textContent = "No Color";
        colorOn = true;
    } else {
        color.textContent = "Color";
        colorOn = false;
    }
});
