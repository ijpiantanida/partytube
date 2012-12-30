MeteorModelKeywords = ['_meteor_attributes']

MeteorModel =
	fromDocument: (document) ->
		instance = new @()
		instance._meteor_attributes = {}
		instance._meteor_attributes.document_model = document
		instance[name] = document[name] for name of document
		instance
	setDefaults: (instance) ->
		instance._meteor_attributes = {}
		instance._meteor_attributes.saved = true
		instance
	findById: (id) ->
		@setDefaults(@fromDocument(@model.findOne(id)))
	first: ->
		@setDefaults(@fromDocument(@model.findOne()))
	all: ->
		@model.find().map((d) => @setDefaults(@fromDocument(d)))
	allIn: (ids) ->
		all_models = @model.find({_id: {$in: ids}}).map((d)=> @setDefaults(@fromDocument(d)))
		sorted_models = []
		for model in all_models
			index = ids.indexOf(model._id)
			sorted_models[index]=model
		sorted_models
	deleteById: (id) ->
		@model.remove(id)
	extended: (options) ->
		@model = options.model
		@include
			save: ->
				@_meteor_attributes ?= {}
				if @_meteor_attributes.saved?
					@update()
				else
					new_id = @constructor.model.insert(@mapToData())
					@_id = new_id
				@_meteor_attributes.saved = true
				@_id
			update: ->
				@constructor.model.update(@_id,@mapToData())
			mapToData: ->
				@_meteor_attributes ?= {}
				@_meteor_attributes.document_model = {}
				(@_meteor_attributes.document_model[name] = @[name]) for name of @ when name not in MeteorModelKeywords
				@_meteor_attributes.document_model
			delete: ->
				@constructor.model.remove(@_id)

