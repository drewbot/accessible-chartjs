// var tableHeadings = Object.keys(data[0])

const config = {
    description: "ADA compliant doughnut chart",
    theads: [
        'month', // x axis label category
        'number' // y axis data category
    ],
    chart: {
        type: 'doughnut',
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{
                    label: 'My First dataset',
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: '#ffffff',
                    data: [0, 10, 5, 2, 20, 30, 44]
                },
                {
                    label: 'My Second dataset',
                    backgroundColor: '#bada55',
                    borderColor: '#000000',
                    data: [10, 20, -5, 20, -20, 3, 14]
                }
            ]
        },
        options: {}
    }
}

const config2 = {
    description: "ADA compliant line chart",
    theads: [
        'week', // x axis label category
        'number' // y axis data category
    ],
    chart: {
        type: 'line',
        data: {
            labels: ['week1', 'week2', 'week3', 'week4', 'week5'],
            datasets: [{
                    label: 'Student A',
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: '#ffffff',
                    data: [0, 10, 5, 2, 20]
                },
                {
                    label: 'Student B',
                    backgroundColor: '#bada55',
                    borderColor: '#000000',
                    data: [10, 20, -5, 20, -20]
                }
            ]
        },
        options: {}
    }
}

function createAccessibleChart(el, config) {

    const canvasEl = document.getElementById(el);
    // Set attributes
    canvasEl.setAttribute("role", "img")
    canvasEl.setAttribute("aria-label", config.description)

    // Basic Chart JS setup
    const ctx = canvasEl.getContext('2d');
    const chart = new Chart(ctx, config.chart);

    // Create table(s) for fallback content
    config.chart.data.datasets.forEach(function(dataset, index) {
        const table = document.createElement('table')
        const caption = document.createElement('caption')
        const text = document.createTextNode(dataset.label ? dataset.label : ('table ' + index));
        caption.appendChild(text);
        table.appendChild(caption);

        const tableBodyContent = config.chart.data.labels.map(function(label, index) {
            const tableRowContent = {}
            tableRowContent[config.theads[0]] = label
            tableRowContent[config.theads[1]] = dataset.data[index]
            return tableRowContent
        })

        generateTableHead(table, config.theads);
        generateTableBody(table, tableBodyContent)
        canvasEl.appendChild(table)
    })
}

function generateTableHead(table, theads) {
    const thead = table.createTHead();
    const row = thead.insertRow();
    for (let key of theads) {
        const th = document.createElement("th");
        const text = document.createTextNode(key);
        th.appendChild(text);
        row.appendChild(th);
    }
}

function generateTableBody(table, tableBodyContent) {
    const tbody = document.createElement('tbody')
    for (let element of tableBodyContent) {
        const row = tbody.insertRow();
        for (key in element) {
            const cell = row.insertCell();
            const text = document.createTextNode(element[key]);
            cell.appendChild(text);
        }
    }
    table.appendChild(tbody)
}

createAccessibleChart('doughnutChart', config)
createAccessibleChart('lineChart', config2)