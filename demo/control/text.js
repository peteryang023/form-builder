function text(configs) {
    configs = configs || {};
    control.call(this, configs);
    this.label = configs.label;
    this.wrap = configs.fieldWrap;
    this.readonly = configs.readonly;
}

text.prototype = Object.create(control.prototype);
text.prototype.constructor = text;

text.prototype.buildHtml = function () {
    var $item = control.prototype.buildHtml.call(this);

    if (this.label) {
        var $label = $('<label></label>');
        $label.prop('for', this.id);
        $label.addClass(this.label.class);
        $label.html(this.label.text);
        $label.appendTo($item);
    }

    var $input = $('<input type="text">');
    if (this.field.required) {
        $input.prop('required', true);
    }

    if (this.field.readonly) {
        $input.prop('readonly', this.field.readonly);
    }

    if (this.wrap) {
        var $div = $('<div></div>');
        if (this.wrap.class) {
            $div.addClass(this.wrap.class);
        }
        $div.append($input);
        $item.append($div);
    } else {
        $item.append($input);
    }

    if (this.field.id) {
        $input.prop('id', this.field.id);
    }

    if (this.field.name) {
        $input.prop('name', this.field.name);
    }

    if (this.field.class) {
        $input.addClass(this.field.class);
    }

    if (this.field.attrs) {
        for (var key in this.field.attrs) {
            if (this.field.attrs.hasOwnProperty(key)) {
                $input.attr(key, this.field.attrs[key]);
            }
        }
    }

    if (this.field.style) {
        for (var key in this.field.style) {
            if (this.field.style.hasOwnProperty(key)) {
                $input.css(key, this.field.style[key]);
            }
        }
    }
    $item.data('definition', JSON.stringify(this.configs));
    return $item;
};
