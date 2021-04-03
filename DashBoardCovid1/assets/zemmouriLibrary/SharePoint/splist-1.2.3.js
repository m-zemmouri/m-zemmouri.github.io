/*!
 * SPList v1.2.3 (2015-05-30)
 * (c) 2014-2019 ZEMMOURI Mohamed
 *  m.zemmouri@gmail.com
 */

//---------------------------------------------------------------//
// spplus Region
//---------------------------------------------------------------//

/** 
  * Get List items
  * @desc Get List items with SharePointPlus (Asynchronous !!!!)
  * @param {String} list - List name.
  * @param {Array} fields - fields to read it.
  * @param {String} where - condition.
  * @param {String} orderBy - field / order by.
  * @return {Array} - data.
*/ 
function getList_spplus(list, fields, where, orderBy) 
{
	var data=[];
	where = (typeof where === "undefined" || where == null) ? "" : where;
	orderBy = (typeof orderBy === "undefined" || orderBy == null) ? "" : orderBy;
	
	$SP().list(list).get({fields:fields.join(),where: where, orderby:orderBy}, function (items) 
	{
		for (var i=0; i < items.length; i++)
		{				
			var row = {};			
			for(var j in fields) 
			{
				row[fields[j]] = format_Item(items[i].getAttribute(fields[j]));
			}	
			data.push(row);
		}
	});
	
	return data;
	
}

// End Region
//---------------------------------------------------------------//

//---------------------------------------------------------------//
// SPServices Region
//---------------------------------------------------------------//

/** 
  * Get List items
  * @desc Get List items with SPServices
  * @param {String} list - List name.
  * @param {Array} fields - fields to read it.
  * @param {String} camlQuery - camlQuery.
  * @param {String} rowLimit - rows number
  * @return {Array} - data.
*/ 
function getList_SPServices(list, fields, camlQuery, rowLimit) 
{   
	var data=[];
	camlQuery = (!camlQuery) ? "" : camlQuery;	
	rowLimit = (!rowLimit) ? 0 : rowLimit;
	var camlViewFields=(!fields) ? "" : "<ViewFields><FieldRef Name='" + fields.join("'/><FieldRef Name='") + "'/></ViewFields>";
	$().SPServices(
	{
		operation: "GetListItems",
		async: false,
		listName: list,
		CAMLQuery: camlQuery,
		CAMLRowLimit:rowLimit,
		CAMLViewFields: camlViewFields,	 
		completefunc: function (xData, Status) 
		{				
			$(xData.responseXML).SPFilterNode("z:row").each(function() 
			{
				var row = {};			
				for(var j in fields) 
				{
					row[fields[j]]= format_Item($(this).attr('ows_'+fields[j]));	
				}	
				data.push(row);				
			});	
		}	
	});
	return data;
}


function GetListDisplayName(list) 
{
	var result = new Array();
	var name;
	var displayName;
	$().SPServices(
	{
		operation: "GetList",
		async: false,
		listName: list,
		completefunc: function(xData, Status) 
		{
			$(xData.responseXML).find("Fields > Field").each(function() 
			{
				var $node = $(this);
				name = $node.attr("StaticName");
				displayName = $node.attr("DisplayName"); //$node.attr("Type");
				alert("name:" + name + "- displayName:" + displayName);
			});
		}           
	});
	return result;
}

// End Region
//---------------------------------------------------------------//

//---------------------------------------------------------------//
// Formate Data Region
//---------------------------------------------------------------//

/** 
  * format Item
  * @desc format list Item
  * @param {String} item - item value.
  * @return {String} - formatted value.
*/ 
function format_Item(item)
{
	var result = "";
	if (typeof item !== "undefined" && item !== null)
	{
		if( item.indexOf(";#") < 0)
		{
			//simple Field
			result =item;	
		}		
		else
		{
			// LookUp Field
			//SP returns lookup field values specially coded with as "<id>;#<value>".
			var Choices = item.split(';#');  
			var results =[];
			for (var i=0; i*2 < Choices.length; i++)
			{ 
				results[i]=Choices[i*2+1];			
			}	
			result =results.join(" | ");
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
v1.2.3 (2015-05-03)
	change getList_SPServices functions; make the fields parameters optional.
*/
// End Region
//---------------------------------------------------------------//


