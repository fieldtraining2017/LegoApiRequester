(function(){
    var url_rebrickable = "http://rebrickable.com/api/v3/lego/";
    var fail = function(jqXHR,textStatus,errorThrown ){
        console.log("faild ajax request : " + jqXHR.statusText);
        console.log(jqXHR);
        console.log(textStatus);
        console.log(errorThrown);
    };
    exports.parts = function(key){
        $.ajax({
            url : url_rebrickable + "parts/"
            , settings : {cathe:false}
            , data : "page=1&search=%20"
            , dataType : "jsonp"
            , jsonp : "callback"
        })
        .done(function(data){
            console.log("request ajax done.", data);
        })
        .fail(fail)
        .always();
    };
    exports.basic = function(str){
        return "basic with " + str;
    };
})();