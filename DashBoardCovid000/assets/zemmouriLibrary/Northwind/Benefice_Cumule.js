// Ready Function off Benefice Page
function Benefice_Cumule_Ready(myData) {
	
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
    get_Chart_Line_Benefice_Cumule(myData);

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

    // Benefice Cumule Chart
    function get_Chart_Line_Benefice_Cumule(data) {
        //prepare data 
        var parameter = { groupBy: "Year", name: translate("Profit"), field: "Profit", aggregation: "cum", categoredBy: "Month", categories: categoriesDictionary["Months"] };
        var series = group(data, parameter);

        //Chart options
        var MyOptions = {
            chart:
            {
                renderTo: "Chart_Line_Benefice_Cumule",
                type: 'line',
            },
            credits:
            {
                text: 'Northwind',
                href: 'https://northwinddatabase.codeplex.com/'
            },
            title:
            {
                text: translate("Benefice Cumule")
            },
            tooltip:
            {
                enabled: true,
                formatter: function () {
                    return "<b>" + this.x + "-" + this.point.series.name + "</b><br/>"+translate("Benefice Cumule")+" : <b>" + Highcharts.numberFormat(this.point.y, 2) + "</b>";
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
