Template.player_control.events({
    'click input.next':function(){
        selected_list().playNextSongOn(player());
    },
    'click input.play':function(){
        player().play();
    },
    'click input.pause':function(){
        player().pause();
    }
});