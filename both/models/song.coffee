class Song extends Module
	@extend MeteorModel, {model: Songs}
	@createFromYoutube: (list, youtube_id) ->
		$.get('http://gdata.youtube.com/feeds/api/videos/'+youtube_id+'?v=2&alt=json', (data) =>
				song = Song.fromDocument({title: data.entry.title.$t, duration: data.entry.media$group.yt$duration.seconds,youtube_id: youtube_id, thumbnail: data.entry.media$group.media$thumbnail[0].url, list_id: list._id});
				song.save()
				list.songs.push(song._id)
				list.save()
		, 'json')
	update_list: ->
  	list = List.findById(@list_id)
  	list.currently_playing = @_id
  	list.save()

