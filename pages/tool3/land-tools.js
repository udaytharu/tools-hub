let numSides = 5;
    let vertices = [];
    let isEditMode = false;
    let selectedVertex = -1;
    let triangles = [];
    let triangulated = false;
    let edgeToLabel = new Map(); // Map edgeKey to side label
    let currentScale = 1; // Store the current scale factor
    let baseScaleValue = 0; // Store the base scale value for all sides

    function calculateScale(baseLength) {
      // Find the longest side of the polygon
      let maxLength = 0;
      for (let i = 0; i < vertices.length; i++) {
        let v1 = vertices[i];
        let v2 = vertices[(i + 1) % vertices.length];
        let length = dist(v1.x, v1.y, v2.x, v2.y);
        maxLength = Math.max(maxLength, length);
      }
      // Calculate scale: pixels per unit
      currentScale = maxLength / baseLength;
      // Calculate the base scale value that will be used for all sides
      baseScaleValue = (maxLength / currentScale).toFixed(2);
      return currentScale;
    }

    function setup() {
      let canvas = createCanvas(600, 800);
      canvas.parent('canvas-container');
      
      // Add touch event listeners to canvas
      let canvasElement = document.querySelector('#canvas-container canvas');
      canvasElement.addEventListener('touchstart', handleTouchStart, { passive: false });
      canvasElement.addEventListener('touchmove', handleTouchMove, { passive: false });
      canvasElement.addEventListener('touchend', handleTouchEnd);
      
      drawPolygon();
    }

    function handleTouchStart(event) {
      if (!isEditMode) return;
      event.preventDefault();
      
      let touch = event.touches[0];
      let rect = event.target.getBoundingClientRect();
      let x = touch.clientX - rect.left;
      let y = touch.clientY - rect.top;
      
      // Scale coordinates to match canvas size
      x = (x / rect.width) * width;
      y = (y / rect.height) * height;
      
      for (let i = 0; i < vertices.length; i++) {
        let v = vertices[i];
        if (dist(x, y, v.x, v.y) < 15) { // Increased touch area
          selectedVertex = i;
          break;
        }
      }
    }

    function handleTouchMove(event) {
      if (isEditMode && selectedVertex !== -1) {
        event.preventDefault();
        
        let touch = event.touches[0];
        let rect = event.target.getBoundingClientRect();
        let x = touch.clientX - rect.left;
        let y = touch.clientY - rect.top;
        
        // Scale coordinates to match canvas size
        x = (x / rect.width) * width;
        y = (y / rect.height) * height;
        
        vertices[selectedVertex].x = x;
        vertices[selectedVertex].y = y;
      }
    }

    function handleTouchEnd() {
      selectedVertex = -1;
    }

    function drawPolygon() {
      numSides = parseInt(document.getElementById('sides').value);
      if (numSides < 3) numSides = 3;
      if (numSides > 12) numSides = 12;
      vertices = [];
      
      // Calculate center and radius based on canvas size
      let centerX = width / 2;
      let centerY = height / 2;
      let radius = Math.min(width, height) * 0.3; // 30% of the smaller dimension
      
      for (let i = 0; i < numSides; i++) {
        let angle = TWO_PI * i / numSides;
        let x = centerX + radius * cos(angle);
        let y = centerY + radius * sin(angle);
        vertices.push(createVector(x, y));
      }
      
      isEditMode = false;
      selectedVertex = -1;
      triangles = [];
      triangulated = false;
      edgeToLabel.clear();
      document.getElementById('side-table').style.display = 'none';
      document.getElementById('calculate-area').disabled = true;
      document.getElementById('area-display').textContent = 'Area: Not calculated';
      
      // Redraw the canvas
      redraw();
    }

    function editMode() {
      isEditMode = !isEditMode;
      selectedVertex = -1;
      
      let canvasElement = document.querySelector('#canvas-container canvas');
      
      if (isEditMode) {
        canvasElement.style.touchAction = 'none';
        canvasElement.style.cursor = 'move';
      } else {
        canvasElement.style.touchAction = 'auto';
        canvasElement.style.cursor = 'default';
      }
    }

    function triangulatePolygon() {
      if (vertices.length > 3) {
        triangulate();
        triangulated = true;
      }
      document.getElementById('side-table').style.display = 'block';
      updateTable();
      document.getElementById('calculate-area').disabled = false;
    }

    function updateTable() {
      let tableBody = document.getElementById('table-body');
      tableBody.innerHTML = '';
      edgeToLabel.clear();
      
      let baseMeasurement = parseFloat(document.getElementById('base-measurement').value) || 10;
      let unitType = document.getElementById('unit-type').value;
      calculateScale(baseMeasurement);

      if (triangulated && vertices.length > 3) {
        let sideIndex = 0;
        let usedSides = new Set();
        for (let tri of triangles) {
          for (let i = 0; i < 3; i++) {
            let v1 = tri[i];
            let v2 = tri[(i + 1) % 3];
            let edgeKey = [v1.x, v1.y, v2.x, v2.y].sort().join(',');
            if (!usedSides.has(edgeKey)) {
              usedSides.add(edgeKey);
              let label = String.fromCharCode(65 + sideIndex);
              edgeToLabel.set(edgeKey, label);
              let row = `<tr>
                <td>${label}</td>
                <td>${baseScaleValue} ${unitType}</td>
                <td><input type="number" min="0" step="0.1" placeholder="Enter length" 
                    onchange="updateFinalLength(this, ${baseScaleValue}, '${unitType}')"
                    data-scale-value="${baseScaleValue}" 
                    data-unit-type="${unitType}"></td>
                <td class="final-length">-</td>
              </tr>`;
              tableBody.innerHTML += row;
              sideIndex++;
            }
          }
        }
      } else {
        for (let i = 0; i < numSides; i++) {
          let v1 = vertices[i];
          let v2 = vertices[(i + 1) % numSides];
          let edgeKey = [v1.x, v1.y, v2.x, v2.y].sort().join(',');
          let label = String.fromCharCode(65 + i);
          edgeToLabel.set(edgeKey, label);
          let row = `<tr>
            <td>${label}</td>
            <td>${baseScaleValue} ${unitType}</td>
            <td><input type="number" min="0" step="0.1" placeholder="Enter length" 
                onchange="updateFinalLength(this, ${baseScaleValue}, '${unitType}')"
                data-scale-value="${baseScaleValue}" 
                data-unit-type="${unitType}"></td>
            <td class="final-length">-</td>
          </tr>`;
          tableBody.innerHTML += row;
        }
      }
      
      // Initially disable calculate button
      document.getElementById('calculate-area').disabled = true;
    }

    function updateFinalLength(input, scaleValue, unitType) {
      let value = parseFloat(input.value);
      let finalLengthCell = input.parentElement.nextElementSibling;
      
      if (!isNaN(value) && value > 0) {
        let finalLength = (value * scaleValue).toFixed(2);
        finalLengthCell.textContent = `${finalLength} ${unitType}`;
        input.style.backgroundColor = '';
      } else {
        finalLengthCell.textContent = '-';
        input.style.backgroundColor = '#ffebee';
      }
      
      // Check if all inputs are valid to enable calculate button
      let allValid = true;
      let inputs = document.querySelectorAll('#side-table input');
      inputs.forEach(input => {
        let finalLengthCell = input.parentElement.nextElementSibling;
        let finalLength = parseFloat(finalLengthCell.textContent);
        if (isNaN(finalLength) || finalLength <= 0) {
          allValid = false;
        }
      });
      
      document.getElementById('calculate-area').disabled = !allValid;
    }

    function calculateArea() {
      let inputs = document.querySelectorAll('#side-table input');
      let sideLengths = {};
      let valid = true;
      let unitType = document.getElementById('unit-type').value;

      // Read final lengths from the table
      inputs.forEach((input, index) => {
        let label = String.fromCharCode(65 + index);
        let finalLengthCell = input.parentElement.nextElementSibling;
        let finalLength = parseFloat(finalLengthCell.textContent);
        
        if (isNaN(finalLength) || finalLength <= 0) {
          valid = false;
          input.style.backgroundColor = '#ffebee';
        } else {
          input.style.backgroundColor = '';
          sideLengths[label] = finalLength;
        }
      });

      if (!valid || inputs.length === 0) {
        document.getElementById('area-display').textContent = 'Area: Please enter valid lengths for all sides';
        document.getElementById('transfer-to-converter').style.display = 'none';
        return;
      }

      let totalArea = 0;

      if (triangulated && vertices.length > 3) {
        // Calculate area for each triangle using the final lengths
        for (let tri of triangles) {
          let sideLabels = [];
          for (let i = 0; i < 3; i++) {
            let v1 = tri[i];
            let v2 = tri[(i + 1) % 3];
            let edgeKey = [v1.x, v1.y, v2.x, v2.y].sort().join(',');
            let label = edgeToLabel.get(edgeKey);
            if (label) sideLabels.push(label);
          }
          if (sideLabels.length === 3) {
            let sides = sideLabels.map(label => sideLengths[label]).filter(len => len !== undefined);
            if (sides.length === 3) {
              let [a, b, c] = sides;
              if (a + b > c && b + c > a && a + c > b) {
                let s = (a + b + c) / 2;
                let area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
                if (!isNaN(area)) {
                  totalArea += area;
                }
              }
            }
          }
        }
      } else {
        // Single triangle
        if (inputs.length === 3) {
          let [a, b, c] = Array.from(inputs).map(input => {
            let finalLengthCell = input.parentElement.nextElementSibling;
            return parseFloat(finalLengthCell.textContent);
          });
          if (a > 0 && b > 0 && c > 0 && a + b > c && b + c > a && a + c > b) {
            let s = (a + b + c) / 2;
            totalArea = Math.sqrt(s * (s - a) * (s - b) * (s - c));
          }
        }
      }

      if (totalArea > 0) {
        // Store the calculated area and unit for later use
        window.lastCalculatedArea = {
          value: totalArea,
          unit: unitType === 'mm' ? 'mm2' : unitType === 'inch' ? 'in2' : 'cm2'
        };

        let areaText;
        let areaInMeters = 0;
        let areaInFeet = 0;
        let unitValue;

        switch(unitType) {
          case 'mm':
            areaInMeters = totalArea / 1000000;
            areaInFeet = totalArea / 92903.04;
            areaText = `${totalArea.toFixed(2)} square millimeters`;
            unitValue = 'mm2';
            break;
          case 'inch':
            areaInMeters = totalArea * 0.00064516;
            areaInFeet = totalArea / 144;
            areaText = `${totalArea.toFixed(2)} square inches`;
            unitValue = 'in2';
            break;
          default: // cm
            areaInMeters = totalArea / 10000;
            areaInFeet = totalArea / 929.0304;
            areaText = `${totalArea.toFixed(2)} square centimeters`;
            unitValue = 'cm2';
        }
        
        // Update the area display
        document.getElementById('area-display').textContent = `Area: ${areaText}`;
        
        // Automatically update the converter section
        document.getElementById('areaInput').value = totalArea.toFixed(2);
        document.getElementById('fromUnit').value = unitValue;
        document.getElementById('meterResult').textContent = areaInMeters.toFixed(4);
        document.getElementById('feetResult').textContent = areaInFeet.toFixed(4);
        
        // Show transfer button and scroll to converter
        document.getElementById('transfer-to-converter').style.display = 'block';
        document.querySelector('.unit-converter-section').scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      } else {
        document.getElementById('area-display').textContent = 'Area: Invalid or incomplete side lengths';
        document.getElementById('transfer-to-converter').style.display = 'none';
      }
    }

    function pointInTriangle(p, v0, v1, v2) {
      let areaOrig = abs((v1.x - v0.x) * (v2.y - v0.y) - (v2.x - v0.x) * (v1.y - v0.y));
      let area1 = abs((v0.x - p.x) * (v1.y - p.y) - (v1.x - p.x) * (v0.y - p.y));
      let area2 = abs((v1.x - p.x) * (v2.y - p.y) - (v2.x - p.x) * (v1.y - p.y));
      let area3 = abs((v2.x - p.x) * (v0.y - p.y) - (v0.x - p.x) * (v2.y - p.y));
      return abs(area1 + area2 + area3 - areaOrig) < 0.01;
    }

    function isEar(index, verts) {
      let n = verts.length;
      let prev = verts[(index - 1 + n) % n];
      let curr = verts[index];
      let next = verts[(index + 1) % n];

      let v1 = p5.Vector.sub(curr, prev);
      let v2 = p5.Vector.sub(next, curr);
      let cross = v1.x * v2.y - v1.y * v2.x;
      if (cross <= 0) return false;

      for (let i = 0; i < n; i++) {
        if (i !== (index - 1 + n) % n && i !== index && i !== (index + 1) % n) {
          let p = verts[i];
          if (pointInTriangle(p, prev, curr, next)) {
            return false;
          }
        }
      }
      return true;
    }

    function triangulate() {
      triangles = [];
      let tempVerts = [...vertices];
      let n = tempVerts.length;

      while (tempVerts.length > 3) {
        let foundEar = false;
        for (let i = 0; i < tempVerts.length; i++) {
          if (isEar(i, tempVerts)) {
            let prev = tempVerts[(i - 1 + tempVerts.length) % tempVerts.length];
            let curr = tempVerts[i];
            let next = tempVerts[(i + 1) % tempVerts.length];
            triangles.push([prev, curr, next]);
            tempVerts.splice(i, 1);
            foundEar = true;
            break;
          }
        }
        if (!foundEar) break;
      }
      if (tempVerts.length === 3) {
        triangles.push([...tempVerts]);
      }
    }

    function draw() {
      background(255);

      // Draw compass direction index
      push();
      // Set styles for compass
      textAlign(CENTER, CENTER);
      textSize(14);
      fill(0);
      stroke(0);
      strokeWeight(1);
      
      // Position of compass
      let compassX = 40;
      let compassY = 40;
      let compassSize = 30;
      
      // Draw compass circle
      noFill();
      ellipse(compassX, compassY, compassSize, compassSize);
      
      // Draw cardinal directions
      text("N", compassX, compassY - compassSize/2 - 5);
      text("S", compassX, compassY + compassSize/2 + 15);
      text("E", compassX + compassSize/2 + 5, compassY);
      text("W", compassX - compassSize/2 - 5, compassY);
      
      // Draw direction lines
      line(compassX, compassY - compassSize/2, compassX, compassY + compassSize/2); // N-S line
      line(compassX - compassSize/2, compassY, compassX + compassSize/2, compassY); // E-W line
      
      // Draw arrow for North
      let arrowLength = compassSize/3;
      let arrowX = compassX;
      let arrowY = compassY - arrowLength;
      triangle(
        arrowX, arrowY - 5,  // Top point
        arrowX - 3, arrowY,  // Bottom left
        arrowX + 3, arrowY   // Bottom right
      );
      pop();

      if (triangulated && vertices.length > 3) {
        fill(255, 255, 200, 150);
        stroke(100, 100, 255);
        strokeWeight(1);
        for (let tri of triangles) {
          beginShape();
          for (let v of tri) {
            vertex(v.x, v.y);
          }
          endShape(CLOSE);
        }

        textAlign(CENTER, CENTER);
        textSize(14);
        fill(0);
        noStroke();
        let sideIndex = 0;
        let usedSides = new Set();
        for (let tri of triangles) {
          for (let i = 0; i < 3; i++) {
            let v1 = tri[i];
            let v2 = tri[(i + 1) % 3];
            let edgeKey = [v1.x, v1.y, v2.x, v2.y].sort().join(',');
            if (!usedSides.has(edgeKey)) {
              usedSides.add(edgeKey);
              let midX = (v1.x + v2.x) / 2;
              let midY = (v1.y + v2.y) / 2;
              let centroidX = (tri[0].x + tri[1].x + tri[2].x) / 3;
              let centroidY = (tri[0].y + tri[1].y + tri[2].y) / 3;
              let vecToCentroid = createVector(centroidX - midX, centroidY - midY);
              vecToCentroid.normalize();
              vecToCentroid.mult(8);
              let labelX = midX + vecToCentroid.x;
              let labelY = midY + vecToCentroid.y;
              let label = String.fromCharCode(65 + sideIndex);
              text(label, labelX, labelY);
              sideIndex++;
            }
          }
        }
      } else {
        fill(200, 220, 255);
        stroke(0);
        strokeWeight(2);
        beginShape();
        for (let v of vertices) {
          vertex(v.x, v.y);
        }
        endShape(CLOSE);

        textAlign(CENTER, CENTER);
        textSize(16);
        fill(0);
        noStroke();
        let centerX = width / 2;
        let centerY = height / 2;
        for (let i = 0; i < vertices.length; i++) {
          let v1 = vertices[i];
          let v2 = vertices[(i + 1) % vertices.length];
          let midX = (v1.x + v2.x) / 2;
          let midY = (v1.y + v2.y) / 2;
          let vecToCenter = createVector(centerX - midX, centerY - midY);
          vecToCenter.normalize();
          vecToCenter.mult(10);
          let labelX = midX + vecToCenter.x;
          let labelY = midY + vecToCenter.y;
          let label = String.fromCharCode(65 + i);
          text(label, labelX, labelY);
        }
      }

      if (isEditMode) {
        fill(255, 0, 0);
        noStroke();
        for (let i = 0; i < vertices.length; i++) {
          let v = vertices[i];
          if (i === selectedVertex) {
            fill(0, 255, 0);
            ellipse(v.x, v.y, 15, 15);
          } else {
            fill(255, 0, 0);
            ellipse(v.x, v.y, 12, 12);
          }
        }
      }
    }

    function mousePressed() {
      if (!isEditMode) return;
      
      for (let i = 0; i < vertices.length; i++) {
        let v = vertices[i];
        if (dist(mouseX, mouseY, v.x, v.y) < 15) { // Increased click area
          selectedVertex = i;
          break;
        }
      }
    }

    function mouseDragged() {
      if (isEditMode && selectedVertex !== -1) {
        vertices[selectedVertex].x = mouseX;
        vertices[selectedVertex].y = mouseY;
      }
    }

    function mouseReleased() {
      selectedVertex = -1;
    }

    // Update the base measurement label based on selected unit
    document.getElementById('unit-type').addEventListener('change', function() {
      let unitType = this.value;
      let baseMeasurementLabel = document.querySelector('label[for="base-measurement"]');
      baseMeasurementLabel.textContent = `Base Measurement (${unitType}):`;
    });

    // Unit converter functions
    function convertArea() {
      const inputValue = parseFloat(document.getElementById('areaInput').value);
      const fromUnit = document.getElementById('fromUnit').value;
      
      if (isNaN(inputValue) || inputValue <= 0) {
        alert('Please enter a valid area value');
        return;
      }

      let areaInMeters = 0;
      let areaInFeet = 0;

      // Convert to square meters first
      switch(fromUnit) {
        case 'mm2':
          areaInMeters = inputValue / 1000000;
          break;
        case 'cm2':
          areaInMeters = inputValue / 10000;
          break;
        case 'in2':
          areaInMeters = inputValue * 0.00064516;
          break;
      }

      // Convert to square feet
      areaInFeet = areaInMeters * 10.7639;

      // Terai Region Conversions (1 Bigha = 6772.63 m²)
      const squareMetersPerBigha = 6772.63;
      const bigha = areaInMeters / squareMetersPerBigha;
      const katha = (bigha % 1) * 20; // 1 Bigha = 20 Katha
      const dhur = (katha % 1) * 20; // 1 Katha = 20 Dhur

      // Hill Region Conversions (1 Ropani = 508.74 m²)
      const squareMetersPerRopani = 508.74;
      const ropani = areaInMeters / squareMetersPerRopani;
      const anna = (ropani % 1) * 16; // 1 Ropani = 16 Anna
      const paisa = (anna % 1) * 4; // 1 Anna = 4 Paisa
      const daam = (paisa % 1) * 4; // 1 Paisa = 4 Daam

      // Update the results
      document.getElementById('meterResult').textContent = areaInMeters.toFixed(4);
      document.getElementById('feetResult').textContent = areaInFeet.toFixed(4);
      
      // Update Terai Region results
      document.getElementById('teraiResult').textContent = Math.floor(bigha);
      document.getElementById('kathaResult').textContent = `${Math.floor(katha)} Katha`;
      document.getElementById('dhurResult').textContent = `${Math.floor(dhur)} Dhur`;
      
      // Update Hill Region results
      document.getElementById('hillResult').textContent = Math.floor(ropani);
      document.getElementById('annaResult').textContent = `${Math.floor(anna)} Anna`;
      document.getElementById('paisaResult').textContent = `${Math.floor(paisa)} Paisa`;
      document.getElementById('daamResult').textContent = `${Math.floor(daam)} Daam`;
    }

    function initializeConverter() {
      // Get default unit from workspace
      const defaultUnit = document.getElementById('unit-type').value;
      const defaultUnitValue = defaultUnit === 'mm' ? 'mm2' : 
                              defaultUnit === 'inch' ? 'in2' : 'cm2';
      
      // Set default values in converter
      document.getElementById('fromUnit').value = defaultUnitValue;
      document.getElementById('areaInput').value = '0.00';
      
      // Set default unit label
      const unitLabel = defaultUnit === 'mm' ? 'Square Millimeters (mm²)' :
                       defaultUnit === 'inch' ? 'Square Inches (in²)' :
                       'Square Centimeters (cm²)';
      
      // Update the select options to match workspace unit
      const fromUnitSelect = document.getElementById('fromUnit');
      fromUnitSelect.innerHTML = `
        <option value="${defaultUnitValue}" selected>${unitLabel}</option>
        ${defaultUnitValue !== 'mm2' ? '<option value="mm2">Square Millimeters (mm²)</option>' : ''}
        ${defaultUnitValue !== 'cm2' ? '<option value="cm2">Square Centimeters (cm²)</option>' : ''}
        ${defaultUnitValue !== 'in2' ? '<option value="in2">Square Inches (in²)</option>' : ''}
      `;
    }

    function transferToConverter() {
      if (window.lastCalculatedArea) {
        const { value, unit } = window.lastCalculatedArea;
        document.getElementById('areaInput').value = value.toFixed(2);
        document.getElementById('fromUnit').value = unit;
        // Trigger the conversion
        convertArea();
        // Scroll to the converter section
        document.querySelector('.unit-converter-section').scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }

    // Initialize converter when the page loads
    window.addEventListener('load', function() {
      initializeConverter();
      
      document.getElementById('unit-type').addEventListener('change', function() {
        initializeConverter();
      });
    });