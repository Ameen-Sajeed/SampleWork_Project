/**
* Theme: Syntra Admin Template
* Author: Mannat-themes
* Morris Chart
*/

// Morris-chart
$( function () {
    "use strict";
    // Morris bar chart
    Morris.Bar( {
        element: 'morris-bar-chart', data: [ {
            y: '2006', a: 100, b: 90
        }
        , {
            y: '2007', a: 75, b: 65
        }
        , {
            y: '2008', a: 50, b: 40
        }
        , {
            y: '2009', a: 75, b: 65
        }
        , {
            y: '2010', a: 50, b: 40
        }
        , {
            y: '2011', a: 75, b: 65
        }
        , {
            y: '2012', a: 100, b: 90
        }
        ], xkey: 'y', ykeys: [ 'a', 'b'], labels: [ 'A', 'B'], barColors: [ '#8596a7', '#242440'], hideHover: 'auto', gridLineColor: '#eef0f2', resize: true
    }
    );
    // LINE CHART
    var line=new Morris.Line( {
        element: 'morris-line-chart', resize: true, data: [ {
            y: '2011 Q1', item1: 2666
        }
        , {
            y: '2011 Q2', item1: 2778
        }
        , {
            y: '2011 Q3', item1: 4912
        }
        , {
            y: '2011 Q4', item1: 3767
        }
        , {
            y: '2012 Q1', item1: 6810
        }
        , {
            y: '2012 Q2', item1: 5670
        }
        , {
            y: '2012 Q3', item1: 4820
        }
        , {
            y: '2012 Q4', item1: 15073
        }
        , {
            y: '2013 Q1', item1: 10687
        }
        , {
            y: '2013 Q2', item1: 8432
        }
        ], xkey: 'y', ykeys: [ 'item1'], labels: [ 'Item 1'], gridLineColor: '#eef0f2', lineColors: [ '#2e61f2'], lineWidth: 1, hideHover: 'auto'
    }
    );
    // Morris donut chart
    Morris.Donut( {
        element: 'morris-donut-chart', data: [ {
            label: "Download Sales", value: 10,
        }
        , {
            label: "In-Store Sales", value: 25
        }
        , {
            label: "Mail-Order Sales", value: 12
        }
        ], resize: true, colors: [ '#00bcd2', '#424858', '#ffcdd3']
    }
    );
    // Extra chart
    Morris.Area( {
        element: 'extra-area-chart', data: [ {
            period: '2001', smartphone: 0, windows: 0, mac: 0
        }
        , {
            period: '2002', smartphone: 90, windows: 60, mac: 25
        }
        , {
            period: '2003', smartphone: 40, windows: 80, mac: 35
        }
        , {
            period: '2004', smartphone: 30, windows: 47, mac: 17
        }
        , {
            period: '2005', smartphone: 150, windows: 40, mac: 120
        }
        , {
            period: '2006', smartphone: 25, windows: 80, mac: 40
        }
        , {
            period: '2007', smartphone: 10, windows: 10, mac: 10
        }
        ], lineColors: [ '#2e61f2', '#424858', '#ff5450'], xkey: 'period', ykeys: [ 'smartphone', 'windows', 'mac'], labels: [ 'Phone', 'Windows', 'Mac'], pointSize: 0, lineWidth: 0, resize: true, fillOpacity: 0.8, behaveLikeLine: true, gridLineColor: '#e0e0e0', hideHover: 'auto'
    }
    );
    Morris.Area( {
        element: 'multi-line-chart', data: [ {
            period: '2001', smartphone: 0, windows: 0, mac: 0
        }
        , {
            period: '2002', smartphone: 60, windows: 30, mac: 45
        }
        , {
            period: '2003', smartphone: 20, windows: 60, mac: 30
        }
        , {
            period: '2004', smartphone: 65, windows: 15, mac: 40
        }
        , {
            period: '2005', smartphone: 120, windows: 50, mac: 80
        }
        , {
            period: '2006', smartphone: 25, windows: 80, mac: 40
        }
        , {
            period: '2007', smartphone: 30, windows: 20, mac: 10
        }
        ], xkey: 'period', ykeys: [ 'smartphone', 'windows', 'mac'], labels: [ 'Phone', 'Windows', 'Mac'], pointSize: 3, fillOpacity: 0, pointStrokeColors: [ '#ffcdd3', '#a1c3d3', '#86b7f2'], behaveLikeLine: true, gridLineColor: '#e0e0e0', lineWidth: 3, hideHover: 'auto', lineColors: [ '#ffcdd3', '#a1c3d3', '#86b7f2'], resize: true
    }
    );
    Morris.Area( {
        element: 'morris-area-chart2', data: [ {
            period: '2010', SiteA: 0, SiteB: 0,
        }
        , {
            period: '2011', SiteA: 130, SiteB: 100,
        }
        , {
            period: '2012', SiteA: 80, SiteB: 60,
        }
        , {
            period: '2013', SiteA: 70, SiteB: 200,
        }
        , {
            period: '2014', SiteA: 180, SiteB: 150,
        }
        , {
            period: '2015', SiteA: 105, SiteB: 90,
        }
        , {
            period: '2016', SiteA: 250, SiteB: 150,
        }
        ], xkey: 'period', ykeys: [ 'SiteA', 'SiteB'], labels: [ 'Site A', 'Site B'], pointSize: 0, fillOpacity: 0.4, pointStrokeColors: [ '#00bcd2', '#007BFF'], behaveLikeLine: true, gridLineColor: '#e0e0e0', lineWidth: 0, smooth: false, hideHover: 'auto', lineColors: [ '#00bcd2', '#007BFF'], resize: true
    }
    );
}

);