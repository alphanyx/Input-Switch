
(function($) {
	$.changeType = function(obj, type) {
		var newObj;
		var setFunctions = false;

		if (obj.nodeName.toLowerCase() == 'input') {
			try {
				$(obj).attr('type',type);
			} catch (e) {
				try {
					$.changeType.newObj = $(obj).clone(true);
					$.changeType.newObj.attr('type', type);
				} catch (e) {
					$.changeType.newObj = $('<input>');

					var events = jQuery._data(obj, "events");

					$.changeType.newObj.data($(obj).data());

					// ie 8 got problems copying the functions before the element is in the dom tree
					setFunctions = true;
					
					$.changeType.newObj.attr('type', type);
					
					if (obj.attributes.length) {
						$.each(obj.attributes, function(index, attr) {
							if (attr.name.toLowerCase() != 'type' && $.trim(attr.value) != '' && attr.value != 'null') {
								if(obj.attributes[index].specified == true ) {
									try {
										$.changeType.newObj.attr(attr.name, attr.value);
									} catch (e) { }
								}
							}
						});
					}
				

					if ($(obj).val()) {
						$.changeType.newObj.val($(obj).val());
					}
				}

				$(obj).replaceWith($.changeType.newObj);


				if (setFunctions) {
					try {
						$.each(events, function(i, e) {
							$.each(e, function(i, singleEvent){
								$.changeType.newObj.bind(singleEvent.type, singleEvent.handler);
							});
						});
					} catch (e) { }
					setFunctions = false;
				}
			}
		}
	}

	$.fn.changeType = function(type) {
		return this.each(function(){
			$.changeType(this,type);
		});
	};
})(jQuery);

