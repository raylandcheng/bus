let url = 'https://data.etabus.gov.hk/v1/transport/kmb/stop-eta/A0D379E172F5BC93'

async function fetchBus(route) {
    const response = await fetch(url);
    const times = await response.json();
    document.getElementById(route).textContent = ''
    times.data.forEach(element => {
        if (element.route == route) {

            var bus = document.getElementById(route);
            var li = document.createElement("li");
            var timeSpan = document.createElement("span");
            var minSpan = document.createElement("span");
            var rmkSpan = document.createElement("span");

            var eta = new Date(element.eta);
            var timestamp = new Date(element.data_timestamp);

            var remark = element.rmk_en;

            var deltaMins = (eta - timestamp) / (1000 * 60);

            deltaMins = deltaMins < 0 ? '-' : Math.floor(deltaMins);
            minSpan.innerText = deltaMins;
            minSpan.classList.add("minute");

            rmkSpan.innerText = ' mins ' + (remark.length > 1 ? ' : ' + remark : '');
            rmkSpan.classList.add("remark");




            var header = document.getElementById('time');

            header.textContent = 'Data Time: ' + timestamp.toLocaleString('en-UK', {
                timeStyle: 'short',
                hour12: false,
            })

            if (element.eta) {
                li.textContent = eta.toLocaleString('en-UK', {
                    timeStyle: 'short',
                    hour12: false,
                }) + ' | '; // + deltaMins + ' mins '; // + remark;
                li.appendChild(minSpan);
                li.appendChild(rmkSpan);
            } else {
                li.textContent = 'No scheduled information'
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