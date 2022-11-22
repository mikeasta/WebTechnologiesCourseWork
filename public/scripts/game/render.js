// Map's paths
const path_level_1 = "assets/map/level_1.png";
const path_level_2 = "assets/map/level_2.png";

// Canvas import
const canvas = document.getElementById("playground");
const c      = canvas.getContext('2d');

// Canvas size
canvas.width  = 1600;
canvas.height = 900;

// Prepare maps for render
const image_level_1 = new Image();
const image_level_2 = new Image();

// Set paths
image_level_1.src = path_level_1;
image_level_2.src = path_level_2;

console.log(image_level_1)

// Draw level
image_level_1.onload = () => c.drawImage(image_level_1, 0, 0)
