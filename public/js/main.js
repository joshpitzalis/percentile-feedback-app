$(document).ready(function() {

    var chart;
    var requestToday = function(){

        $.ajax({
            url: '/api/getToday/',
            success: function(data){
                chart.title.text = data[0];
                chart.series[0].setData(data.data,true);
            },
            cache: false
        });
    };

    chart = new Highcharts.Chart({
        chart: {
            renderTo: 'myChart',
            backgroundColor: '#272B30',
            plotBorderColor: '#606063',
            style: {
                fontFamily: "'Unica One', sans-serif"
            },
            events: {
                load: function(){
                    setInterval(requestToday, 10000);
                }
            }
        },
        title: {
            text: 'Percentile Feedback',
            style: {
                color: '#E0E0E3',
                textTransform: 'uppercase',
                fontSize: '20px'
            }
        },
        xAxis: {
            gridLineColor: '#707073',
            labels: {
                style: {
                    color: '#E0E0E3'
                }
            },
            lineColor: '#707073',
            minorGridLineColor: '#505053',
            tickColor: '#707073',
            title: {
                style: {
                    color: '#A0A0A3'

                }
            },
            tickInterval: 1
        },
        yAxis: {
            gridLineColor: '#707073',
            labels: {
                style: {
                    color: '#E0E0E3'
                }
            },
            lineColor: '#707073',
            minorGridLineColor: '#505053',
            tickColor: '#707073',
            tickWidth: 1,
            title: {
                style: {
                    color: '#A0A0A3'
                }
            },
            min: 0
        },
        legend: {
            enabled: false
        },
        tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            style: {
                color: '#F0F0F0'
            }
        },
        background2: '#505053',
        dataLabelsColor: '#B0B0B3',
        textColor: '#C0C0C0',
        contrastTextColor: '#F0F0F3',
        maskColor: 'rgba(255,255,255,0.3)',
        series: [{
            name: 'today',
            data: []
        }],
        credits: {
            enabled: false
        }
    });
});
