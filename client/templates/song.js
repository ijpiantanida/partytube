Template.song.events({
    'click': function(){
        this.playOn(playerControl());
    },
    'click input.remove': function(){
        var l = selected_list();
        l.removeSong(this);
        l.playNextSongOn(playerControl());
    },
    'mouseenter': function(){
        $("#song_"+this._id).find("input.remove").show();
    },
    'mouseout': function(){
        $("#song_"+this._id).find("input.remove").hide();
    }
});

Template.song.selected = function(){
    return selected_list().currently_playing == this._id ? "selected" : "";
};