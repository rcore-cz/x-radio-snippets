var yPlayer

function updateName(url){
    if(getYoutubeUrlId(url) === "")
     {
        $("#playing").text("Reproduciendo: " + editString(url));
    }else{
        yPlayer = new YT.Player("yt_vid",
        {
            height: '0',
            width: '0',
            videoId: getYoutubeUrlId(url),
            events:
            {
                'onReady': function(event){
                    getName(event.target.getVideoData().title);
                    console.log(event.target.getVideoData().title);
                },
            }
        });
    }
}

function getYoutubeUrlId(url)
{
    var videoId = "";
    if( url.indexOf("youtube") !== -1 ){
        var urlParts = url.split("?v=");
        videoId = urlParts[1].substring(0,11);
    }

    if( url.indexOf("youtu.be") !== -1 ){
        var urlParts = url.replace("//", "").split("/");
        videoId = urlParts[1].substring(0,11);
    }
    return videoId;
}

function editString(string){
    var str = string;
    var res = str.split("/");
    var final = res[res.length - 1];
    final = final.replace(".mp3", " ");
    final = final.replace(".wav", " ");
    final = final.replace(".wma", " ");
    final = final.replace(".wmv", " ");

    final = final.replace(".aac", " ");
    final = final.replace(".ac3", " ");
    final = final.replace(".aif", " ");
    final = final.replace(".ogg", " ");
    final = final.replace("%20", " ");
    final = final.replace("-", " ");

    return final;
}

function getName(name){
    $("#playing").text("Reproduciendo: " + name);
    if (typeof this.yPlayer.stopVideo === "function" && typeof this.yPlayer.destroy === "function") {
        yPlayer.stopVideo();
        yPlayer.destroy();
    }
    yPlayer = null;

    $("#trash").text('');
    $("#trash").append('<div id = "yt_vid"></div>');
}

$( "#play" ).click(function()
{
	var name = $("#url").val();
	if(name.length != 0){
		updateName(name);
		$.post('http://xradio/play', JSON.stringify(
		{
			url: name,
		}));
	}
});

$( "#stop" ).click(function()
{
	$.post('http://xradio/stop', JSON.stringify({}));
	$("#playing").text("Reproduciendo: nada....");
	$("#volume").text("Volumen: 50%");
});

$( "#off" ).click(function()
{
	$.post('http://xradio/exit', JSON.stringify({}));
});