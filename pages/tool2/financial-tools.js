// Show selected calculator and hide others
function showCalculator() {
    const calculatorType = document.getElementById('calculatorType').value;
    const sections = document.querySelectorAll('.calculator-section');
    
    sections.forEach(section => {
        section.classList.add('hidden');
    });
    
    if (calculatorType) {
        document.getElementById(calculatorType).classList.remove('hidden');
    }
}

// Format currency with Indian Rupee symbol
function formatCurrency(amount) {
    return '₹' + parseFloat(amount).toFixed(2);
}

// Calculate Profit and Loss
function calculateProfitLoss() {
    const costPrice = parseFloat(document.getElementById('costPrice').value);
    const sellingPrice = parseFloat(document.getElementById('sellingPrice').value);
    const resultDiv = document.getElementById('profitLossResult');
    
    if (isNaN(costPrice) || isNaN(sellingPrice)) {
        resultDiv.innerHTML = 'Please enter valid numbers';
        return;
    }
    
    if (sellingPrice > costPrice) {
        const profit = sellingPrice - costPrice;
        const profitPercentage = (profit / costPrice) * 100;
        resultDiv.innerHTML = `Profit: ${formatCurrency(profit)} (${profitPercentage.toFixed(2)}%)`;
    } else if (sellingPrice < costPrice) {
        const loss = costPrice - sellingPrice;
        const lossPercentage = (loss / costPrice) * 100;
        resultDiv.innerHTML = `Loss: ${formatCurrency(loss)} (${lossPercentage.toFixed(2)}%)`;
    } else {
        resultDiv.innerHTML = 'No profit, no loss';
    }
}

// Calculate Tax
function calculateTax() {
    const income = parseFloat(document.getElementById('income').value);
    const taxRate = parseFloat(document.getElementById('taxRate').value);
    const resultDiv = document.getElementById('taxResult');
    
    if (isNaN(income) || isNaN(taxRate)) {
        resultDiv.innerHTML = 'Please enter valid numbers';
        return;
    }
    
    const taxAmount = (income * taxRate) / 100;
    resultDiv.innerHTML = `Tax Amount: ${formatCurrency(taxAmount)}`;
}

// Calculate VAT
function calculateVAT() {
    const price = parseFloat(document.getElementById('price').value);
    const vatRate = parseFloat(document.getElementById('vatRate').value);
    const resultDiv = document.getElementById('vatResult');
    
    if (isNaN(price) || isNaN(vatRate)) {
        resultDiv.innerHTML = 'Please enter valid numbers';
        return;
    }
    
    const vatAmount = (price * vatRate) / 100;
    const totalPrice = price + vatAmount;
    resultDiv.innerHTML = `VAT Amount: ${formatCurrency(vatAmount)}<br>Total Price (including VAT): ${formatCurrency(totalPrice)}`;
}

// Calculate Simple Interest
function calculateSimpleInterest() {
    const principal = parseFloat(document.getElementById('principalSI').value);
    const rate = parseFloat(document.getElementById('rateSI').value);
    const time = parseFloat(document.getElementById('timeSI').value);
    const resultDiv = document.getElementById('simpleInterestResult');
    
    if (isNaN(principal) || isNaN(rate) || isNaN(time)) {
        resultDiv.innerHTML = 'Please enter valid numbers';
        return;
    }
    
    const interest = (principal * rate * time) / 100;
    const totalAmount = principal + interest;
    resultDiv.innerHTML = `Simple Interest: ${formatCurrency(interest)}<br>Total Amount: ${formatCurrency(totalAmount)}`;
}

// Calculate Compound Interest
function calculateCompoundInterest() {
    const principal = parseFloat(document.getElementById('principalCI').value);
    const rate = parseFloat(document.getElementById('rateCI').value);
    const time = parseFloat(document.getElementById('timeCI').value);
    const compounds = parseInt(document.getElementById('compounds').value);
    const resultDiv = document.getElementById('compoundInterestResult');
    
    if (isNaN(principal) || isNaN(rate) || isNaN(time) || isNaN(compounds)) {
        resultDiv.innerHTML = 'Please enter valid numbers';
        return;
    }
    
    const amount = principal * Math.pow(1 + (rate / (100 * compounds)), compounds * time);
    const interest = amount - principal;
    resultDiv.innerHTML = `Compound Interest: ${formatCurrency(interest)}<br>Total Amount: ${formatCurrency(amount)}`;
}

// Calculate Discount
function calculateDiscount() {
    const originalPrice = parseFloat(document.getElementById('originalPrice').value);
    const discountPercentage = parseFloat(document.getElementById('discountPercentage').value);
    const resultDiv = document.getElementById('discountResult');
    
    if (isNaN(originalPrice) || isNaN(discountPercentage)) {
        resultDiv.innerHTML = 'Please enter valid numbers';
        return;
    }
    
    const discountAmount = (originalPrice * discountPercentage) / 100;
    const finalPrice = originalPrice - discountAmount;
    resultDiv.innerHTML = `Discount Amount: ${formatCurrency(discountAmount)}<br>Final Price: ${formatCurrency(finalPrice)}`;
}

// Calculate Markup
function calculateMarkup() {
    const costPrice = parseFloat(document.getElementById('costPriceMarkup').value);
    const markupPercentage = parseFloat(document.getElementById('markupPercentage').value);
    const resultDiv = document.getElementById('markupResult');
    
    if (isNaN(costPrice) || isNaN(markupPercentage)) {
        resultDiv.innerHTML = 'Please enter valid numbers';
        return;
    }
    
    const markupAmount = (costPrice * markupPercentage) / 100;
    const sellingPrice = costPrice + markupAmount;
    resultDiv.innerHTML = `Markup Amount: ${formatCurrency(markupAmount)}<br>Selling Price: ${formatCurrency(sellingPrice)}`;
}

// Calculate Loan EMI
function calculateEMI() {
    const loanAmount = parseFloat(document.getElementById('loanAmount').value);
    const interestRate = parseFloat(document.getElementById('interestRate').value);
    const loanTerm = parseFloat(document.getElementById('loanTerm').value);
    const paymentFrequency = parseInt(document.getElementById('paymentFrequency').value);
    const resultDiv = document.getElementById('emiResult');
    
    if (isNaN(loanAmount) || isNaN(interestRate) || isNaN(loanTerm)) {
        resultDiv.innerHTML = 'Please enter valid numbers';
        return;
    }
    
    const monthlyRate = (interestRate / 100) / paymentFrequency;
    const numberOfPayments = loanTerm * paymentFrequency;
    
    const emi = loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments) / 
                (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
    const totalPayment = emi * numberOfPayments;
    const totalInterest = totalPayment - loanAmount;
    
    resultDiv.innerHTML = `
        EMI: ${formatCurrency(emi)}<br>
        Total Payment: ${formatCurrency(totalPayment)}<br>
        Total Interest: ${formatCurrency(totalInterest)}<br>
        Number of Payments: ${numberOfPayments}
    `;
}

// Calculate Investment Returns
function calculateInvestmentReturns() {
    const initialInvestment = parseFloat(document.getElementById('initialInvestment').value);
    const monthlyContribution = parseFloat(document.getElementById('monthlyContribution').value);
    const expectedReturn = parseFloat(document.getElementById('expectedReturn').value);
    const investmentPeriod = parseFloat(document.getElementById('investmentPeriod').value);
    const inflationRate = parseFloat(document.getElementById('inflationRate').value);
    const resultDiv = document.getElementById('investmentResult');
    
    if (isNaN(initialInvestment) || isNaN(monthlyContribution) || 
        isNaN(expectedReturn) || isNaN(investmentPeriod) || isNaN(inflationRate)) {
        resultDiv.innerHTML = 'Please enter valid numbers';
        return;
    }
    
    const monthlyRate = expectedReturn / 100 / 12;
    const months = investmentPeriod * 12;
    
    // Calculate future value of initial investment
    const futureValueInitial = initialInvestment * Math.pow(1 + monthlyRate, months);
    
    // Calculate future value of monthly contributions
    const futureValueContributions = monthlyContribution * 
        ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
    
    const totalFutureValue = futureValueInitial + futureValueContributions;
    const totalContributions = initialInvestment + (monthlyContribution * months);
    const totalInterest = totalFutureValue - totalContributions;
    
    // Calculate real value (adjusted for inflation)
    const realRate = ((1 + expectedReturn/100) / (1 + inflationRate/100) - 1) * 100;
    const realValue = totalFutureValue / Math.pow(1 + inflationRate/100, investmentPeriod);
    
    resultDiv.innerHTML = `
        Total Investment Value: ${formatCurrency(totalFutureValue)}<br>
        Total Contributions: ${formatCurrency(totalContributions)}<br>
        Total Interest Earned: ${formatCurrency(totalInterest)}<br>
        Real Value (Inflation Adjusted): ${formatCurrency(realValue)}<br>
        Real Rate of Return: ${realRate.toFixed(2)}%
    `;
}

// Calculate Depreciation
function calculateDepreciation() {
    const assetCost = parseFloat(document.getElementById('assetCost').value);
    const salvageValue = parseFloat(document.getElementById('salvageValue').value);
    const usefulLife = parseFloat(document.getElementById('usefulLife').value);
    const method = document.getElementById('depreciationMethod').value;
    const resultDiv = document.getElementById('depreciationResult');
    
    if (isNaN(assetCost) || isNaN(salvageValue) || isNaN(usefulLife)) {
        resultDiv.innerHTML = 'Please enter valid numbers';
        return;
    }
    
    let depreciationSchedule = [];
    let bookValue = assetCost;
    const depreciableAmount = assetCost - salvageValue;
    
    switch(method) {
        case 'straight':
            const straightLineDep = depreciableAmount / usefulLife;
            for (let year = 1; year <= usefulLife; year++) {
                bookValue -= straightLineDep;
                depreciationSchedule.push({
                    year: year,
                    depreciation: straightLineDep,
                    bookValue: bookValue
                });
            }
            break;
            
        case 'declining':
            const decliningRate = 2 / usefulLife;
            for (let year = 1; year <= usefulLife; year++) {
                const dep = bookValue * decliningRate;
                bookValue -= dep;
                depreciationSchedule.push({
                    year: year,
                    depreciation: dep,
                    bookValue: Math.max(bookValue, salvageValue)
                });
            }
            break;
            
        case 'sum':
            const sumOfYears = (usefulLife * (usefulLife + 1)) / 2;
            for (let year = 1; year <= usefulLife; year++) {
                const dep = depreciableAmount * (usefulLife - year + 1) / sumOfYears;
                bookValue -= dep;
                depreciationSchedule.push({
                    year: year,
                    depreciation: dep,
                    bookValue: bookValue
                });
            }
            break;
    }
    
    let scheduleHTML = '<table class="depreciation-table">';
    scheduleHTML += '<tr><th>Year</th><th>Depreciation</th><th>Book Value</th></tr>';
    
    depreciationSchedule.forEach(year => {
        scheduleHTML += `
            <tr>
                <td>${year.year}</td>
                <td>${formatCurrency(year.depreciation)}</td>
                <td>${formatCurrency(year.bookValue)}</td>
            </tr>
        `;
    });
    
    scheduleHTML += '</table>';
    resultDiv.innerHTML = scheduleHTML;
}

// Calculate Stock Returns
function calculateStockReturns() {
    const stockPrice = parseFloat(document.getElementById('stockPrice').value);
    const shares = parseFloat(document.getElementById('shares').value);
    const dividendYield = parseFloat(document.getElementById('dividendYield').value);
    const growthRate = parseFloat(document.getElementById('growthRate').value);
    const holdingPeriod = parseFloat(document.getElementById('holdingPeriod').value);
    const resultDiv = document.getElementById('stockResult');
    
    if (isNaN(stockPrice) || isNaN(shares) || isNaN(dividendYield) || 
        isNaN(growthRate) || isNaN(holdingPeriod)) {
        resultDiv.innerHTML = 'Please enter valid numbers';
        return;
    }
    
    const initialInvestment = stockPrice * shares;
    const futureStockPrice = stockPrice * Math.pow(1 + growthRate/100, holdingPeriod);
    const futureValue = futureStockPrice * shares;
    
    // Calculate dividend income
    let totalDividends = 0;
    let currentPrice = stockPrice;
    for (let year = 1; year <= holdingPeriod; year++) {
        const annualDividend = currentPrice * shares * (dividendYield/100);
        totalDividends += annualDividend;
        currentPrice *= (1 + growthRate/100);
    }
    
    const totalReturn = futureValue + totalDividends - initialInvestment;
    const totalReturnPercentage = (totalReturn / initialInvestment) * 100;
    const annualizedReturn = (Math.pow(1 + totalReturnPercentage/100, 1/holdingPeriod) - 1) * 100;
    
    resultDiv.innerHTML = `
        Initial Investment: ${formatCurrency(initialInvestment)}<br>
        Future Stock Value: ${formatCurrency(futureValue)}<br>
        Total Dividend Income: ${formatCurrency(totalDividends)}<br>
        Total Return: ${formatCurrency(totalReturn)} (${totalReturnPercentage.toFixed(2)}%)<br>
        Annualized Return: ${annualizedReturn.toFixed(2)}%
    `;
}

// Calculate Mortgage
function calculateMortgage() {
    const propertyValue = parseFloat(document.getElementById('propertyValue').value);
    const downPayment = parseFloat(document.getElementById('downPayment').value);
    const mortgageRate = parseFloat(document.getElementById('mortgageRate').value);
    const mortgageTerm = parseFloat(document.getElementById('mortgageTerm').value);
    const propertyTax = parseFloat(document.getElementById('propertyTax').value);
    const insurance = parseFloat(document.getElementById('insurance').value);
    const resultDiv = document.getElementById('mortgageResult');
    
    if (isNaN(propertyValue) || isNaN(downPayment) || isNaN(mortgageRate) || 
        isNaN(mortgageTerm) || isNaN(propertyTax) || isNaN(insurance)) {
        resultDiv.innerHTML = 'Please enter valid numbers';
        return;
    }
    
    const loanAmount = propertyValue - downPayment;
    const monthlyRate = mortgageRate / 100 / 12;
    const numberOfPayments = mortgageTerm * 12;
    
    const monthlyPayment = loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments) / 
                          (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
    const annualPropertyTax = propertyValue * (propertyTax / 100);
    const annualInsurance = propertyValue * (insurance / 100);
    
    const monthlyPropertyTax = annualPropertyTax / 12;
    const monthlyInsurance = annualInsurance / 12;
    
    const totalMonthlyPayment = monthlyPayment + monthlyPropertyTax + monthlyInsurance;
    const totalPayment = totalMonthlyPayment * numberOfPayments;
    const totalInterest = (monthlyPayment * numberOfPayments) - loanAmount;
    
    resultDiv.innerHTML = `
        Loan Amount: ${formatCurrency(loanAmount)}<br>
        Monthly Principal & Interest: ${formatCurrency(monthlyPayment)}<br>
        Monthly Property Tax: ${formatCurrency(monthlyPropertyTax)}<br>
        Monthly Insurance: ${formatCurrency(monthlyInsurance)}<br>
        Total Monthly Payment: ${formatCurrency(totalMonthlyPayment)}<br>
        Total Payment: ${formatCurrency(totalPayment)}<br>
        Total Interest: ${formatCurrency(totalInterest)}
    `;
}

// Calculate Retirement Plan
function calculateRetirement() {
    const currentAge = parseFloat(document.getElementById('currentAge').value);
    const retirementAge = parseFloat(document.getElementById('retirementAge').value);
    const currentSavings = parseFloat(document.getElementById('currentSavings').value);
    const monthlySavings = parseFloat(document.getElementById('monthlySavings').value);
    const expectedReturn = parseFloat(document.getElementById('expectedReturn').value);
    const inflationRate = parseFloat(document.getElementById('inflationRate').value);
    const lifeExpectancy = parseFloat(document.getElementById('lifeExpectancy').value);
    const resultDiv = document.getElementById('retirementResult');
    
    if (isNaN(currentAge) || isNaN(retirementAge) || isNaN(currentSavings) || 
        isNaN(monthlySavings) || isNaN(expectedReturn) || isNaN(inflationRate) || 
        isNaN(lifeExpectancy)) {
        resultDiv.innerHTML = 'Please enter valid numbers';
        return;
    }
    
    const yearsToRetirement = retirementAge - currentAge;
    const retirementDuration = lifeExpectancy - retirementAge;
    
    // Calculate future value of current savings
    const futureValueCurrentSavings = currentSavings * 
        Math.pow(1 + expectedReturn/100, yearsToRetirement);
    
    // Calculate future value of monthly contributions
    const monthlyRate = expectedReturn / 100 / 12;
    const months = yearsToRetirement * 12;
    const futureValueContributions = monthlySavings * 
        ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
    
    const totalRetirementSavings = futureValueCurrentSavings + futureValueContributions;
    
    // Calculate required monthly income during retirement
    const realRate = ((1 + expectedReturn/100) / (1 + inflationRate/100) - 1) * 100;
    const monthlyWithdrawal = totalRetirementSavings * (realRate/100/12) / 
        (1 - Math.pow(1 + realRate/100/12, -retirementDuration * 12));
    
    resultDiv.innerHTML = `
        Years to Retirement: ${yearsToRetirement}<br>
        Total Retirement Savings: ${formatCurrency(totalRetirementSavings)}<br>
        Monthly Withdrawal Available: ${formatCurrency(monthlyWithdrawal)}<br>
        Annual Withdrawal Available: ${formatCurrency(monthlyWithdrawal * 12)}<br>
        Real Rate of Return: ${realRate.toFixed(2)}%
    `;
}

// Calculate Inflation
function calculateInflation() {
    const presentValue = parseFloat(document.getElementById('presentValue').value);
    const inflationRate = parseFloat(document.getElementById('inflationRate').value);
    const years = parseFloat(document.getElementById('years').value);
    const resultDiv = document.getElementById('inflationResult');
    
    if (isNaN(presentValue) || isNaN(inflationRate) || isNaN(years)) {
        resultDiv.innerHTML = 'Please enter valid numbers';
        return;
    }
    
    const futureValue = presentValue * Math.pow(1 + inflationRate/100, years);
    const purchasingPower = presentValue / Math.pow(1 + inflationRate/100, years);
    
    resultDiv.innerHTML = `
        Present Value: ${formatCurrency(presentValue)}<br>
        Future Value: ${formatCurrency(futureValue)}<br>
        Purchasing Power: ${formatCurrency(purchasingPower)}<br>
        Total Inflation: ${((futureValue - presentValue) / presentValue * 100).toFixed(2)}%
    `;
}

// Add CSS for depreciation table
const style = document.createElement('style');
style.textContent = `
    .depreciation-table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 20px;
    }
    
    .depreciation-table th,
    .depreciation-table td {
        padding: 10px;
        border: 1px solid #e0e0e0;
        text-align: right;
    }
    
    .depreciation-table th {
        background-color: #f8f9fa;
        font-weight: 600;
    }
    
    .depreciation-table tr:nth-child(even) {
        background-color: #f8f9fa;
    }
`;
document.head.appendChild(style);

// Add input validation
document.querySelectorAll('input[type="number"]').forEach(input => {
    input.addEventListener('input', function() {
        if (this.value < 0) {
            this.value = 0;
        }
    });
}); 