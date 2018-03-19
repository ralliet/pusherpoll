const form = document.getElementById("vote-form");

//submit event
form.addEventListener('submit', (e) => {
    const choice= document.querySelector('input[name=os]:checked').value;
    const data = {os: choice};

    fetch('http://localhost:3000/poll', {
        method: 'post',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));

    e.preventDefault();
});


let dataPoints = [
    {label:'windows', y:0},
    {label:'macos', y:0},
    {label:'linux', y:4},
    {label:'other', y:0},
];


const chartContainer = document.querySelector('#chartContainer')

if(chartContainer) {
    const chart = new CanvasJS.Chart("chartContainer", {
        theme: "light1", // "light2", "dark1", "dark2"
        animationEnabled: true, // change to true		
        title:{
            text: "Basic Column Chart"
        },
        data: [
        {
            // Change type to "bar", "area", "spline", "pie",etc.
            type: "column",
            dataPoints: dataPoints
        }
        ]
    });
    chart.render();
}

//canvas.js

