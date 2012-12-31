Template.song.events({
    'click': function(){
        this.playOn(player());
    },
    'click input.remove': function(){
        var l = selected_list();
        l.removeSong(this);
        l.playNextSongOn(player());
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