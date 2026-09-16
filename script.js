// Store appliances
let appliances = [];


// ADD APPLIANCE
function addAppliance() {

    const name = document.getElementById("applianceName").value;
    const power = Number(document.getElementById("power").value);
    const quantity = Number(document.getElementById("quantity").value);
    const hours = Number(document.getElementById("hours").value);


    // Check that the user entered valid information

    if (
        name === "" ||
        power <= 0 ||
        quantity <= 0 ||
        hours <= 0
    ) {
        alert("Please enter valid appliance information.");
        return;
    }


    // Calculate daily electricity consumption

    const dailyKwh =
        (power * quantity * hours) / 1000;


    // Add appliance to array

    const appliance = {
        name: name,
        power: power,
        quantity: quantity,
        hours: hours,
        dailyKwh: dailyKwh
    };


    appliances.push(appliance);


    // Clear input fields

    document.getElementById("applianceName").value = "";
    document.getElementById("power").value = "";
    document.getElementById("quantity").value = "1";
    document.getElementById("hours").value = "";


    displayAppliances();

    calculateEverything();
}



// DISPLAY APPLIANCES

function displayAppliances() {

    const list =
        document.getElementById("applianceList");

    list.innerHTML = "";


    appliances.forEach((appliance, index) => {

        const row = document.createElement("tr");


        row.innerHTML = `

            <td>${appliance.name}</td>

            <td>${appliance.power} W</td>

            <td>${appliance.quantity}</td>

            <td>${appliance.hours} hrs</td>

            <td>${appliance.dailyKwh.toFixed(2)} kWh</td>

            <td>
                <button
                    class="delete-btn"
                    onclick="deleteAppliance(${index})"
                >
                    Delete
                </button>
            </td>

        `;


        list.appendChild(row);

    });

}



// DELETE APPLIANCE

function deleteAppliance(index) {

    appliances.splice(index, 1);

    displayAppliances();

    calculateEverything();

}



// CALCULATE EVERYTHING

function calculateEverything() {

    // Calculate total daily consumption

    let dailyUsage = 0;


    appliances.forEach(appliance => {

        dailyUsage += appliance.dailyKwh;

    });


    // Get tariff

    const tariff =
        Number(document.getElementById("tariff").value) || 0;


    // Get number of days

    const daysInMonth =
        Number(document.getElementById("daysInMonth").value) || 30;


    // Get meter balance

    const meterBalance =
        Number(document.getElementById("meterBalance").value) || 0;


    // Monthly electricity consumption

    const monthlyUsage =
        dailyUsage * daysInMonth;


    // Estimated monthly cost

    const monthlyCost =
        monthlyUsage * tariff;


    // Estimated days remaining

    let daysRemaining = 0;


    if (dailyUsage > 0 && meterBalance > 0) {

        daysRemaining =
            meterBalance / dailyUsage;

    }


    // Update dashboard

    document.getElementById("dailyUsage").textContent =
        dailyUsage.toFixed(2) + " kWh";


    document.getElementById("monthlyUsage").textContent =
        monthlyUsage.toFixed(2) + " kWh";


    document.getElementById("monthlyCost").textContent =
        formatCurrency(monthlyCost);


    document.getElementById("daysRemaining").textContent =
        daysRemaining.toFixed(1) + " days";


    // Update summary

    document.getElementById("summaryDaily").textContent =
        dailyUsage.toFixed(2) + " kWh";


    document.getElementById("summaryMonthly").textContent =
        monthlyUsage.toFixed(2) + " kWh";


    document.getElementById("summaryCost").textContent =
        formatCurrency(monthlyCost);


    document.getElementById("summaryDays").textContent =
        daysRemaining.toFixed(1) + " days";

}



// CURRENCY FORMATTER

function formatCurrency(amount) {

    return new Intl.NumberFormat("en-NG", {

        style: "currency",

        currency: "NGN",

        maximumFractionDigits: 0

    }).format(amount);

}