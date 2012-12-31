class YoutubeService
  @search: (keywords, callback) ->
    search_url = 'http://gdata.youtube.com/feeds/api/videos?q='+keywords+'&max-results=5&orderby=relevance&format=5&v=2&alt=json'
    $.get(search_url, (data) =>
      entries = []
      for entry in data.feed.entry
        video =
          id: entry.media$group.yt$videoid.$t
          title: entry.title.$t
          thumbnail: entry.media$group.media$thumbnail[0].url
        entries.push(video)
      callback(entries)
    , 'json');