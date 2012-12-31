var params = { allowScriptAccess: "always" };
var atts = { id: "myytplayer" };
swfobject.embedSWF("http://www.youtube.com/v/qPOTEs_yTJo?enablejsapi=1&playerapiid=ytplayer&version=3",
    "ytapiplayer", "425", "356", "8", null, null, params, atts);

function onYouTubePlayerReady(playerId) {
    youtubePlayer().addEventListener("onStateChange","onStateChange");
}

function onStateChange(state){
    if(state==0){
        onVideoEnded();
    }
}

function selected_list(){
    return List.findById(Session.get("selected_list"));
}

function onVideoEnded(){
    selected_list().playNextSongOn(player());
}

function player(){
    return new Player(youtubePlayer());
}

function youtubePlayer(){
    return document.getElementById("myytplayer")
}