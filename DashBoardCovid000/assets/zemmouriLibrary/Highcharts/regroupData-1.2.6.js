/*!
 * RegroupData v1.2.6 (2016-03-08)
 * (c) 2014-2019 ZEMMOURI Mohamed
 *  m.zemmouri@gmail.com
 */
 
//---------------------------------------------------------------//
// Main function Region
//---------------------------------------------------------------//

/** 
  * group data to be used in highchart 
  * @desc group data to be used in highchart 
  * @param {Array} data - data.
  * @param {Object} parameter - parameter value {field; aggregation function}.
  * @param {String} id - parent id (in case of drilldown chart).
  * @return {Object} - highchart data {data; drilldown}..
  * @example
  * // returns grouped data for Highcharts, parameters undefined
  * group(data) 
  * @example
  * // returns grouped data for Highcharts, with one parameter
  * group(data, {groupBy : "col2", name : "test", field : "col1", aggregation : "count", categoredBy : "catfield", categories : [cat1, cat2], drilldown : null}) 
  * @example
  * // returns grouped data for Highcharts, with one parameter
  * group(data, [{groupBy : "col2", name : "test", field : "col1", aggregation : "count"},{field : "col2", aggregation : "count"}]) 
  */

function group(data, parameters, id) {
    var result = { data: [], drilldown: [] };
    if (!id) id = "";

    //prepare parameters
    if (!Array.isArray(parameters)) parameters = [parameters];

    for (var i = 0; i < parameters.length; i++) {
        //vars initialisation      
        if (!parameters[i])
            parameters[i] = {};//other method : parameters[i] = {groupBy : "", name : "", field : "", aggregation : "count", categoredBy : "", categories : [], drilldown : null};
        if (!parameters[i].aggregation)
            parameters[i].aggregation = "count";
        if (!parameters[i].field)
            parameters[i].field = "";
        if (!parameters[i].name)
            parameters[i].name = parameters[i].aggregation + " " + parameters[i].field;
        if (parameters[i].categoredBy && !(parameters[i].categories && parameters[i].categories.length))
            parameters[i].categories = getDistinct(data, parameters[i].categoredBy);

        // get different groups
        var groups = [];
        if (parameters[i].groupBy)
            groups = getDistinct(data, parameters[i].groupBy);
        else	//just to use it as name --> var item = {name:groupName};
            groups.push(parameters[i].name);

        var j = 0;
        var value=0;
        _.each(groups, function (groupName) {
            //filter Data
            var filter = {};
            if (parameters[i].groupBy)
                filter[parameters[i].groupBy] = groupName;
            var selectedData = filterData(data, filter);
            //new item
            var item = { name: groupName };
            if (parameters[i].categoredBy)
                item["data"] = categorize(selectedData, parameters[i]);
            else {
                //Save last value to use in cum aggrigation
                value = aggregate(selectedData, parameters[i], value);
                item["y"] = value;
            }

            //Colorize Item
            if (parameters[i].colors && parameters[i].colors[groupName])
                item["color"] = parameters[i].colors[groupName];

            //drilldown
            if (parameters[i].drilldown) {
                var drilldownId = id + "_" + j;
                item["drilldown"] = drilldownId;
                var drilldownSeries = group(selectedData, parameters[i].drilldown, drilldownId);
                result.drilldown.push({ id: drilldownId, name: parameters[i].name, data: drilldownSeries.data });
                result.drilldown = result.drilldown.concat(drilldownSeries.drilldown);
            }
            //insert item 
            result.data.push(item);
            j++;
        });
    }
    return result;
}
    
// End Region
//---------------------------------------------------------------//

//---------------------------------------------------------------//
// sub functions Region
//---------------------------------------------------------------//


function categorize(data, parameter) { return categorize1(data, parameter); }
/** 
  * categorize data
  * @desc categorize data
  * @param {Array} data - data.
  * @param {Object} parameter - item value.
  * @return {Array} - categorized data.
*/
function categorize1(data, parameter) {
    var result = [];
    var value = 0;
    for (var i = 0; i < parameter.categories.length; i++) {
        //filter Data
        var filter = {};
        filter[parameter.categoredBy] = parameter.categories[i];
        var selectedData = filterData(data, filter);
        //Save last value to use in cum aggrigation
        value = aggregate(selectedData, parameter, value);
        result.push(value);
    }
    return result;
}


/** 
  * categorize data
  * @desc categorize data
  * @param {Array} data - data.
  * @param {Object} parameter - item value.
  * @return {Array} - categorized data.
*/
function categorize0(data, parameter) {
    var result = [];
    var categoredparameter = { groupBy: parameter.categoredBy, field: parameter.field, aggregation: parameter.aggregation };
    var categoredData = group(data, categoredparameter).data;

    result = _.sortBy(categoredData, function (item) { return parameter.categories.indexOf(item.name); });
    var i = 0;
    while (result.length < parameter.categories.length) {
        if (typeof result[i] === 'undefined' || result[i].name != parameter.categories[i]) {
            result.splice(i, 0, { name: parameter.categories[i], y: null });
        }
        i++;
    }
    return result;
}

/** 
  * aggregate data
  * @desc aggregate data
  * @param {Array} data - data.
  * @param {Object} parameter - parameter value {field; aggregation function}.
  * @return {Integer} - aggregation value.
*/ 
function aggregate(data, parameter, lastValue)
{	
    {	//vars initialisation	
        var field = "";
        var aggregation = "count";
        if (parameter)
        {
            if (parameter.field)
            {
                field = parameter.field;
                if (parameter.aggregation) aggregation = parameter.aggregation;
            }
        }
        lastValue = lastValue ? lastValue : 0;
    }
	var result = null;	
	if(data)
	{
	    if (aggregation == "count")
	    {
	        result = data.length;
	    }
	    else
	    {
	        var values = _.pluck(data, field);
													
			for(i = 0; i < values.length; i++)
			{
				values[i] = parseFloat(values[i]);
			}
			if(aggregation == "max")
			{
				result = _.max(values);
			}
			else if(aggregation == "min")
			{
				result = _.min(values);
			}
			else if(aggregation == "sum")
			{
				result = _.reduce(values, function(memo, num){ return memo + num;}, 0);
			}
			else if (aggregation == "avg") {
			    result = _.reduce(values, function (memo, num) { return memo + num; }, 0) / _.size(values);
			}
			else if (aggregation == "cum") {
			    result = lastValue + _.reduce(values, function (memo, num) { return memo + num; }, 0);
			}
			else
			{
				result = _.size(values);
			}	
		}	
	}
	return result;
}

// End Region
//---------------------------------------------------------------//


//---------------------------------------------------------------//
// Change log Region
//---------------------------------------------------------------//
/*
v1.2.6 (2016-03-08)
    Add Cumulation 'cum' aggregation
v1.2.5 (2016-03-07)
	fix bug in group function (categoredBy field)
v1.2.4 (2016-02-14)
	move getDistinct to dataManager-1.2.6.js
v1.2.3 (2016-01-21)
	change categorize function.
*/
// End Region
//---------------------------------------------------------------//


