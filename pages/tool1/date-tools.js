// Nepali calendar data (BS to AD mapping)
const nepaliCalendar = {
    // Format: BS Year: [Month lengths, AD Year start date]
    1970: [[31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], '1913-04-13'],
    1971: [[31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30], '1914-04-13'],
    // Add more years as needed
};

// Initialize calendar selection and button states
document.addEventListener('DOMContentLoaded', function() {
    const adCalendar = document.getElementById('ad-calendar');
    const bsCalendar = document.getElementById('bs-calendar');
    const adDobInputs = document.getElementById('ad-dob-inputs');
    const bsDobInputs = document.getElementById('bs-dob-inputs');

    // Add input event listeners for validation
    document.getElementById('ad-date').addEventListener('input', validateADInputs);
    document.getElementById('bs-year').addEventListener('input', validateBSInputs);
    document.getElementById('bs-month').addEventListener('change', validateBSInputs);
    document.getElementById('bs-day').addEventListener('input', validateBSInputs);
    document.getElementById('ad-dob').addEventListener('input', validateDOBInputs);
    document.getElementById('bs-dob-year').addEventListener('input', validateBSDOBInputs);
    document.getElementById('bs-dob-month').addEventListener('change', validateBSDOBInputs);
    document.getElementById('bs-dob-day').addEventListener('input', validateBSDOBInputs);

    adCalendar.addEventListener('change', function() {
        if (this.checked) {
            adDobInputs.style.display = 'block';
            bsDobInputs.style.display = 'none';
            validateDOBInputs();
        }
    });

    bsCalendar.addEventListener('change', function() {
        if (this.checked) {
            adDobInputs.style.display = 'none';
            bsDobInputs.style.display = 'block';
            validateBSDOBInputs();
        }
    });

    // Initial validation
    validateADInputs();
    validateBSInputs();
    validateDOBInputs();
});

// Validation functions
function validateADInputs() {
    const adDate = document.getElementById('ad-date').value;
    const convertBtn = document.querySelector('.converter-box:first-child .convert-btn');
    convertBtn.disabled = !adDate;
}

function validateBSInputs() {
    const year = document.getElementById('bs-year').value;
    const month = document.getElementById('bs-month').value;
    const day = document.getElementById('bs-day').value;
    const convertBtn = document.querySelector('.converter-box:last-child .convert-btn');
    convertBtn.disabled = !(year && month && day);
}

function validateDOBInputs() {
    const adDob = document.getElementById('ad-dob').value;
    const calculateBtn = document.querySelector('#ad-dob-inputs .calculate-btn');
    calculateBtn.disabled = !adDob;
}

function validateBSDOBInputs() {
    const year = document.getElementById('bs-dob-year').value;
    const month = document.getElementById('bs-dob-month').value;
    const day = document.getElementById('bs-dob-day').value;
    const calculateBtn = document.querySelector('#bs-dob-inputs .calculate-btn');
    calculateBtn.disabled = !(year && month && day);
}

// Convert AD to BS
function convertADtoBS() {
    const adDate = document.getElementById('ad-date').value;
    if (!adDate) return;

    const date = new Date(adDate);
    const bsDate = convertToBS(date);
    
    const resultSpan = document.querySelector('#bs-result span');
    resultSpan.textContent = `${bsDate.year}-${bsDate.month}-${bsDate.day}`;
}

// Convert BS to AD
function convertBStoAD() {
    const year = document.getElementById('bs-year').value;
    const month = document.getElementById('bs-month').value;
    const day = document.getElementById('bs-day').value;

    if (!year || !month || !day) return;

    const adDate = convertToAD(parseInt(year), parseInt(month), parseInt(day));
    
    const resultSpan = document.querySelector('#ad-result span');
    resultSpan.textContent = adDate.toISOString().split('T')[0];
}

// Calculate Age
function calculateAge() {
    const isAD = document.getElementById('ad-calendar').checked;
    let birthDate;

    if (isAD) {
        const adDob = document.getElementById('ad-dob').value;
        if (!adDob) return;
        birthDate = new Date(adDob);
    } else {
        const year = document.getElementById('bs-dob-year').value;
        const month = document.getElementById('bs-dob-month').value;
        const day = document.getElementById('bs-dob-day').value;

        if (!year || !month || !day) return;
        birthDate = convertToAD(parseInt(year), parseInt(month), parseInt(day));
    }

    const today = new Date();
    
    // Calculate years
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    // Adjust for negative months or days
    if (days < 0) {
        // Get the last day of the previous month
        const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        days += lastMonth.getDate();
        months--;
    }
    
    if (months < 0) {
        months += 12;
        years--;
    }

    // Update the display
    document.querySelector('#age-result .years').textContent = years;
    document.querySelector('#age-result .months').textContent = months;
    document.querySelector('#age-result .days').textContent = days;
}

// Helper function to convert AD to BS
function convertToBS(adDate) {
    // This is a simplified conversion. For accurate conversion,
    // you would need a complete mapping of dates between AD and BS
    const year = adDate.getFullYear();
    const month = adDate.getMonth() + 1;
    const day = adDate.getDate();

    // Approximate conversion (this is a simplified version)
    // BS year is approximately 57 years ahead of AD
    let bsYear = year + 57;
    let bsMonth = month;
    let bsDay = day;

    // Adjust for month differences
    if (month === 4 && day >= 13) {
        bsYear++;
    }

    // Adjust for month lengths
    const monthLengths = [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30];
    if (bsDay > monthLengths[bsMonth - 1]) {
        bsDay = monthLengths[bsMonth - 1];
    }

    return {
        year: bsYear,
        month: bsMonth,
        day: bsDay
    };
}

// Helper function to convert BS to AD
function convertToAD(bsYear, bsMonth, bsDay) {
    // This is a simplified conversion. For accurate conversion,
    // you would need a complete mapping of dates between BS and AD
    let adYear = bsYear - 57;
    let adMonth = bsMonth;
    let adDay = bsDay;

    // Adjust for month differences
    if (bsMonth === 1 && bsDay >= 13) {
        adYear++;
    }

    // Create AD date
    const adDate = new Date(adYear, adMonth - 1, adDay);
    return adDate;
}

// Input validation
function validateInput(input, min, max) {
    const value = parseInt(input.value);
    if (value < min) input.value = min;
    if (value > max) input.value = max;
}

// Add input validation for BS dates
document.getElementById('bs-day').addEventListener('change', function() {
    validateInput(this, 1, 32);
});

document.getElementById('bs-year').addEventListener('change', function() {
    validateInput(this, 1970, 2100);
});

document.getElementById('bs-dob-day').addEventListener('change', function() {
    validateInput(this, 1, 32);
});

document.getElementById('bs-dob-year').addEventListener('change', function() {
    validateInput(this, 1970, 2100);
}); 