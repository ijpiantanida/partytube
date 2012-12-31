class YoutubeMatcher
  match: (source) ->
    matcher = _.detect([new UrlMatcher(), new DefaultMatcher()], (m) => m.matchs(source))
    matcher.match(source)