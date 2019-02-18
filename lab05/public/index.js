var $ = require('jquery');
$(document).ready(function () {
    let str = "";
    // let getData = new Promise((resolve,reject)=>{
        // console.log($("#list-word").outerHTML());
    $.getJSON("../data/data-raw.json", (data) => {
        for (let i = 0; i < data['data'].length; i++) {
            // $("#list-word").append("<option value='" + data['data'][i]['word'] + "'>");
            str += '<option value = "' + data['data'][i]['word'] + '"/>'
            
        }
        
        var dtl = document.getElementById("list-word");
        dtl.innerHTML=str;
        
    })
})
$(document).on("click" ,"#createData",()=>{
    let arr =[];
    
    $.getJSON("../data/data-raw.json", (data) => {
        for (let i = 0; i < data['data'].length; i++) {
            let search_word = data['data'][i]['word'];
            let obj={};
            let query = "https://api.tracau.vn/WBBcwnwQpV89/s/"+search_word+"/en";
            $.ajax({
                url : query,
                dataType :"json",
                success : (res)=>{
                    obj["en"] = search_word;
                    obj["phonetic"] =res['tratu'][0]["fields"]['fulltext'].split("#9e9e9e")[2].split("<")[0].slice(2);                
                    obj["vi"] =res['tratu'][0]["fields"]['fulltext'].split("tr")[5].split('colspan')[1].split(">")[1].split("<")[0]
                    obj[sound]="https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=gtx&q="+search_word; 
                    arr.push(obj);
                    console.log(obj);
                },
                error : (res)=>{
                alert("fails");
                }
            }) 
        }   
    })
    // console.log(arr);
        // setTimeout(function(){console.log(arr)},5000);
})
$(document).on("click" ,"#sound",()=>{
    var search_word=$("#selected-word").val(); 
    if ( search_word!== "") {
        var audio = document.createElement('audio');
        audio.src = "https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=gtx&q="+search_word;
        audio.play(); 
    }
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
                $("#phonetic").text(res['tratu'][0]["fields"]['fulltext'].split("#9e9e9e")[2].split("<")[0].slice(2));                
                $("#vi").text(res['tratu'][0]["fields"]['fulltext'].split("tr")[5].split('colspan')[1].split(">")[1].split("<")[0])
            },
            error : (res)=>{
                alert("fail");
            }
        })
        
    }
    else alert("Bạn phải nhập từ cần tra");
})