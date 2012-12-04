var MeteorModel = {
	update: function(){
		this.model.update(this._id,this.mapToData());
	},

	mapToData: function(){
		for (var name in this._meteor_model){
			this._meteor_model[name] = this[name];
		}
		return this._meteor_model;
	},

	fromModel: function(data){
		this._meteor_model = data;
		for (var name in data){
			this[name] = data[name];
		}
	}
}

