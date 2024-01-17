function getRandomPoint(){
    const generateRandomPointWithinBounds = (point1, point2, point3, point4) => {
      const minX = Math.min(point1[0], point2[0], point3[0], point4[0]);
      const minY = Math.min(point1[1], point2[1], point3[1], point4[1]);
      const maxX = Math.max(point1[0], point2[0], point3[0], point4[0]);
      const maxY = Math.max(point1[1], point2[1], point3[1], point4[1]);
    
      const randomX = minX + Math.random() * (maxX - minX);
      const randomY = minY + Math.random() * (maxY - minY);
    
      return [randomX, randomY];
    };
  
    const point1 = [11575030.372665226, 150116.2697379953];
    const point2 = [11576008.25991508, 152472.91197662777];
    const point3 = [11575780.569510564, 149733.91803992068];
    const point4 = [11576785.687300716, 152169.0202072112];
  
    const randomPoint = generateRandomPointWithinBounds(point1, point2, point3, point4);
    console.log("Random Point:", randomPoint);
    return randomPoint;
}

const incidentTypes = ["fire"];

function getRandomFromArray(arr) {
    // Generate a random index
    const randomIndex = Math.floor(Math.random() * arr.length);
  
    // Return the corresponding string
    return arr[randomIndex];
}

function getRandomInteger(min, max) {
    // Use Math.floor to round down to the nearest integer
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

module.exports = () =>{
    const location = getRandomPoint();
    const incidentType = getRandomFromArray(incidentTypes);
    const incidentTTL = getRandomInteger(5000, 10000);
    return {
        location,
        incidentType,
        incidentTTL,
        timestamp: new Date().toISOString()
    };
}