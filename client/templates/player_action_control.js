Template.player_control.events({
    'click input.next':function(){
        TemplatesHelpers.selected_list().with_next_song_do(function(next_song){
            Partytube.player_control.playSong(next_song);
        });
    },
    'click input.play':function(){
        Partytube.player_control.play();
    },
    'click input.pause':function(){
        Partytube.player_control.pause();
    }
});