Template.songs.selected_list = function(){
    return selected_list();
};

Template.songs.songs = function(){
    return Song.allIn(selected_list().songs)
};

Template.songs.rendered = function(){
    $("#sortable").sortable({stop: function(event,ui){
        var ids = [];
        $("#sortable li").each(function(){
            ids.push($(this).data("id"));
        });
        var l = selected_list();
        l.songs = ids;
        l.update();

    }});
    $("#sortable").disableSelection();
};

Template.songs.events({
    'click input#add-song-button': function(){
        var youtube_id_input = $("#new_song_youtube_id")[0];
        var youtube_id = new YoutubeMatcher().match(youtube_id_input.value);
        Song.createFromYoutube(selected_list(),youtube_id);
        youtube_id_input.value = "";
    },
    'keyup input#search-keywords': function(){
        var keywords = $("#search-keywords")[0].value;
        if(keywords != ""){
            if(current_search){current_search.abort();}
            current_search = YoutubeService.search(keywords,function(results){
                var html= Template.search_results({videos: results});
                $("#results").html(html);
            });
        }else{
            $("#results").html("");
        }
    }
});

var current_search = null;