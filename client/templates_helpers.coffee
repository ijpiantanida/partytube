#All methods in this class should be based on template reactivity.
class TemplatesHelpers
  @selected_list: ->List.findById(Session.get("selected_list"))