

$(function ($) {
    var oldfun = $.fn.adorner;
    $.fn.adorner = function (action) {
        if (oldfun) {
            oldfun.apply(this, [action]);
        }
        if (action === 'formbuilder-editor') {
            var $item = $(this);
            /**
             * <div class="editor-adorn">
                        <button class="editor-btn btn-edit icon icon-pencil" title="编辑"></button>
                        <button class="editor-btn btn-copy icon icon-copy" title="复制"></button>
                        <button class="editor-btn btn-delete icon icon-cancel" title="删除"></button>
                    </div>
             */
            $(this).append(
                '<div class="editor-adorn"><button class="editor-btn btn-edit icon icon-pencil" title="编辑"></button><button class="editor-btn btn-copy icon icon-copy" title="复制"></button><button class="editor-btn btn-delete icon icon-cancel" title="删除"></button></div>'
            );
            $(this).on('click', '.btn-edit', function () {
                var controlType = $item.data('control');
                var editor = $('[data-template="' + controlType + '-popover"]').clone().html();

                $item.popover({
                    html: true,
                    title: '<span class="close pull-right" data-dismiss="popover">&times;</span>输入框属性',
                    content: editor,
                    trigger: 'manual'
                }).on('shown.bs.popover', function () {
                    var $popup = $(this);
                    var $popover = $(this).next('.popover');
                    $popover.find('span.close').click(function (e) {
                        $popup.popover('hide');
                    });

                    var definition = $item.data('definition');
                    var options = {};
                    if (definition) {
                        options = JSON.parse(definition);
                        $popover.find('[data-field]').each(function () {
                            var $field = $(this);
                            var storefield = $field.data('field');
                            var fields = storefield.split(' ');
                            for (var i = 0; i < fields.length; i++) {
                                var field = fields[i];
                                var value = options;
                                value = field.split('-').reduce(function (
                                    obj, currentValue) {
                                    return obj[currentValue];
                                }, value);

                                var inputType = $field.prop('type');
                                if (inputType === 'checkbox' || inputType ===
                                    'radio') {
                                    $field.prop('checked', value);
                                } else {
                                    $field.val(value);
                                }
                            }
                        });
                    }

                    $popover.find('form').on('submit', function () {
                        $popover.find('[data-field]').each(function () {
                            var $field = $(this);
                            var storefield = $field.data('field');
                            var fields = storefield.split(' ');
                            for (var i = 0; i < fields.length; i++) {
                                var field = fields[i];
                                var fieldPaths = field.split('-');
                                var value = options;
                                for (var j = 0; j < fieldPaths.length -
                                    1; j++) {
                                    var path = fieldPaths[j];
                                    value = value[path]
                                    if (!value) {
                                        value[path] = {};
                                    }
                                }

                                var inputType = $field.prop('type');
                                if (inputType === 'checkbox' ||
                                    inputType === 'radio') {
                                    value[fieldPaths[fieldPaths.length -
                                        1]] = $field.prop(
                                            'checked');
                                } else {
                                    value[fieldPaths[fieldPaths.length -
                                        1]] = $field.val();
                                }
                            }

                        });
                        var html = factory.createControl(options).buildHtml();
                        $item.popover('toggle');
                        $item.replaceWith(html);
                        return false;
                    });
                }).on('hidden.bs.popover', function () {
                    $(this).next('.popover').remove();
                });

                $item.popover('toggle');
            }).on('click', '.btn-delete', function () {
                $item.remove();
            }).on('click', '.btn-copy', function () {
                var definition = $item.data('definition');
                var options = {};
                if (definition) {
                    options = JSON.parse(definition);
                }
                var html = factory.createControl(options).buildHtml();
                $item.parent().append(html);
            });
        }
        return this;
    };
}(jQuery));
