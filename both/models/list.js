function List(data){
	this.model = Lists;
	$.extend(this,MeteorModel);

	this.indexOfSong = function(song){
		return songs.indexOf(song.id);
	};

	this.removeSong = function(song){
		this.songs.splice(indexOfSong(song),1);
	};
}
