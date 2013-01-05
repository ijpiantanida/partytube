Template.song.events({
    'click': function(){
        this.playOn(Partytube.player_control);
    },
    'click input.remove': function(){
        var l = TemplatesHelpers.selected_list();
        l.removeSong(this);
        l.with_next_song_do(function(song){Partytube.player_control.playSong(song)});
    },
    'mouseenter': function(){
        $("#song_"+this._id).find("input.remove").show();
    },
    'mouseout': function(){
        $("#song_"+this._id).find("input.remove").hide();
    }
});

Template.song.selected = function(){
    return TemplatesHelpers.selected_list().currently_playing == this._id ? "selected" : "";
};