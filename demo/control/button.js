function button(configs) {
    configs = configs || {};
    control.call(this, configs);
    if(!this.field.text){
        this.field.text = '按钮';
    }
    this.wrap = configs.fieldWrap;
}

button.prototype = Object.create(control.prototype);
button.prototype.constructor = button;

button.prototype.buildHtml = function () {
    var $item = control.prototype.buildHtml.call(this);

    var $input = $('<button></button>');
    
    if (this.field.disabled) {
        $input.prop('disabled', this.field.disabled);
    }

    $input.html(this.field.text);

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