Template.list.events({
    'click': function(){
        var new_list = this;
        $("#songs-column").hide("blind", { direction: "horizontal" },500,function(){
            Events.notify("list-selected", new_list);
            $("#songs-column").show("blind", { direction: "horizontal" },500);
        });
    }
});

Template.list.selected = function(){
    var l = TemplatesHelpers.selected_list();
    return (l && l._id == this._id) ? "selected":"";
};