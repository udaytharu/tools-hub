// Conversion factors (all units converted to meters for length and square meters for area)
const lengthUnits = {
    // Nepali units
    angul: 0.01905,    // 1 angul = 1.905 cm
    bitta: 0.0762,     // 1 bitta = 7.62 cm
    haat: 0.1524,      // 1 haat = 15.24 cm
    dhanush: 0.6096,   // 1 dhanush = 60.96 cm
    kos: 1219.2,       // 1 kos = 1.2192 km
    
    // International units
    meter: 1,          // Base unit
    kilometer: 1000,   // 1 km = 1000 m
    centimeter: 0.01,  // 1 cm = 0.01 m
    millimeter: 0.001, // 1 mm = 0.001 m
    inch: 0.0254,      // 1 inch = 2.54 cm
    foot: 0.3048,      // 1 foot = 30.48 cm
    yard: 0.9144,      // 1 yard = 91.44 cm
    mile: 1609.344     // 1 mile = 1.609344 km
};

const areaUnits = {
    // Terai units
    dhur: 16.93,       // 1 dhur = 16.93 m²
    kattha: 338.63,    // 1 kattha = 338.63 m²
    bigha: 6772.63,    // 1 bigha = 6772.63 m²
    
    // Hill region units
    ropani: 5476,      // 1 ropani = 5476 m²
    aana: 342.25,      // 1 aana = 1/16 ropani = 342.25 m²
    paisa: 85.56,      // 1 paisa = 1/4 aana = 85.56 m²
    daam: 21.39,       // 1 daam = 1/4 paisa = 21.39 m²
    
    // International units
    meter2: 1,         // Base unit
    kilometer2: 1000000, // 1 km² = 1,000,000 m²
    centimeter2: 0.0001, // 1 cm² = 0.0001 m²
    hectare: 10000,    // 1 hectare = 10,000 m²
    acre: 4046.86,     // 1 acre = 4046.86 m²
    foot2: 0.092903,   // 1 ft² = 0.092903 m²
    yard2: 0.836127,   // 1 yd² = 0.836127 m²
    mile2: 2589988.11  // 1 mi² = 2.58998811 km²
};

// Get DOM elements
const lengthInput = document.getElementById('length-input');
const lengthFrom = document.getElementById('length-from');
const lengthTo = document.getElementById('length-to');
const lengthOutput = document.getElementById('length-output');

const areaInput = document.getElementById('area-input');
const areaFrom = document.getElementById('area-from');
const areaTo = document.getElementById('area-to');
const areaOutput = document.getElementById('area-output');

// Get DOM elements for manual Terai conversion
const teraiArea = document.getElementById('terai-area');
const teraiInputUnit = document.getElementById('terai-input-unit');
const teraiBighaResult = document.getElementById('terai-bigha-result');
const teraiKatthaResult = document.getElementById('terai-kattha-result');
const teraiDhurResult = document.getElementById('terai-dhur-result');
const teraiMeterResult = document.getElementById('terai-meter-result');
const teraiCmResult = document.getElementById('terai-cm-result');
const teraiMmResult = document.getElementById('terai-mm-result');
const teraiInchResult = document.getElementById('terai-inch-result');

// Get DOM elements for manual Hill conversion
const hillArea = document.getElementById('hill-area');
const hillInputUnit = document.getElementById('hill-input-unit');
const hillRopaniResult = document.getElementById('hill-ropani-result');
const hillAanaResult = document.getElementById('hill-aana-result');
const hillPaisaResult = document.getElementById('hill-paisa-result');
const hillDaamResult = document.getElementById('hill-daam-result');
const hillMeterResult = document.getElementById('hill-meter-result');
const hillCmResult = document.getElementById('hill-cm-result');
const hillMmResult = document.getElementById('hill-mm-result');
const hillInchResult = document.getElementById('hill-inch-result');

// Add event listeners for length conversion
lengthInput.addEventListener('input', convertLength);
lengthFrom.addEventListener('change', convertLength);
lengthTo.addEventListener('change', convertLength);

// Add event listeners for area conversion
areaInput.addEventListener('input', convertArea);
areaFrom.addEventListener('change', convertArea);
areaTo.addEventListener('change', convertArea);

// Length conversion function
function convertLength() {
    const value = parseFloat(lengthInput.value);
    if (isNaN(value)) {
        lengthOutput.value = '';
        return;
    }

    const fromUnit = lengthFrom.value;
    const toUnit = lengthTo.value;
    
    // Convert to meters first, then to target unit
    const meters = value * lengthUnits[fromUnit];
    const result = meters / lengthUnits[toUnit];
    
    // Round to 4 decimal places
    lengthOutput.value = result.toFixed(4);
}

// Area conversion function
function convertArea() {
    const value = parseFloat(areaInput.value);
    if (isNaN(value)) {
        areaOutput.value = '';
        return;
    }

    const fromUnit = areaFrom.value;
    const toUnit = areaTo.value;
    
    // Convert to square meters first, then to target unit
    const squareMeters = value * areaUnits[fromUnit];
    const result = squareMeters / areaUnits[toUnit];
    
    // Round to 4 decimal places
    areaOutput.value = result.toFixed(4);
}

// Swap length units
function swapLengthUnits() {
    const temp = lengthFrom.value;
    lengthFrom.value = lengthTo.value;
    lengthTo.value = temp;
    convertLength();
}

// Swap area units
function swapAreaUnits() {
    const temp = areaFrom.value;
    areaFrom.value = areaTo.value;
    areaTo.value = temp;
    convertArea();
}

// Terai manual conversion function
function convertTeraiManual() {
    const inputValue = parseFloat(teraiArea.value) || 0;
    const inputUnit = teraiInputUnit.value;
    
    // Convert input to square meters first
    const totalAreaInMeters = inputValue * areaUnits[inputUnit];
    
    // Convert to each unit
    const bighaValue = totalAreaInMeters / areaUnits.bigha;
    const katthaValue = totalAreaInMeters / areaUnits.kattha;
    const dhurValue = totalAreaInMeters / areaUnits.dhur;
    
    // Update results with appropriate precision
    teraiBighaResult.textContent = bighaValue.toFixed(4);
    teraiKatthaResult.textContent = katthaValue.toFixed(4);
    teraiDhurResult.textContent = dhurValue.toFixed(4);
}

// Hill manual conversion function
function convertHillManual() {
    const inputValue = parseFloat(hillArea.value) || 0;
    const inputUnit = hillInputUnit.value;
    
    // Convert input to square meters first
    const totalAreaInMeters = inputValue * areaUnits[inputUnit];
    
    // Convert to each unit
    const ropaniValue = totalAreaInMeters / areaUnits.ropani;
    const aanaValue = totalAreaInMeters / areaUnits.aana;
    const paisaValue = totalAreaInMeters / areaUnits.paisa;
    const daamValue = totalAreaInMeters / areaUnits.daam;
    
    // Update results with appropriate precision
    hillRopaniResult.textContent = ropaniValue.toFixed(4);
    hillAanaResult.textContent = aanaValue.toFixed(4);
    hillPaisaResult.textContent = paisaValue.toFixed(4);
    hillDaamResult.textContent = daamValue.toFixed(4);
}

// Initialize manual conversions
convertTeraiManual();
convertHillManual();

// Initialize conversions
convertLength();
convertArea(); 