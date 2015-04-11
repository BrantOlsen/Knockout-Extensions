/**
 * Allow select boxes to have boolean binds.
 */
ko.bindingHandlers.booleanValue = {
    init: function(element, valueAccessor, allBindingsAccessor) {
        var observable = valueAccessor(),
            interceptor = ko.computed({
                read: function() {
                    return observable().toString().toLowerCase();
                },
                write: function(newValue) {
                    observable(newValue === "true");
                }                   
            });

        ko.applyBindingsToNode(element, { value: interceptor });
    }
};

/*
 *  Here's a custom Knockout binding that makes elements shown/hidden via jQuery's 
 *  fadeIn()/fadeOut() methods.
 */
ko.bindingHandlers.fadeVisible = {
    init: function(element, valueAccessor) {
        // Initially set the element to be instantly visible/hidden depending on the value
        var value = valueAccessor();
        // Use "unwrapObservable" so we can handle values that may or may not be observable
        $(element).toggle(ko.utils.unwrapObservable(value)); 
    },
    update: function(element, valueAccessor) {
        // Whenever the value subsequently changes, slowly fade the element in or out
        var value = valueAccessor();
        ko.utils.unwrapObservable(value) ? $(element).fadeIn() : $(element).fadeOut();
    }
};

/*
 *  Here's a custom Knockout binding that makes elements shown/hidden via jQuery's 
 *  fadeIn()/fadeOut() methods.
 */
ko.bindingHandlers.fadeRight = {
    init: function(element, valueAccessor) {
        // Initially set the element to be instantly visible/hidden depending on the value
        var value = valueAccessor();
        // Use "unwrapObservable" so we can handle values that may or may not be observable
        $(element).toggle(ko.utils.unwrapObservable(value));
    },
    update: function(element, valueAccessor) {
        // Whenever the value subsequently changes, slowly fade the element in or out
        var value = valueAccessor();
        ko.utils.unwrapObservable(value) ? 
            $(element).show("slide", { direction: 'right' }, 1000) : 
            $(element).hide("slide", { direction: 'right' }, 1000);
    }
};

/*
 *  Here's a custom Knockout binding that makes elements shown/hidden via jQuery's 
 *  fadeIn()/fadeOut() methods.
 */
ko.bindingHandlers.blockLoading = {
    init: function(element, valueAccessor) {
        // Initially set the element to be instantly visible/hidden depending on the value
        var value = valueAccessor();
        // Use "unwrapObservable" so we can handle values that may or may not be observable
        if (value) {
            $(element).block({ message: '<h3><img src="/images/busy.gif" /></h3>' });
        }
        else {
            $(element).unblock();
        }
    },
    update: function(element, valueAccessor) {
        // Whenever the value subsequently changes, slowly fade the element in or out
        var value = valueAccessor();
        ko.utils.unwrapObservable(value) ?  $(element).block({ message: '<h3><img src="/images/busy.gif" /></h3>' }) : $(element).unblock();
    }
};

ko.bindingHandlers.href = {
    update: function (element, valueAccessor) {
        ko.bindingHandlers.attr.update(element, function () {
            return { href: valueAccessor()}
        });
    }
};

ko.bindingHandlers.src = {
    update: function (element, valueAccessor) {
        ko.bindingHandlers.attr.update(element, function () {
            return { src: valueAccessor()}
        });
    }
};

var photo_matcher = new RegExp('/(.jpeg)|(.jpg)|(.png)|(.gif)$/', 'i');
ko.validation.rules["isPhotoFile"] = {
    validator: function (fileName) {
        return fileName == '' || photo_matcher.exec(fileName) !== null;
    },
    message: "File must be a valid photo type (.jpg, .png, .gif)."
};
ko.validation.registerExtenders();
ko.validation.init({
    decorateInputElement: true,
    errorMessageClass: 'validation-error',
    errorElementClass: 'validation-error',
    parseInputAttributes: true
});
