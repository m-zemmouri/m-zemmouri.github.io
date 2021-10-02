// Ready Function off CA Page
function Creance_Client_Ready(myData) {

    ////---------------------------------------------------------------//
    //// User Parameters Region
    ////---------------------------------------------------------------//

    var Annee = "";
    var Mois = "";

    //// End Region
    ////---------------------------------------------------------------//

    ////---------------------------------------------------------------//
    //// initialization Region
    ////---------------------------------------------------------------//

    Page_Initialize();
    initializeColors();
    get_Chart_Pie_Creance_Annuel(myData);
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
        get_Chart_Column_Creance_Mensuel(DataAnnee);
        //cancel the Mois selection
        Mois = "";
        changeMois();
    }

    // Filter myData by Month
    function changeMois(MoisParameter) {

        var DataAnnee = myData;
        var DataMois = [];

        if (Annee) {
            //get the selected Annee
            DataAnnee = filterData(myData, { Year: Annee });
        }

        if (MoisParameter && MoisParameter != Mois) {
            //get the selected Month
            Mois = MoisParameter;
            DataMois = filterData(DataAnnee, { Month: Mois });
        }
        else {
            //cancel the Month selection
            Mois = "";
            DataMois = DataAnnee;
        }
        // get Chart
        get_Chart_Pie_Creance_Client(DataMois);
        get_Chart_Bar_Creance_Client(DataMois);
    }

    //// End Region
    ////---------------------------------------------------------------//

    ////---------------------------------------------------------------//
    //// Chart Region
    ////---------------------------------------------------------------//

    // CA / Année
    function get_Chart_Pie_Creance_Annuel(data) {
        //prepare data
        var parameter = { groupBy: "Year", name: "" + translate("Debt") + "", field: "Debt", aggregation: "sum" };
        var series = group(data, parameter);

        //Chart options
        var MyOptions = {
            chart:
            {
                renderTo: "Chart_Pie_Creance_Annuel",
                type: 'pie'
            },
            credits:
            {
                text: 'Northwind',
                href: 'https://northwinddatabase.codeplex.com/'
            },
            title:
            {
                text: "" + translate("Debt") + " / " + translate("Year") + ""
            },
            tooltip:
            {
                enabled: true,
                formatter: function () {
                    return "" + translate("Year") + " : <b>" + this.point.name + "</b><br/>" + translate("Debt") + " : <b>" + Highcharts.numberFormat(this.point.y, 2) + "</b><br/>" + translate("Percentage") + " : <b>" + Highcharts.numberFormat(this.percentage, 2) + "%</b>";
                }
            },
            plotOptions:
            {
                pie:
                {
                    allowPointSelect: true,
                    cursor: 'pointer',
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

    // CA / Mois Chart
    function get_Chart_Column_Creance_Mensuel(data) {
        //prepare data 
        var parameter = { name: "" + translate("Debt") + "", field: "Debt", aggregation: "sum", categoredBy: "Month", categories: categoriesDictionary["Months"] };
        var series = group(data, parameter);

        //Chart options
        var MyOptions = {
            chart:
            {
                renderTo: "Chart_Column_Creance_Mensuel",
                type: 'column',
            },
            credits:
            {
                text: 'Northwind',
                href: 'https://northwinddatabase.codeplex.com/'
            },
            title:
            {
                text: "" + translate("Debt") + " " + Annee + " / " + translate("Month")
            },
            tooltip:
            {
                enabled: true,
                formatter: function () {
                    return "<b>" + this.x + "-" + this.point.series.name + "</b><br/>"+translate("Debt")+" : <b>" + Highcharts.numberFormat(this.point.y, 2) + "</b>";
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
            plotOptions: {
                column:
                {
                    allowPointSelect: true,
                    cursor: 'pointer',
                },
                series: {
                    cursor: 'pointer',
                    point: {
                        events: {
                            click: function () {
                                changeMois(this.x + 1);
                            }
                        }
                    }
                }
            },
        };
        var chart = new Highcharts.Chart(MyOptions);
    }

    // Creance / Client
    function get_Chart_Pie_Creance_Client(data) {
        //prepare data
        var parameterClient = { groupBy: "Customer", name: "" + translate("Debt") + "", field: "Debt", aggregation: "sum" };
        var parameterFamille = { groupBy: "Customer Country", name: "" + translate("Debt") + "", field: "Debt", aggregation: "sum", drilldown: parameterClient };
        var series = group(data, parameterFamille);

        //Chart options
        var MyOptions = {
            chart:
            {
                renderTo: "Chart_Pie_Creance_Client",
                type: 'pie'
            },
            credits:
            {
                text: 'Northwind',
                href: 'https://northwinddatabase.codeplex.com/'
            },
            title:
            {
                text: "" + translate("Debt") + " " + Annee + "-" + Mois + " / " + translate("Customer") + ""
            },
            tooltip:
            {
                enabled: true,
                formatter: function () {
                    return "<b>" + this.point.name + "</b><br/>" + translate("Debt") + " : <b>" + Highcharts.numberFormat(this.point.y, 2) + "</b><br/>" + translate("Percentage") + " : <b>" + Highcharts.numberFormat(this.percentage, 2) + "%</b>";
                }
            },
            plotOptions:
            {
                pie:
                {
                    allowPointSelect: true,
                    cursor: 'pointer',
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
            }],
            drilldown:
            {
                series: series.drilldown,
            },
        };

        var chart = new Highcharts.Chart(MyOptions);
    }

    // Creance / Client
    function get_Chart_Bar_Creance_Client(data) {
        //prepare data        
        data = _.filter(data, function (row) {
            if (row["Creance"] != "0") return true;
            return false;
        });
        var parameter = { groupBy: "Customer", name: "" + translate("Debt") + "", field: "Debt", aggregation: "sum" };
        var series = group(data, parameter);

        //Chart options
        var MyOptions = {
            chart:
            {
                renderTo: "Chart_Bar_Creance_Client",
                type: 'bar',

                marginTop: 40,
                marginBottom: 80,
                height: series.data.length * 20 + 120 // 20px per data item plus top and bottom margins

            },
            credits:
            {
                text: 'Northwind',
                href: 'https://northwinddatabase.codeplex.com/'
            },
            title:
            {
                text: "" + translate("Debt") + " " + Annee + "-" + Mois + " / " + translate("Customer") + ""
            },
            tooltip:
            {
                enabled: true,
                formatter: function () {
                    return "<b>" + this.point.name + "</b><br/>" + translate("Debt") + " : <b>" + Highcharts.numberFormat(this.point.y, 2) + "</b>";
                }
            },
            plotOptions:
            {
                bar:
                {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    colorByPoint: true,
                    dataLabels:
                    {
                        enabled: true,
                        format: '<b>{point.name}</b>',
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
            }],
        };

        var chart = new Highcharts.Chart(MyOptions);
    }

    //// End Region
    ////---------------------------------------------------------------//

};