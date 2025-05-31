// Nepali calendar data (BS to AD mapping)
const nepaliCalendar = {
    // Format: BS Year: [Month lengths, AD Year start date]
    1970: [[31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], '1913-04-13'],
    1971: [[31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30], '1914-04-13'],
    1972: [[31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30], '1915-04-14'],
    1973: [[31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30], '1916-04-13'],
    1974: [[31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], '1917-04-13'],
    1975: [[31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], '1918-04-14'],
    1976: [[31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31], '1919-04-14'],
    1977: [[31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], '1920-04-13'],
    1978: [[31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30], '1921-04-13'],
    1979: [[31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], '1922-04-14'],
    1980: [[31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31], '1923-04-14'],
    1981: [[31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], '1924-04-13'],
    1982: [[31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30], '1925-04-13'],
    1983: [[31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], '1926-04-14'],
    1984: [[31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31], '1927-04-14'],
    1985: [[31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], '1928-04-13'],
    1986: [[31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30], '1929-04-13'],
    1987: [[31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], '1930-04-14'],
    1988: [[31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31], '1931-04-14'],
    1989: [[31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], '1932-04-13'],
    1990: [[31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30], '1933-04-13'],
    1991: [[31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], '1934-04-14'],
    1992: [[31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31], '1935-04-14'],
    1993: [[31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], '1936-04-13'],
    1994: [[31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30], '1937-04-13'],
    1995: [[31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], '1938-04-14'],
    1996: [[31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31], '1939-04-14'],
    1997: [[31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], '1940-04-13'],
    1998: [[31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30], '1941-04-13'],
    1999: [[31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], '1942-04-14'],
    2000: [[31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31], '1943-04-14'],
    2001: [[31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], '1944-04-13'],
    2002: [[31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30], '1945-04-13'],
    2003: [[31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], '1946-04-14'],
    2004: [[31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31], '1947-04-14'],
    2005: [[31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], '1948-04-13'],
    2006: [[31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30], '1949-04-13'],
    2007: [[31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], '1950-04-14'],
    2008: [[31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31], '1951-04-14'],
    2009: [[31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], '1952-04-13'],
    2010: [[31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30], '1953-04-13'],
    2011: [[31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], '1954-04-14'],
    2012: [[31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31], '1955-04-14'],
    2013: [[31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], '1956-04-13'],
    2014: [[31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30], '1957-04-13'],
    2015: [[31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], '1958-04-14'],
    2016: [[31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31], '1959-04-14'],
    2017: [[31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], '1960-04-13'],
    2018: [[31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30], '1961-04-13'],
    2019: [[31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], '1962-04-14'],
    2020: [[31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31], '1963-04-14'],
    2021: [[31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], '1964-04-13'],
    2022: [[31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30], '1965-04-13'],
    2023: [[31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], '1966-04-14'],
    2024: [[31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31], '1967-04-14'],
    2025: [[31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], '1968-04-13'],
    2026: [[31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30], '1969-04-13'],
    2027: [[31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], '1970-04-14'],
    2028: [[31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31], '1971-04-14'],
    2029: [[31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], '1972-04-13'],
    2030: [[31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30], '1973-04-13'],
    2031: [[31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], '1974-04-14'],
    2032: [[31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31], '1975-04-14'],
    2033: [[31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], '1976-04-13'],
    2034: [[31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30], '1977-04-13'],
    2035: [[31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], '1978-04-14'],
    2036: [[31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31], '1979-04-14'],
    2037: [[31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], '1980-04-13'],
    2038: [[31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30], '1981-04-13'],
    2039: [[31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], '1982-04-14'],
    2040: [[31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31], '1983-04-14'],
    2041: [[31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], '1984-04-13'],
    2042: [[31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30], '1985-04-13'],
    2043: [[31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], '1986-04-14'],
    2044: [[31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31], '1987-04-14'],
    2045: [[31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], '1988-04-13'],
    2046: [[31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30], '1989-04-13'],
    2047: [[31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], '1990-04-14'],
    2048: [[31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31], '1991-04-14'],
    2049: [[31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], '1992-04-13'],
    2050: [[31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30], '1993-04-13'],
    2051: [[31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], '1994-04-14'],
    2052: [[31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31], '1995-04-14'],
    2053: [[31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], '1996-04-13'],
    2054: [[31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30], '1997-04-13'],
    2055: [[31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], '1998-04-14'],
    2056: [[31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31], '1999-04-14'],
    2057: [[31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], '2000-04-13'],
    2058: [[31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30], '2001-04-13'],
    2059: [[31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], '2002-04-14'],
    2060: [[31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31], '2003-04-14'],
    2061: [[31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], '2004-04-13'],
    2062: [[31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30], '2005-04-13'],
    2063: [[31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], '2006-04-14'],
    2064: [[31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31], '2007-04-14'],
    2065: [[31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], '2008-04-13'],
    2066: [[31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30], '2009-04-13'],
    2067: [[31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], '2010-04-14'],
    2068: [[31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31], '2011-04-14'],
    2069: [[31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], '2012-04-13'],
    2070: [[31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30], '2013-04-13'],
    2071: [[31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], '2014-04-14'],
    2072: [[31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31], '2015-04-14'],
    2073: [[31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], '2016-04-13'],
    2074: [[31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30], '2017-04-13'],
    2075: [[31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], '2018-04-14'],
    2076: [[31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31], '2019-04-14'],
    2077: [[31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], '2020-04-13'],
    2078: [[31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30], '2021-04-13'],
    2079: [[31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], '2022-04-14'],
    2080: [[31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31], '2023-04-14'],
    2081: [[31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], '2024-04-13'],
    2082: [[31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30], '2025-04-13'],
    2083: [[31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], '2026-04-14'],
    2084: [[31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31], '2027-04-14'],
    2085: [[31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], '2028-04-13'],
    2086: [[31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30], '2029-04-13'],
    2087: [[31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], '2030-04-14'],
    2088: [[31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31], '2031-04-14'],
    2089: [[31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], '2032-04-13'],
    2090: [[31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30], '2033-04-13'],
    2091: [[31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], '2034-04-14'],
    2092: [[31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31], '2035-04-14'],
    2093: [[31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], '2036-04-13'],
    2094: [[31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30], '2037-04-13'],
    2095: [[31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], '2038-04-14'],
    2096: [[31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31], '2039-04-14'],
    2097: [[31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], '2040-04-13'],
    2098: [[31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30], '2041-04-13'],
    2099: [[31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], '2042-04-14'],
    2100: [[31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31]]
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
    const year = adDate.getFullYear();
    const month = adDate.getMonth() + 1;
    const day = adDate.getDate();

    // Find the BS year that contains this AD date
    let bsYear = null;
    let bsStartDate = null;
    let monthLengths = null;

    for (const [year, data] of Object.entries(nepaliCalendar)) {
        const startDate = new Date(data[1]);
        const nextYear = parseInt(year) + 1;
        const nextYearData = nepaliCalendar[nextYear];
        const endDate = nextYearData ? new Date(nextYearData[1]) : new Date(year, 11, 31);

        if (adDate >= startDate && adDate < endDate) {
            bsYear = parseInt(year);
            bsStartDate = startDate;
            monthLengths = data[0];
            break;
        }
    }

    if (!bsYear) {
        throw new Error('Date out of range');
    }

    // Calculate days passed since BS year start
    const daysPassed = Math.floor((adDate - bsStartDate) / (1000 * 60 * 60 * 24));
    
    // Calculate BS month and day
    let bsMonth = 1;
    let bsDay = 1;
    let remainingDays = daysPassed;

    for (let i = 0; i < monthLengths.length; i++) {
        if (remainingDays < monthLengths[i]) {
            bsMonth = i + 1;
            bsDay = remainingDays + 1;
            break;
        }
        remainingDays -= monthLengths[i];
    }

    return {
        year: bsYear,
        month: bsMonth,
        day: bsDay
    };
}

// Helper function to convert BS to AD
function convertToAD(bsYear, bsMonth, bsDay) {
    if (!nepaliCalendar[bsYear]) {
        throw new Error('BS year out of range');
    }

    const [monthLengths, startDateStr] = nepaliCalendar[bsYear];
    const startDate = new Date(startDateStr);

    // Calculate days passed in BS year
    let daysPassed = 0;
    for (let i = 0; i < bsMonth - 1; i++) {
        daysPassed += monthLengths[i];
    }
    daysPassed += bsDay - 1;

    // Add days to start date
    const adDate = new Date(startDate);
    adDate.setDate(startDate.getDate() + daysPassed);

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