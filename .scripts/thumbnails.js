Songs.find({thumbnail:undefined}).forEach(function(song){
    $.get('http://gdata.youtube.com/feeds/api/videos/'+song.youtube_id+'?v=2&alt=json', function(data) {
        song.thumbnail=data.entry.media$group.media$thumbnail[0].url;
        Songs.update(song._id,song);
    }, 'json');
});