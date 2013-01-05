Template.songs.selected_list = function(){
    return TemplatesHelpers.selected_list();
};

Template.songs.songs = function(){
    return Song.allIn(TemplatesHelpers.selected_list().songs)
};

Template.songs.rendered = function(){
    $("#sortable").sortable({stop: function(event,ui){
        var ids = [];
        $("#sortable li").each(function(){
            ids.push($(this).data("id"));
        });
        var l = TemplatesHelpers.selected_list();
        l.songs = ids;
        l.update();

    }});
    $("#sortable").disableSelection();
};

Template.songs.events({
    'click input#add-song-button': function(){
        var youtube_id_input = $("#new_song_youtube_id")[0];
        var youtube_id = new YoutubeMatcher().match(youtube_id_input.value);
        Song.createFromYoutube(TemplatesHelpers.selected_list(),youtube_id);
        youtube_id_input.value = "";
    },
    'keyup input#search-keywords': function(){
        var keywords = $("#search-keywords")[0].value;
        if(keywords != ""){
            if(current_search){current_search.abort();}
            current_search = YoutubeService.search(keywords,function(result){
                Session.set("search-results", result);
            });
        }else{
            Session.set("search-results", []);
        }
    }
});

var current_search = null;