Lists = new Meteor.Collection('lists');
Songs = new Meteor.Collection('songs');
if (Meteor.isClient) {
	Template.lists.lists = function(){
		return Lists.find({},{sort: {created_at: -1}});
	}

	Template.lists.events({
		'click input.add': function(){
			var new_list_input = $("#new_list_name")[0];
			var new_list = {name: new_list_input.value, songs:[], created_at: Date.now()};
			Lists.insert(new_list);
			new_list_input.value="";
		}
	});

	Template.list.events({
		'click': function(){
			Session.set("selected_list",this._id);
			var songToPlay = this.currently_playing?this.currently_playing:this.songs[0];
			if(songToPlay==undefined){
				return;
			}
			playVideo(Songs.findOne(songToPlay));
		}
	});

	Template.songs.selected_list = function(){
		return selected_list();
	}
	Template.songs.songs = function(){
		return Songs.find({_id: {$in: selected_list().songs}})
	}

	Template.songs.events({
		'click input.add': function(){
			var youtube_id_input = $("#new_song_youtube_id")[0];
			var youtube_id = youtube_id_input.value;
			$.get('http://gdata.youtube.com/feeds/api/videos/'+youtube_id+'?v=2&alt=json', function(data) {
				var l = selected_list();
				var song_id = Songs.insert({title: data.entry.title.$t, duration: data.entry.media$group.yt$duration.seconds,youtube_id: youtube_id, list: l._id});
				l.songs.push(song_id);
				Lists.update(l._id,l);
			}, 'json');
			youtube_id_input.value = "";
		}
	});

	Template.song.index = function(){
		return indexOfSong(this);
	}

	Template.song.events({
		'click': function(){
			playVideo(this);
		},
		'click input.remove': function(){
			var l = selected_list();
			l.songs.splice(findSongIndex(l.songs,this),1);
			Lists.update(l._id,l,function(error){playNextSong();});
		},
		'mouseenter': function(){
			$("#song_"+this._id).find("input.remove").show();
		},
		'mouseout': function(){
			$("#song_"+this._id).find("input.remove").hide();
		}
	});

	var params = { allowScriptAccess: "always" };
	var atts = { id: "myytplayer" };
	swfobject.embedSWF("http://www.youtube.com/v/qPOTEs_yTJo?enablejsapi=1&playerapiid=ytplayer&version=3",
		                     "ytapiplayer", "425", "356", "8", null, null, params, atts);

	function onYouTubePlayerReady(playerId) {
      youtubePlayer().addEventListener("onStateChange","onStateChange");
  }

	function onStateChange(state){
		if(state==0){
			onVideoEnded();
		}
	}

	function selected_list(){
		return Lists.findOne(Session.get("selected_list"));
	}

	function playNextSong(){
		var list = selected_list();
		var all_songs = list.songs
		var next_song = all_songs[(findSongIndex(all_songs, list.currently_playing)+1)%all_songs.length];
		playVideo(next_song);
	}

	function findSongIndex(songs_array, song){
		for(var i=0;i<songs_array.length;i++){
			if(songs_array[i]==song._id)
				return i;
		}
		return -1;
	}

	function onVideoEnded(){
		playNextSong();
	}

	function playVideo(song){
		var	l = selected_list();
		l.currently_playing = song._id;
		Lists.update(l._id,l);
		youtubePlayer().loadVideoById(song.youtube_id, 0,"small");
	}

	function youtubePlayer(){
		return document.getElementById("myytplayer")
	}
}

if (Meteor.isServer) {
  Meteor.startup(function () {
  });
}
