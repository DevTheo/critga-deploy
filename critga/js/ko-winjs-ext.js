ko.bindingHandlers.winHtmlControl = {
    init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
        // This will be called when the binding is first applied to an element
        // Set up any initial state, event handlers, etc. here
        
        //object should have uri, and vm properties, loaded
        var model = valueAccessor();
        var uri = model.uri || "#";
        var vm = model.vm;        
        var loaded = model.loaded || (() => {});
        
        var htmCtl = new WinJS.UI.HtmlControl(element, {uri: (model.uri || "#")});
        WinJS.UI.processAll().then(function () {
            if(vm) {
                $(element).children().each(function (el) {
                    ko.cleanNode(el);
                    ko.applyBindings(vm, el);
                });
            }
            loaded();
        });

    },
    update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
        // This will be called once when the binding is first applied to an element,
        // and again whenever any observables/computeds that are accessed change
        // Update the DOM element based on the supplied values here.
    }
};
