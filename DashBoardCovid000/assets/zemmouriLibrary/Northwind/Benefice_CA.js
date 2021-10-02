// Ready Function off CA Page
function Benefice_CA_Ready(myData) {

    ////---------------------------------------------------------------//
    //// User Parameters Region
    ////---------------------------------------------------------------//

    var Annee = "";

    //// End Region
    ////---------------------------------------------------------------//

   ////---------------------------------------------------------------//
    //// initialization Region
    ////---------------------------------------------------------------//

    Page_Initialize();
    initializeColors();
    get_Chart_Pie_Benefice_Annuel(myData);
    changeAnnee();

    //// End Region
    ////---------------------------------------------------------------//

    ////---------------------------------------------------------------//
    //// Filter Region
    ////---------------------------------------------------------------//   

    // Filter myData by Year
    function changeAnnee(AnneeParameter) {

        var DataAnnee = [];

        if (AnneeParameter && AnneeParameter != Annee) {
            //get the selected Annee
            Annee = AnneeParameter;
            DataAnnee = filterData(myData, { Year: Annee });
        }
        else {
            //cancel the Annee selection
            Annee = "";
            DataAnnee = myData;
        }
        // get Chart
        get_Chart_Gauge_Benefice_Performance(DataAnnee);
        get_Chart_Column_Benefice_Mensuel(DataAnnee);
        get_Chart_Line_Benefice_CA_Mensuel(DataAnnee);
    }

    //// End Region
    ////---------------------------------------------------------------//

    ////---------------------------------------------------------------//
    //// Chart Region
    ////---------------------------------------------------------------//

    // CA / Année
    function get_Chart_Pie_Benefice_Annuel(data) {
        //prepare data
        var parameter = { name: translate("Profit"), groupBy: "Year", field: "Profit", aggregation: "sum" };
        var series = group(data, parameter);


        //Chart options
        var MyOptions = {
            chart:
            {
                renderTo: "Chart_Pie_Benefice_Annuel",
                type: 'pie'
            },
            credits:
            {
                text: 'Northwind',
                href: 'https://northwinddatabase.codeplex.com/'
            },
            title:
            {
                text: "" + translate("Profit") + "  / " + translate("Year")
            },
            tooltip:
            {
                enabled: true,
                formatter: function () {
                    return "" + translate("Year") + " : <b>" + this.point.name + "</b><br/>" + translate("Profit") + " : <b>" + Highcharts.numberFormat(this.point.y, 2) + "</b><br/>"+ translate("Percentage") +" : <b>" + Highcharts.numberFormat(this.percentage, 2) + "%</b>";
                }
            },
            plotOptions:
            {
                pie:
                {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    //colors: myColors,	
                    dataLabels:
                    {
                        enabled: true,
                        format: '<b>{point.name}</b> ({point.percentage:.2f}%)',
                        color: '#000000',
                        connectorColor: '#000000',
                        style:
                        {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        }
                    }
                }
            },
            series:
            [{
                data: series.data,
                point:
                {
                    events:
                    {
                        click: function (event) {
                            changeAnnee(this.name);
                        }
                    }
                }
            }]
        };

        var chart = new Highcharts.Chart(MyOptions);
    }

    // CA Perfection Gauge
    function get_Chart_Gauge_Benefice_Performance(data) {
        //prepare data
        var Total = aggregate(data, { field: "Extended Price", aggregation: "sum" });
        var Benefice = aggregate(data, { field: "Profit", aggregation: "sum" });

        var value = 5;

        if (Total != 0) {
            value = 100 * Benefice / Total;
        }

        // Gauge Options
        var MyOptions = {
            chart:
            {
                renderTo: "Chart_Gauge_Benefice_Performance",
                type: 'solidgauge'
            },
            credits:
            {
                text: 'Northwind',
                href: 'https://northwinddatabase.codeplex.com/',
                position:
                {
                    align: 'center',
                },
            },
            title:
            {
                text: "" + translate("Performance") + " " + Annee,
                align: 'center',
            },
            tooltip:
            {
                enabled: true,
                formatter: function () {
                    var AnneeLib = translate("All Years");
                    if (Annee)
                        AnneeLib = Annee;
                    return "" + translate("Year") + ": <b>" + AnneeLib + "</b><br/>" + translate("Turnover") + ": <b>" + Highcharts.numberFormat(Total, 2) + "</b><br/>" + translate("Profit") + ": <b>" + Highcharts.numberFormat(Benefice, 2) + "</b><br/>" + translate("Performance") + " : <b>" + Highcharts.numberFormat(this.y, 2) + "%</b>";
                }
            },
            pane:
            {
                center: ['50%', '85%'],
                size: '100%',
                startAngle: -90,
                endAngle: 90,
                background:
                {
                    backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || '#EEE',
                    innerRadius: '60%',
                    outerRadius: '100%',
                    shape: 'arc'
                }
            },
            yAxis:
            {
                // the value axis
                min: 0,
                max: 100,
                stops: [
                    [0.05, gradient('#DF5353')], // red
                    [0.15, gradient('#DDDF0D')], // yellow
                    [0.40, gradient('#55BF3B')] // green
                ],
                lineWidth: 0,
                minorTickInterval: null,
                tickPixelInterval: 400,
                tickWidth: 0,
                title:
                {
                    y: -70
                },
                labels:
                {
                    y: 16
                }
            },
            plotOptions:
            {
                solidgauge:
                {
                    dataLabels:
                    {
                        y: 5,
                        borderWidth: 0,
                        useHTML: true
                    },
                    animation: {
                        duration: 2000,
                        easing: 'easeOutBounce'
                    },
                }
            },
            series:
            [{
                name: 'percentage',
                data: [0],
                dataLabels:
                {
                    format: '<div style="text-align:center"><span style="font-size:23px;color:' +
                        ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y:.1f}%</span><br/>'
                }
            }]
        };

        var chart = new Highcharts.Chart(MyOptions);

        //Animation
        var point = chart.series[0].points[0];
        point.update(value, true, { duration: 2000, easing: "easeOutBounce" });
    }

    // CA / Mois Chart
    function get_Chart_Column_Benefice_Mensuel(data) {
        //prepare data 
        var parameter = { name: translate("Profit"), field: "Profit", aggregation: "sum", categoredBy: 'Month', categories: categoriesDictionary['Months'] };
        var series = group(data, parameter);

        //Chart options
        var MyOptions = {
            chart:
            {
                renderTo: "Chart_Column_Benefice_Mensuel",
                type: 'column',
            },
            credits:
            {
                text: 'Northwind',
                href: 'https://northwinddatabase.codeplex.com/'
            },
            title:
            {
                text: "" + translate("Profit") + " " + Annee  + " / " + translate("Month")
            },
            tooltip:
            {
                enabled: true,
                formatter: function () {
                    return "<b>" + this.x + "-" + this.point.series.name + "</b><br/>" + translate("Profit") + " : <b>" + Highcharts.numberFormat(this.point.y, 2) + "</b>";
                }
            },

            xAxis:
            {
                categories: categoriesDictionary["MonthsName"],
            },
            yAxis:
            {
                title:
                {
                    text: translate("Amount"),
                },
                allowDecimals: false,
            },
            legend:
            {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0
            },
            series: series.data,
        };
        var chart = new Highcharts.Chart(MyOptions);
    }

    // CA & Bénéfice / Mois Chart
    function get_Chart_Line_Benefice_CA_Mensuel(data) {
        //prepare data 
        var parameterCA = { name: translate("Turnover"), field: "Extended Price", aggregation: "sum", categoredBy: "Month", categories: categoriesDictionary["Months"] };
        var parameterBenefice = { name: translate("Profit"), field: "Profit", aggregation: "sum", categoredBy: "Month", categories: categoriesDictionary["Months"] };

        var parameter = [parameterBenefice, parameterCA];
        var series = group(data, parameter);

        //Chart options
        var MyOptions = {
            chart:
            {
                renderTo: "Chart_Line_Benefice_CA_Mensuel",
                type: 'line',
            },
            credits:
            {
                text: 'Northwind',
                href: 'https://northwinddatabase.codeplex.com/'
            },
            title:
            {
                text: translate("Turnover") + " & " + translate("Profit") + "  " + Annee + " / " + translate("Month")
            },
            tooltip:
            {
                enabled: true,
                formatter: function () {
                    return "<b>" + this.x + "-" + this.point.series.name + "</b><br/>"+ translate("Turnover") +" : <b>" + Highcharts.numberFormat(this.point.y, 2) + "</b>";
                }
            },

            xAxis:
            {
                categories: categoriesDictionary["MonthsName"],
            },
            yAxis:
            {
                title:
                {
                    text: translate("Amount"),
                },
                allowDecimals: false,
            },
            legend:
            {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0
            },
            series: series.data,
        };
        var chart = new Highcharts.Chart(MyOptions);
    }

    //// End Region
    ////---------------------------------------------------------------//

};