////---------------------------------------------------------------//
//// Highcharts Colors Region
////---------------------------------------------------------------//

// initialize Colors
function initializeColors() {
    // Applay highchartsTheme
    if (highchartsTheme != 'default')
        var highchartsOptions = Highcharts.setOptions(HighchartsThemes[highchartsTheme]);
    else
        Highcharts.getOptions().colors = ['#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'];

    // Radialize the colors
    if (Radialize)
        Highcharts.getOptions().colors = Highcharts.map(Highcharts.getOptions().colors, function (color) { return gradient(color); });
}

// get the gradient color
function gradient(color)
{
    return {
        radialGradient: { cx: 0.5, cy: 0.3, r: 0.7 },
        stops: 
		[
			[0, color],
			[1, Highcharts.Color(color).brighten(-0.3).get('rgb')] // darken
		]
    };
}

// colorize data series
function colorize(dataSeries, colors) {
    _.each(dataSeries, function (item) {
        item["color"] = colors[item.name];
    });
    return dataSeries;
}



//// End Region
////---------------------------------------------------------------//

