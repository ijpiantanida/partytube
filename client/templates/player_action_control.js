Template.player_control.events({
    'click input.next':function(){
        TemplatesHelpers.selected_list().playNextSongOn(Partytube.player_control);
    },
    'click input.play':function(){
        Partytube.player_control.play();
    },
    'click input.pause':function(){
        Partytube.player_control.pause();
    }
});