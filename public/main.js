const form = document.getElementById("vote-form");

//submit event
form.addEventListener('submit', (e) => {
    const choice = document
        .querySelector('input[name=os]:checked')
        .value;
    const data = {
        os: choice
    };

    fetch('http://localhost:3000/poll', {
        method: 'post',
        body: JSON.stringify(data),
            headers: new Headers({'Content-Type': 'application/json'})
        })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err));

    e.preventDefault();
});


fetch('http://localhost:3000/poll')
    .then(res => res.json())
    .then(data => {
        const votes = data.votes;
        const totalVotes = votes.length;
        // Count vote points for each 
        votes.reduce((prev,curr) => {
            
        })
    
    })
    .catch(err => console.log(err));

let dataPoints = [
    {
        label: 'windows',
        y: 0
    }, {
        label: 'macos',
        y: 0
    }, {
        label: 'linux',
        y: 4
    }, {
        label: 'other',
        y: 0
    }
];

const chartContainer = document.querySelector('#chartContainer')

//is there a chartcontainer?
if (chartContainer) {
    const chart = new CanvasJS.Chart("chartContainer", {
        theme: "light1", // "light2", "dark1", "dark2"
        animationEnabled: true, // change to true
        title: {
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


    // Enable pusher logging - don't include this in production
    Pusher.logToConsole = true;

    var pusher = new Pusher('33cff15253d6e12abb18', {
        cluster: 'eu',
        encrypted: true
    });

    var channel = pusher.subscribe('os-poll');
    channel.bind('os-vote', function (data) {
        dataPoints = dataPoints.map((x) => { 
            if(x.label === data.os) {
                x.y += data.points;
                return x;
            } else {
                return x;
            }
        });
        chart.render();
    });
   

}

//canvas.js
