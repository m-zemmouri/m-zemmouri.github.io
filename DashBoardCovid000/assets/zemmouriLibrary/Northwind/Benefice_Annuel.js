// Ready Function off Benefice_Annuel Page
function Benefice_Annuel_Ready(myData) {

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
    get_Chart_Column_Benefice(myData);

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

    function get_Chart_Column_Benefice(data) {
        // var parameterJour = { groupBy: "Jour", field: "Profit", aggregation: "sum"/*, categoredBy: "Month", categories: categoriesDictionary["Months"]*/ };
        var parameterMois = { groupBy: "Month", field: "Profit", aggregation: "sum", name: translate("Monthly Profit"), /* drilldown: parameterJour */ };
        var parameterAnnee = { groupBy: "Year", field: "Profit", aggregation: "sum", name: translate("Monthly Profit"), drilldown: parameterMois };

        // var parameter = { groupBy: "Year", name: "Benefice", field: "Profit", aggregation: "sum" };
        var series = group(data, parameterAnnee);

        //Chart options
        var MyOptions = {
            chart:
            {
                renderTo: "Chart_Column_Benefice",
                type: 'column'
            },
            credits:
            {
                text: 'Northwind',
                href: 'https://northwinddatabase.codeplex.com/'
            },
            title:
            {
                text: translate("Profit")+" / "+translate("Year"),
            },
            tooltip:
            {
                enabled: true,
                formatter: function () {
                    return "<b>" + this.point.name + "</b><br/>"+translate("Profit")+" : <b>" + Highcharts.numberFormat(this.point.y, 2) + "</b>";
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
                name: translate("Annuel Profit"),
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
