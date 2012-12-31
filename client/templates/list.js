Template.list.events({
    'click': function(){
        Session.set("selected_list",this._id);
        var songToPlay = this.currently_playing?this.currently_playing:this.songs[0];
        if(songToPlay==undefined){
            return;
        }
        Song.findById(songToPlay).playOn(player());
    }
});

Template.list.selected = function(){
    return selected_list()._id == this._id ? "selected":"";
};