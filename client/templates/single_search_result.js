Template.single_search_result.events({
    'click': function(){
        var youtube_id = $(this)[0].id;
        Song.createFromYoutube(TemplatesHelpers.selected_list(),youtube_id);
    }
});