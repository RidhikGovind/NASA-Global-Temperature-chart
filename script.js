const xAxisLabel = []; //x-axis labels being the 'Year'
const yAxisLabel = []; //y-axis labels being the 'Temperature'

createChart();

async function createChart() {

    await getData(); //so here if we call await getData(), then createChart() is going to wait until the getData(); function is completed, then only it will proceed.

    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line', //type of chart presentation
        fill: true,
        data: {
            labels: xAxisLabel,
            datasets: [{
                label: 'Global Annual Temperature',
                data: yAxisLabel,
                fill: false,
                hoverBorderWidth: 10,
                backgroundColor: 'rgba(255, 206, 86, 1)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        }, options: {
            scales: {
                yAxes: [{
                    ticks: {
                        // Include a dollar sign in the ticks
                        callback: function (value, index, values) {
                            return value + "°C";
                        }
                    }
                }]
            }
        }


    });

}

async function getData() {
    const result = await fetch('ZonAnn.Ts+dSST.csv'); //fetching
    const data = await result.text() //parsing .csv to .txt

    const splitData = data.split('\n').slice(1); //here the raw text data is split into a different line and then deleting the [0]th entry of the whole thing.
    // console.log(splitData);
    splitData.forEach(item => {
        const row = item.split(','); //for each item of the whole element we are spliting the numbers of each item by commas
        const year = row[0]; //then getting the very first number of that item
        xAxisLabel.push(year);
        const temp = row[1]; //then getting the very second number of that item
        yAxisLabel.push(parseFloat(temp) + 14) //here we are adding 14 (which is the mean temperature) to find out the real change in temperature.
        // console.log(year, temp);
    })

}