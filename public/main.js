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
        const votes = data.Votes;
        const totalVotes = votes.length;
        // Count vote points for each OS
        const voteCounts = votes.reduce(
            (acc, vote) => (
                (acc[vote.os] = (acc[vote.os] || 0) + parseInt(vote.points)), acc),{});

        console.log(voteCounts);

        let dataPoints = [
            {
                label: 'windows',
                y: voteCounts['windows']
            }, {
                label: 'macos',
                y: voteCounts['macos']
            }, {
                label: 'linux',
                y: voteCounts['linux']
            }, {
                label: 'other',
                y: voteCounts['other']
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
                    if (x.label === data.os) {
                        x.y += data.points;
                        return x;
                    } else {
                        return x;
                    }
                });
                chart.render();
            });

        }

    })