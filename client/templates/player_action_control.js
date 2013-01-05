Template.player_control.events({
    'click input.next':function(){
        selected_list().playNextSongOn(playerControl());
    },
    'click input.play':function(){
        playerControl().play();
    },
    'click input.pause':function(){
        playerControl().pause();
    }
});