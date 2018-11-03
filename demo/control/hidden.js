function hidden(configs){
    configs = configs || {};
    control.call(this, configs);
}

hidden.prototype = Object.create(control.prototype);
hidden.prototype.constructor = hidden;

hidden.prototype.buildHtml = function(){
    var $item = control.prototype.buildHtml.call(this);
    var $input = $('<input type="hidden"></input>');
    if (this.field.id) {
        $input.prop('id', this.field.id);
    }

    if (this.field.name) {
        $input.prop('name', this.field.name);
    }
    $item.append($input);

    if(this.isPreview){
        var $label = $('<label class="layui-form-label"></label>');
        $label.html('隐藏域 ' + (this.field.name ? this.field.name : ''));
        $item.append($label);
        $item.addClass('hidden-preview');
    }

   
    $item.data('definition', JSON.stringify(this.configs));
    return $item;
};