/* Connects a button press to to another HTML id */
$(document).ready(function(){
    function changeDivComponents(tab_element_clicked){
        $(".out").each(function(index){
            let this_id = $(this).attr('id');
            this_id = this.id.split("-");
            this_id = this_id[0];
            if (this_id == tab_element_clicked){
                $(this).show();
            }else{
                $(this).hide();
            }                    
        });
    }
    $(".btn").click(function(){
        changeDivComponents($(this).attr('id'));
    });
});
