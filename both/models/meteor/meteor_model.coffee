MeteorModel =
	fromDocument: (document) ->
		instance = new this()
		instance._meteor_model = document
		instance[name] = document[name] for name of document
		instance
	findById: (id) ->
		@fromDocument(@model.findOne(id))
	first: ->
		@fromDocument(@model.findOne())
	all: ->
		all_models=[]
		@model.find().forEach((d)=> all_models.push(@fromDocument(d)))
		all_models
	extended: ->
		@include
			update: -> 
				@constructor.model.update(@_id,@mapToData())
			mapToData: ->
				@_meteor_model[name] = @[name] for name of @_meteor_model
				@_meteor_model

