var my_user_id = undefined;
Meteor.call("register_client", function(error, result){
    if(result){
        my_user_id = result;
    }
});

var params = { allowScriptAccess: "always" };
var atts = { id: "myytplayer" };
swfobject.embedSWF("http://www.youtube.com/v/qPOTEs_yTJo?enablejsapi=1&playerapiid=ytplayer&version=3",
    "ytapiplayer", "425", "356", "8", null, null, params, atts);

function onYouTubePlayerReady(playerId) {
    youtubePlayer().addEventListener("onStateChange","onStateChange");
}

var player_statuses_query_handler = undefined;
Events.on("list-selected", function(list){
    if(player_statuses_query_handler) player_statuses_query_handler.stop();
    query = PlayerStatuses.find({list_id: list._id, created_at: {$gt: Date.now()}});
    player_statuses_query_handler = query.observe({
        added: function(player_status, index){
            event_listener = new PlayerStatusEventListener(my_user_id, player());
            event_listener.call(player_status);
        }
    });
});

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

function playerControl(){
    return new PlayerActionControl(player())
}

function youtubePlayer(){
    return document.getElementById("myytplayer")
}