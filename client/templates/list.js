Template.list.events({
    'click': function(){
        var new_list = this;
        $("#songs-column").hide("blind", { direction: "horizontal" },500,function(){Session.set("selected_list",this._id);
            Session.set("selected_list",new_list._id);
            var songToPlay = new_list.currently_playing?new_list.currently_playing:new_list.songs[0];
            if(songToPlay) Song.findById(songToPlay).playOn(player());
            Events.notify("list-selected", new_list);
            $("#songs-column").show("blind", { direction: "horizontal" },500);
        });
    }
});

Template.list.selected = function(){
    var l = selected_list();
    return (l && l._id == this._id) ? "selected":"";
};