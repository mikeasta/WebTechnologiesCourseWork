// Calculates angle (in deg) between (1, 0) and given parameters
// x_1 & y_1 - Axis center
// x_2 & y_2 - Line
export const tilt_angle  = (x_1, y_1, x_2, y_2) => {
    // Normalize to axis center
    let x = x_2 - x_1;
    let y = y_2 - y_1;

    // Find angle
    // Check standart cases
    if ((x === 0) && (y === 0)) return 0;
    else if ((x > 0) && (y === 0)) return 0;
    else if ((x === 0) && (y > 0)) return 90;
    else if ((x < 0) && (y === 0)) return 180;
    else if ((x === 0) && (y < 0)) return 270;

    // Calc custom angles
    const tan = y / x;

    // 1 quater
    if ((x >= 0) && (y >= 0)) 
        return Math.atan(tan) * 180 / Math.PI;

    // 2 quater
    if ((x < 0) && (y >= 0))
        return Math.atan(tan) * 180 / Math.PI + 180;

    // 3 quater
    if ((x < 0) && (y < 0))
        return Math.atan(tan) * 180 / Math.PI + 180;

    // 4 quater
    if ((x >= 0) && (y < 0))
        return Math.atan(tan) * 180 / Math.PI + 360;
}