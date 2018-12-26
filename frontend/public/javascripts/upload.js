$(document).ready(function(){
    

    var old=[];
    $.ajax({
                    type :"post",
                    url : "/get-data",
                    // dataType : false,
                    contentType : "application/json",
                    // cache : false,
                    success :function(data){
                        // createTable(data);
                        createTableWithoutDataTable(data);

                        addOld(data);
                    }
    });
        


    $("#submitForm").click(function(){
                
        if (checkData()){
            var img="";
            base64( $('#image'), function(data){
                img = data.base64;
                
        
                let req_data ={
                    "category" : $("#category").val(),
                    "name"  : $("#name").val(),
                    "price" : $("#price").val(),
                    "description" : $("#description").val(),
                    "image" : img,
                }
            
                if (check_sqli(req_data)){
                $.ajax({
                        type :"post",
                        url : "/upload",
                    // dataType : false,
                        contentType : "application/json",
                    // cache : false,
                        data : JSON.stringify(req_data),
                    // processData:false,
                        beforeSend: function(){
                            alert("Upload");
                        },
                        success : function(data){
                        // createTable(data);
                            createTableWithoutDataTable(data);
                            old=[];
                            addOld(data);  
                            clear_data();   
                        }

                    })
                }
                else{
                    $("#checkform").text("String must not contains ' or ` or "+'"');
                }
            })
        
        };
    });

    $(document).on('click','.btn-delete',function(){
        if(confirm("Are you sure you want to edit this?")){
            var id_text = $(this).prop("id").split("-");
            let data = {
                id : id_text[2],
            }
            $.ajax({
                        type :"post",
                        url : "/delete",
                    // dataType : false,
                        contentType : "application/json",
                        data : JSON.stringify(data),
                    // cache : false,
                        success :function(data){
                        // createTable(data);
                            createTableWithoutDataTable(data);
                            old=[];
                            addOld(data);
                        }
            });
        }

    });


    $(document).on('click','.btn-cancel',function(){
        var id_text = $(this).prop("id").split("-");
        var id = id_text[2];
        var edit_button =`<button class="btn btn-info btn-sm btn-edit btn-table" id = "edit-button-`+id+`">Edit</button>`;
        var delete_button = `<button class="btn btn-danger btn-sm btn-delete btn-table" id = "delete-button-`+id+`">Delete</button>`        
        var row_id = "#td-btn-"+id;
        $(this).remove();
        var id_save_button = "#save-button-"+id;
        $(id_save_button).remove();
        $(row_id).append(edit_button);
        $(row_id).append(delete_button);
        var image = "#image-"+id;

        var name = "#textarea-table-name-"+id;
        var category = "#textarea-table-category-"+id;
        var price = "#textarea-table-price-"+id;
        var description = "#textarea-table-description-"+id;
        for (var old_value of old){
            if (old_value.id == id) {
                $(name).val(old_value.name).attr('readonly', 'true');
                $(category).val(old_value.category).attr('readonly', 'true');
                $(price).val(old_value.price).attr('readonly', 'true');
                $(description).val(old_value.description).attr('readonly', 'true');
                if ($(image).length) { 
                    $(image).removeClass('img-can-edit');
                }
                else {
                    let row_img_id = "#td-img-"+id;
                    var img_table = "#img-table-"+id;
                    $(img_table).remove();
                    var new_img=`<img class="image-table" id = "image-`+id+`"src="data:image/png;base64,`+old_value.image+`" `+`style="height:100px;width:180px;"/>`;
                    $(row_img_id).append(new_img);
                }
                

            }
        }
 
    })

    $(document).on("click",'.btn-save',function(){
        var id_text = $(this).prop("id").split("-");
        var id = id_text[2];
        var edit_button =`<button class="btn btn-info btn-sm btn-edit btn-table" id = "edit-button-`+id+`">Edit</button>`;
        var delete_button = `<button class="btn btn-danger btn-sm btn-delete btn-table" id = "delete-button-`+id+`">Delete</button>`        
        var row_id = "#td-btn-"+id;
        $(this).remove();
        var id_cancel_button = "#cancel-button-"+id;
        $(id_cancel_button).remove();
        $(row_id).append(edit_button);
        $(row_id).append(delete_button);
        var name = "#textarea-table-name-"+id;
        var category = "#textarea-table-category-"+id;
        var price = "#textarea-table-price-"+id;
        var description = "#textarea-table-description-"+id;
        var image = "#img-table-"+id;
        // console.log($(category).html());
        var img = "";
        if (!$(image).length) {
            let req_data ={
                "category" : $(category).val(),
                "name"  : $(name).val(),
                "price" : $(price).val(),
                "description" : $(description).val(),
                "id"    : id,
                // "image" : img,
            }
        // console.log(data);
            if (check_sqli(req_data)){
                $.ajax({
                    url: '/update',
                    type: 'post',
                    contentType : "application/json",
                    data : JSON.stringify(req_data),
                    // cache : false,
                    success :function(data){
                        // createTable(data);
                        createTableWithoutDataTable(data);
                        old=[];
                        addOld(data);
                    }
                })
            }
            else{
                // $("#checkform").text("String must not contains ' or ` or "+'"');
                alert("String must not contains ' or ` or "+'"!!!');
                

            }
        }
        else {

            base64( $(image), function(data){
                    img = data.base64;
            

                let req_data ={
                    "category" : $(category).val(),
                    "name"  : $(name).val(),
                    "price" : $(price).val(),
                    "description" : $(description).val(),
                    "id"    : id,
                    "image" : img,
                }
        // console.log(data);

                $.ajax({
                    url: '/update',
                    type: 'post',
                    contentType : "application/json",
                    data : JSON.stringify(req_data),
                    // cache : false,
                    success :function(data){
                        // createTable(data);
                        createTableWithoutDataTable(data);
                        old=[];
                        addOld(data);
                    }
                })
            });
        } 
    });


    $(document).on("click",'.btn-edit',function() {
        if(confirm("Are you sure you want to edit this?")){
            var id_text = $(this).prop("id").split("-");
        
            var id = id_text[2];
            var id_delete_button = "#delete-button-"+id;
        
            $(id_delete_button).remove();
            $(this).remove();
            var name = "#textarea-table-name-"+id;
            var category = "#textarea-table-category-"+id;
            var price = "#textarea-table-price-"+id;
            var description = "#textarea-table-description-"+id;
            var image = "#image-"+id;
            $(name).removeAttr('readonly');
            $(category).removeAttr('readonly');
            $(price).removeAttr('readonly');
            $(description).removeAttr('readonly');

            $(image).addClass('img-can-edit');
        
            var save_button = `<button class="btn btn-success btn-sm btn-save btn-table" id = "save-button-`+id+`">Save</button>`;
            var cancel_button = `<button class="btn btn-secondary btn-sm btn-cancel btn-table" id = "cancel-button-`+id+`">Cancel</button>`;
            var row_id = "#td-btn-"+id;
            $(row_id).append(save_button);
            $(row_id).append(cancel_button);
        }


        

    });

    $(document).on("click",'.img-can-edit',function(){
        var id_text = $(this).prop("id").split("-");
        var id =id_text[1];
        $(this).remove();
        var choosen_img = `<input type="file" class="form-control-file" id ="img-table-`+id+`">`;
        var row_id = "#td-img-"+id;
        $(row_id).append(choosen_img);
    })


    function addOld(data){
        for (var j of data)
        {
            let item = 
            {
                "id" :j.id,
                "name" : j.name,
                "category" : j.category,
                "price"     : j.price,
                "image" : j.image,
                "description": j.description, 
            }
            old.push(item);
        }

    }




    function checkData(){
        // var lbl_error = document.getElementById("checkform");
        
        if (!$("#image").val()) {
            $("#checkform").text("Image must be choosen!");
            return false;
        }
        if (!$("#name").val()) {
            $("#checkform").text("Name must be filled!");
            return false;
        }
        if (!$("#price").val()) {
            $("#checkform").text("Price must be filled!");
            return false;
        }
        if (!$("#description").val()) {
            $("#checkform").text("Description must be filled!");
            return false;
        }
        return true;
    };
    function base64(file, callback){
        var coolFile = {};
        function readerOnload(e){
          var base64 = btoa(e.target.result);
          coolFile.base64 = base64;
          callback(coolFile)
        };
      
        var reader = new FileReader();
        reader.onload = readerOnload;
      
        var file = file[0].files[0];
        coolFile.filetype = file.type;
        coolFile.size = file.size;
        coolFile.filename = file.name;
        reader.readAsBinaryString(file);
    };
    function createTableWithoutDataTable(data){
        $("#table-body").html('');
        $.each(data,function(index, item) {
            var id = parseInt(index,10)+1;
            var new_row = `<tr id = `+item.id+`><td>`+id +`</td>`+`<td><textarea readonly id = "textarea-table-name-`+item.id+`">`+item.name+`</textarea></td><td><textarea readonly id = "textarea-table-category-`+item.id+`">`+item.category+`</textarea></td><td><textarea readonly id = "textarea-table-price-`+item.id+`">`+
            item.price+`</textarea></td><td><textarea readonly id = "textarea-table-description-`+item.id+`">`+item.description+
            `</textarea></td><td id ="td-img-`+item.id+`"><img class="image-table" id = "image-`+item.id+`"src="data:image/png;base64,`+item.image+`" `+`style="height:100px;width:180px;"/></td>`
            +`<td id ="td-btn-`+item.id+`"><button class="btn btn-info btn-sm btn-edit btn-table" id = "edit-button-`+item.id+`">Edit</button>`+
            `<button class="btn btn-danger btn-sm btn-delete btn-table" id = "delete-button-`+item.id+`">Delete</button>`+`</td></tr>`;
            $("#table").append(new_row);
        });
    }

    function clear_data(){
        $('.form-control').val('');
    }

    function check_sqli(data){
        if (data.name.includes("'") || data.name.includes('"') || data.name.includes("`")) {
            return false;
        }
        if (data.category.includes("'") || data.category.includes('"') || data.category.includes("`")) {
            return false;
        }
        if (data.price.includes("'") || data.price.includes('"') || data.price.includes("`")) {
            return false;
        }
        if (data.description.includes("'") || data.description.includes('"') || data.description.includes("`")) {
            return false;
        }
        return true;
    }


    function createTable(data){
        var count=-1;
        $("#table-data").DataTable({
            data : data,
            destroy: true,
            columns :[
                    { data: 'name' ,  title : 'name',},
                    { data: 'category',title : 'category', },
                    { data: 'price',title : 'price', },
                    { data: 'description',title : 'description', },
                    { 
                        data: 'image',
                        title : 'image',
                       'render': function (src, type, full, meta) {
                            if (count < data.length -1 ) count++;
                        // console.log(data.length);
                        // console.log(count);

                            return '<img src="data:image/png;base64,'+data[count].image+ `"`+`style="height:100px;width:180px;"/>'`;
                        }
                    },
                    {
                        title : '',
                        'render':function(data,type,full){
                            return '<span style="padding-right:1rem;"><button class="btn btn-info btn-sm" id = "edit-button">Edit</button></span>'+'<button class="btn btn-danger btn-sm" id = "delete-button">Delete</button>';
                        }
                    }, 
                
            ],

        })




    };
    
});