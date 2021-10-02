// Ready Function off CA_Annuel Page
function CA_Annuel_Ready(myData) {

    ////---------------------------------------------------------------//
    //// User Parameters Region
    ////---------------------------------------------------------------//


    //// End Region
    ////---------------------------------------------------------------//

    ////---------------------------------------------------------------//
    //// initialization Region
    ////---------------------------------------------------------------//

    Page_Initialize();
    initializeColors();
    get_Chart_Column_CA(myData);

    //// End Region
    ////---------------------------------------------------------------//

    ////---------------------------------------------------------------//
    //// Filter Region
    ////---------------------------------------------------------------//   


    //// End Region
    ////---------------------------------------------------------------//

    ////---------------------------------------------------------------//
    //// Chart Region
    ////---------------------------------------------------------------//

    function get_Chart_Column_CA(data) {
        // var parameterJour = { groupBy: "Jour", field: "Extended Price", aggregation: "sum"/*, categoredBy: "Month", categories: categoriesDictionary["Months"]*/ };
        var parameterMois = { groupBy: "Month", field: "Extended Price", aggregation: "sum", /*categoredBy: "Month", categories: categoriesDictionary["MonthsName"],  drilldown: parameterJour */ };
        //var parameterMois = { name: "Chiffre D'affaire Mensuel", field: "Profit", aggregation: "sum", categoredBy: "Month", categories: categoriesDictionary["Months"] };
        var parameterAnnee = { groupBy: "Year", name: translate("Monthly Turnover"), field: "Extended Price", aggregation: "sum", drilldown: parameterMois };

        // var parameter = { groupBy: "Year", name: "CA", field: "Extended Price", aggregation: "sum" };
        var series = group(data, parameterAnnee);

        //Chart options
        var MyOptions = {
            chart:
            {
                renderTo: "Chart_Column_CA",
                type: 'column'
            },
            credits:
            {
                text: 'Northwind',
                href: 'https://northwinddatabase.codeplex.com/'
            },
            title:
            {
                text: ""+translate("Turnover")+" / " + translate("Year") + ""
            },
            tooltip:
            {
                enabled: true,
                formatter: function () {
                    return "<b>" + this.point.name + "</b><br/>"+translate("Turnover") +" : <b>" + Highcharts.numberFormat(this.point.y, 2) + "</b>";
                }
            },
            xAxis:
             {
                 type: 'category',
             },
            yAxis:
            {
                title:
                {
                    text: translate("Amount"),
                },
                allowDecimals: false,
            },
            series:
            [{
                name: translate("CA Annuel"),
                colorByPoint: true,
                data: series.data,
            }],
            drilldown:
            {
                series: series.drilldown,
            }
        };

        var chart = new Highcharts.Chart(MyOptions);
    }

    //// End Region
    ////---------------------------------------------------------------//

};