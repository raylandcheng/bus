let url = 'https://data.etabus.gov.hk/v1/transport/kmb/stop-eta/A0D379E172F5BC93'

async function fetchBus(route) {
    const response = await fetch(url);
    const times = await response.json();
    document.getElementById(route).textContent = ''
    times.data.forEach(element => {
        if (element.route == route) {

            var bus = document.getElementById(route);
            var li = document.createElement("li");

            var eta = new Date(element.eta);
            var timestamp = new Date(element.data_timestamp);


            var deltaMins = (eta - timestamp) / (1000 * 60);

            var header = document.getElementById('time');
            header.textContent = 'Data Time: ' + timestamp.toLocaleString('en-UK', {
                timeStyle: 'medium',
                hour12: false,
            })
            
            if (element.eta) {
                li.textContent = eta.toLocaleString('en-UK', {
                    timeStyle: 'medium',
                    hour12: false,
                }) + ' | ' + Math.floor(deltaMins) + ' mins';
            }

            bus.appendChild(li);

        }
    });

};


var route = ['272K', '274P'];

fetchBus(route[0]);
fetchBus(route[1]);
setInterval(() => fetchBus(route[0]), 15 * 1000);
setInterval(() => fetchBus(route[1]), 15 * 1000);