if (Meteor.isClient) {
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

	Template.list.events({
		'click': function(){
			Session.set("selected_list",this._id);
			var songToPlay = this.currently_playing?this.currently_playing:this.songs[0];
			if(songToPlay==undefined){
				return;
			}
			Song.findById(songToPlay).playOn(player());
		}
	});

    Template.list.selected = function(){
        return selected_list()._id == this._id ? "selected":"";
    };

	Template.songs.selected_list = function(){
		return selected_list();
	};

	Template.songs.songs = function(){
		return Song.allIn(selected_list().songs)
	};

	Template.songs.events({
		'click input.add': function(){
			var youtube_id_input = $("#new_song_youtube_id")[0];
			var youtube_id = youtube_id_input.value;
			Song.createFromYoutube(selected_list(),youtube_id);
			youtube_id_input.value = "";
		}
	});

	Template.song.events({
		'click': function(){
			this.playOn(player());
		},
		'click input.remove': function(){
			var l = selected_list();
			l.removeSong(this);
			l.nextSong().playOn(player());
		},
		'mouseenter': function(){
			$("#song_"+this._id).find("input.remove").show();
		},
		'mouseout': function(){
			$("#song_"+this._id).find("input.remove").hide();
		}
	});

    Template.song.selected = function(){
        return selected_list().currently_playing == this._id ? "selected" : "";
    };

    Template.player_control.events({
        'click input.next':function(){
            selected_list().playNextSongOn(player());
        },
        'click input.play':function(){
            player().play();
        },
        'click input.pause':function(){
            player().pause();
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
		return List.findById(Session.get("selected_list"));
	}

	function onVideoEnded(){
		selected_list().nextSong().playOn(player());
	}

	function player(){
		return new Player(youtubePlayer());
	}

	function youtubePlayer(){
		return document.getElementById("myytplayer")
	}
}

if (Meteor.isServer) {
  Meteor.startup(function () {
  });
}
