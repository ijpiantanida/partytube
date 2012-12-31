Template.lists.lists = function(){
    return List.all();
};

Template.lists.events({
    'click input.add': function(){
        var new_list_input = $("#new_list_name");
        var new_list = new List(new_list_input.val());
        new_list.save();
        new_list_input.val("");
    }
});