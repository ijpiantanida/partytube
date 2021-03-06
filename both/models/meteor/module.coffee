moduleKeywords = ['extended', 'included']

class Module
	@extend: (obj, options) ->
		obj.fucking_property = options
		for key, value of obj when key not in moduleKeywords
			@[key] = value
		obj.extended?.apply(@,[options])
		this
	@include: (obj) ->
		for key, value of obj when key not in moduleKeywords
			# Assign properties to the prototype
			@::[key] = value
		obj.included?.apply(@)
		this
