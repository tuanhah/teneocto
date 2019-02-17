var $ = require('jquery');
$(document).ready(function () {
    let str = "";
    // let getData = new Promise((resolve,reject)=>{
    $.getJSON("../data/data-raw.json", (data) => {
        for (let i = 0; i < data['data'].length; i++) {
            str += '<option value = "' + data['data'][i]['word'] + '"/>'
        }
        $("#list-word").html(str);
    })
})
$(document).on('click', '#search', () => {
    var search_word=$("#selected-word").val(); 
    if ( search_word!== "") {
        $("#en").text(search_word);
        let apiKey="";
        let query = "https://api.tracau.vn/WBBcwnwQpV89/s/"+search_word+"/en";
        $.ajax({
            url : query,
            dataType :"json",
            success : (res)=>{
                console.log(res['tratu'][0]["fields"]['fulltext']);                
            },
            error : (res)=>{
                alert("fail");
            }
        })
    }
    else alert("Bạn phải nhập từ cần tra");
})