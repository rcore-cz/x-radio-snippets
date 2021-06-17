var volume = 0.5;

function display(bool) {
    if (bool) {
        $("#body").show();
    } else {
        $("#body").hide();
    }
}

$(function(){
	var radio = 0;
    display(false);
	window.addEventListener('message', function(event) {
		var item = event.data;
        if (item.open === "ui"){
            display(item.status);
             $("#playing").text("Playing: nothing....");
             $("#volume").text("Volume: 50%");
        }

        if (item.type === "info"){
            volume = item.volume
            $("#volume").text("Volume: " + Math.floor(volume * 100 ) +"%");
            updateName(item.url);
        }

        if (item.type === "volume"){
            volume = item.volume
            $("#volume").text("Volume: " + Math.floor(volume * 100 ) +"%");
        }
		
		if(item.type === "add_default"){
			radio ++;
			$("#menu").append("<div onclick='$(this).playDefault()' class = 'button' value = '"+item.id+"' url = '"+item.url+"'><p>"+radio+"</p></div>");
		}
    })
});

jQuery.fn.extend({
	playDefault: function() {
		var def = $(this).attr('value');
		updateName($(this).attr('url'));
		$.post('http://xradio/play_default', JSON.stringify({
			radioId: def,
		}));	
	}
});

$( "#plus" ).click(function() {
	$.post('http://xradio/volumeUp', JSON.stringify({}));
});

$( "#minus" ).click(function() {	
	$.post('http://xradio/volumeDown', JSON.stringify({}));	
});

function roundNumber(num, scale) {
  if(!("" + num).includes("e")) {
    return +(Math.round(num + "e+" + scale)  + "e-" + scale);
  } else {
    var arr = ("" + num).split("e");
    var sig = ""
    if(+arr[1] + scale > 0) {
      sig = "+";
    }
    return +(Math.round(+arr[0] + "e" + sig + (+arr[1] + scale)) + "e-" + scale);
  }
}