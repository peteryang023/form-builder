$(function($){
    var oldfun = $.fn.adorner;
    $.fn.adorner = function(action){
        if(oldfun){
            oldfun.apply(this, [action]);
        }
        if(action === 'formbuilder-editor'){
            var container = $(this);
            /**
             * <div class="editor-adorn">
                        <button class="editor-btn btn-edit icon icon-pencil" title="编辑"></button>
                        <button class="editor-btn btn-copy icon icon-copy" title="复制"></button>
                        <button class="editor-btn btn-delete icon icon-cancel" title="删除"></button>
                    </div>
             */
            $(this).append('<div class="editor-adorn"><button class="editor-btn btn-edit icon icon-pencil" title="编辑"></button><button class="editor-btn btn-copy icon icon-copy" title="复制"></button><button class="editor-btn btn-delete icon icon-cancel" title="删除"></button></div>');
            $(this).on('click', '.btn-edit', function(){
                alert('edit');
            }).on('click', '.btn-delete', function(){
                alert('delete');
            }).on('click', '.btn-copy', function(){
               var cloneItem = $(this).parent().parent().clone(true);
               $(this).parent().parent().parent().append(cloneItem);
            });
        }
        return this;
    };
}(jQuery));