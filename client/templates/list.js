Template.list.events({
    'click': function(){
        Session.set("selected_list",this._id);
        var songToPlay = this.currently_playing?this.currently_playing:this.songs[0];
        if(songToPlay) Song.findById(songToPlay).playOn(player());
        Events.notify("list-selected", this);
    }
});

Template.list.selected = function(){
    var l = selected_list();
    return (l && l._id == this._id) ? "selected":"";
};