/**
* Theme: Syntra Admin Template
* Author: Mannat-themes
* Dashboard
*/

// Dashboard 1 Morris-chart
$( function () {
    "use strict";
     
   
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
        element: 'morris-line-chart', data: [ {
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
   
}

);