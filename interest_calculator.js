const btn = document.getElementById("Calculate");
btn.addEventListener("click", calculate);
const ctx = document.getElementById('myChart');
let currchart;


function calculate() {
    let P = Number(document.getElementById("Principal-amount").value);
    let r = Number(document.getElementById("Interest-Rate").value) / 100;
    let t = Number(document.getElementById("Years").value);
    let n = Number(document.getElementById("Compound-Frequency").value);
    let PMT = Number(document.getElementById("Contribution").value);

    if (isNaN(P) || isNaN(r) || isNaN(t) || isNaN(n) || isNaN(PMT)) {
        document.getElementById("result").innerText = "Please enter valid numbers for all fields.";
        return;
    }

    let temp = Math.pow((1 + r / n), n * t);
    let result1 = P * temp;
    let result2 = PMT * (temp - 1) / (r / n);
    let result = (result1 + result2).toFixed(2);

    document.getElementById("result").innerText = result;

    if(currchart != null){
        currchart.destroy();
    }

    currchart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Without Interest', 'With Interest'],
            datasets: [{
                label: 'Savings',
                data: [P + PMT * t * n, result],
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
