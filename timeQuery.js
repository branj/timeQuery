
(function( $ ){

  $.fn.timeline = function(options) {
  
		var settings = {
					
		 ajax: false,
		 display: ''
		}
		
		if(options)
		{
			$.extend(settings, options);
		}

    	var element = this.attr("id");
		var title = this.attr("title");
		element = "#" + element;
		$(element).css("margin", "1%");
		new TimeLine(element, title, settings);
  };

})( jQuery );


function TimeLine(element, title, settings)
{
	var count = 1;
    var increment = 0; 
	var left = 0;
	var html = '';
	var uniqueID = element.replace("#","");

	$(element + " > div").each(function(){
		$(this).attr("class", 'timelines');
		$(this).attr("id", uniqueID + count);			
		count++;
	})
	$(element + " .timelines").hide();

	count--;
    increment = 100/count;

	if(!settings.display)
	{
		$(element).wrap("<div style='margin: .5%'; class='ui-widget-content'/>");
		$(element).append("<div style='padding: 0% 3% 2% 3%; margin: 0px 3px; ' id='timelinecontent' class='ui-widget-content ui-corner-bottom'></div>");
		
	}
		
	
		$(element).prepend("<div style='margin: 0px; padding: 10px; text-align: center; font-size: medium;' class='ui-widget ui-widget-header ui-corner-all '>"+title+"<div class='ui-widget-header ui-state-default ui-corner-all' style='padding: 25px; margin: 0px; overflow: visible;'><div id='slider'><div id='labels'></div></div></div></div>");
	
	
	
	var counter = 1;
	
$(element + " h1").each(function(){
		
		label = $(this).text();
		left = left + increment;
        labelleft = left;
		if(left > 99)
		{
			left = 99;
			labelleft = 97;
		}
		
			$(element + " #labels").append("<span class='ui-icon ui-icon-bullet'  style='cursor: pointer; margin: 0px;  margin-top: -2px;  position: absolute; left:" + left + "%;'></span><div id='label"+counter+"'  class='label ui-widget-content a' style=' margin: 0px;  background:none; border: none; padding: 3px; opacity: .35;  font-size: xx-small; position: absolute; bottom: 110%; left:" + labelleft + "%; z-index: 3;'>" + label + "</div>");
			counter++;	
		});
	
	$(element + ' .label:even').css("top","110%");
	var prev = 0;
	$(element + " #slider").slider({
			animate: true,
			min: 0,
			max: $(element + " .timelines").length,
			slide: function(event, ui)
			{	

				if(settings.display)
				{
					if(settings.ajax)
					{
						var url = $(element + " .timelines#" + ui.value + " a").attr('href');
						
						$(settings.display).load(url);
					}
					
					else
					{
				  		var html = $(element + " .timelines#" + ui.value).html();
				  		$(settings.display).hide().html(html).fadeIn();
					}
				}
				
				else
				{
					if(settings.ajax)
					{
						var url = $(element + " .timelines#" + uniqueID + ui.value + " a").attr('href');
						$(element + " #timelinecontent").load(url);
					}
					
					else
					{
						var html = $(element + " .timelines#" + uniqueID + ui.value).html();
				  		$(element + " #timelinecontent").html(html);
					}
				}

				$(element + ' #labels #label'+ prev ).animate({opacity: '.35'}, 'slow');
				$(element + " #labels #label"+ ui.value).animate({opacity: 1}, 'slow');
				prev = ui.value;

			}
	
	});
	
	

}

