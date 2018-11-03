function control(configs) {
    this.configs = configs || {};
    this.id = configs.id;
    this.name = configs.name;
    this.field = configs.field || {
        id: Date.now(),
        name: Date.now(),
        type: 'text'
    };

    this.class = configs.class;
    this.attrs = configs.attrs;
    this.isPreview = configs.isPreview;
    this.style = configs.style;
}

control.prototype.getType = function () {
    return this.field.type;
};
control.prototype.buildHtml = function () {
    $item = $('<div></div>');
    if (this.id) {
        $item.prop('id', this.id);
    }

    if (this.name) {
        $item.prop('name', this.name);
    }

    if (this.class) {
        $item.addClass(this.class);
    }

    if (this.attrs) {
        for (var key in this.attrs) {
            if (this.attrs.hasOwnProperty(key)) {
                $item.attr(key, this.attrs[key]);
            }
        }
    }

    if (this.style) {
        for (var key in this.style) {
            if (this.style.hasOwnProperty(key)) {
                $item.css(key, this.style[key]);
            }
        }
    }

    $item.data('control', this.getType());

    if (this.isPreview) {
        $item.adorner('formbuilder-editor');

        if (this.field.resizable == undefined || this.field.resizable) {
            $item.resizable({
                grid: 20,
                stop: function (event, ui) {
                    var parentWidth = ui.originalElement.parent().width();
                    var newWidth = ui.size.width;
                    ui.originalElement.css('width', (newWidth / parentWidth) * 100 + '%');
                }
            });
        }
    }

    return $item;
};

control.prototype.updateHtml = function (configs) {
    throw new Error('NotImplemented method');
};
control.prototype.parseFromHtml = function (html) {
    throw new Error('NotImplemented method');
};


var factory = {
    createControl: function (configs) {
        var controlType = (configs.field || { type: 'text' }).type;
        switch (controlType) {
            case 'text':
                return new text(configs);
                break;
            case 'button':
                return new button(configs);
                break;
            case 'hidden':
                return new hidden(configs);
                break;
            default:
                throw new Error('Unknown control type "' + controlType + '"');
        }
    }
};