function generateColorGradient(startColor, endColor, steps) {
  // Convert hex color to RGB
  const hexToRgb = (hex) => {
    let bigint = parseInt(hex.slice(1), 16);
    return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
  };

  // Convert RGB to hex color
  const rgbToHex = (rgb) => {
    return (
      "#" +
      rgb
        .map(
          (value) => value.toString(16).padStart(2, "0") // Pad each component to ensure 2 digits
        )
        .join("")
    );
  };

  // Initial RGB values for start and end colors
  const startRGB = hexToRgb(startColor);
  const endRGB = hexToRgb(endColor);

  // Generate the gradient
  const gradient = [];
  for (let i = 0; i <= steps - 1; i++) {
    const ratio = i / (steps - 1); // Calculate the ratio of interpolation
    const interpolatedColor = startRGB.map((start, index) =>
      Math.round(start + (endRGB[index] - start) * ratio)
    );
    gradient.push(rgbToHex(interpolatedColor)); // Convert to hex format and push to the array
  }

  return gradient;
}

export default generateColorGradient;
