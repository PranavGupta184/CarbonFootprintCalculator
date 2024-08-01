function openTab(evt, tabName) {
    // Hide all tab content
    const tabcontents = document.getElementsByClassName('tabcontent');
    for (let i = 0; i < tabcontents.length; i++) {
        tabcontents[i].style.display = 'none';
    }

    // Remove "active" class from all tab links
    const tablinks = document.getElementsByClassName('tablink');
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(' active', '');
    }

    // Show the current tab and add an "active" class to the clicked tab link
    document.getElementById(tabName).style.display = 'block';
    evt.currentTarget.className += ' active';
}

// Automatically open the "Calculate" tab
document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.tablink').click();
});

function calculateFootprint() {
    // Emission factors (kg CO2 per hour of usage or per km)
    const acFactor = 1.5; // kg CO2 per hour
    const fanFactor = 0.075; // kg CO2 per hour per fan
    const lightFactor = 0.05; // kg CO2 per hour per light
    const tvFactor = 0.1; // kg CO2 per hour
    const wifiFactor = 0.02; // kg CO2 per hour
    const carFactor = 0.21; // kg CO2 per km per person
    const schoolBusFactor = 0.05; // kg CO2 per km
    const bikeFactor = 0.1; // kg CO2 per km
    const plantOffsetFactor = 0.05; // kg CO2 offset per plant per day

    // Input values
    const acHours = parseFloat(document.getElementById('acHours').value) || 0;
    const fanCount = parseFloat(document.getElementById('fanCount').value) || 0;
    const fanHours = parseFloat(document.getElementById('fanHours').value) || 0;
    const lightCount = parseFloat(document.getElementById('lightCount').value) || 0;
    const lightHours = parseFloat(document.getElementById('lightHours').value) || 0;
    const tvHours = parseFloat(document.getElementById('tvHours').value) || 0;
    const wifiHours = parseFloat(document.getElementById('wifiHours').value) || 0;
    const carKm = parseFloat(document.getElementById('carKm').value) || 0;
    const carRiders = parseFloat(document.getElementById('carRiders').value) || 1;
    const schoolBusKm = parseFloat(document.getElementById('schoolBusKm').value) || 0;
    const bikeKm = parseFloat(document.getElementById('bikeKm').value) || 0;
    const plantCount = parseFloat(document.getElementById('plantCount').value) || 0;

    // Calculate daily footprint
    const acFootprint = acHours * acFactor;
    const fanFootprint = fanCount * fanHours * fanFactor;
    const lightFootprint = lightCount * lightHours * lightFactor;
    const tvFootprint = tvHours * tvFactor;
    const wifiFootprint = wifiHours * wifiFactor;
    const carFootprint = carKm * carFactor / carRiders;
    const schoolBusFootprint = schoolBusKm * schoolBusFactor;
    const bikeFootprint = bikeKm * bikeFactor;
    const plantOffset = plantCount * plantOffsetFactor;

    const totalDailyFootprint = acFootprint + fanFootprint + lightFootprint + tvFootprint + wifiFootprint + carFootprint + schoolBusFootprint + bikeFootprint - plantOffset;
    const totalMonthlyFootprint = totalDailyFootprint * 30;
    const totalYearlyFootprint = totalDailyFootprint * 365;

    // Display result
    document.getElementById('footprintValueDaily').textContent = `Daily: ${totalDailyFootprint.toFixed(2)} kg CO2`;
    document.getElementById('footprintValueMonthly').textContent = `Monthly: ${totalMonthlyFootprint.toFixed(2)} kg CO2`;
    document.getElementById('footprintValueYearly').textContent = `Yearly: ${totalYearlyFootprint.toFixed(2)} kg CO2`;

    // Display message
    const messageElement = document.getElementById('message');
    let message;

    if (totalDailyFootprint < 5) {
        message = "Great job! Your carbon footprint is relatively low.";
        message += "<ul><li>Keep up the good work!</li><li>Continue to use energy-efficient appliances.</li><li>Consider reducing even further by adopting a green lifestyle.</li></ul>";
    } else if (totalDailyFootprint < 15) {
        message = "Your carbon footprint is moderate. Consider ways to reduce it.";
        message += "<ul><li>Reduce energy consumption by using energy-efficient appliances.</li><li>Opt for public transportation or carpool to decrease travel emissions.</li><li>Plant more trees and reduce waste.</li></ul>";
    } else {
        message = "Your carbon footprint is high. Please look into reducing your emissions.";
        message += "<ul><li>Switch to renewable energy sources like solar or wind power.</li><li>Reduce car travel and increase use of public transportation or biking.</li><li>Implement energy-saving practices at home, such as improving insulation and using programmable thermostats.</li></ul>";
    }

    messageElement.innerHTML = message;

    // Draw chart
    const ctx = document.getElementById('footprintChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Daily', 'Monthly', 'Yearly'],
            datasets: [{
                label: 'Carbon Footprint (kg CO2)',
                data: [totalDailyFootprint, totalMonthlyFootprint, totalYearlyFootprint],
                backgroundColor: ['#00796b', '#004d40', '#00251a'],
                borderColor: ['#004d40', '#00251a', '#001010'],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
