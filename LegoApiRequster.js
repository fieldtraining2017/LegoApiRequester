(function(){
    const host_rebrickable = "rebrickable.com";
    const path_rebrickable = "/api/v3/lego";
    var http = require('http');

    var fail = function(jqXHR,textStatus,errorThrown ){
        console.log("faild ajax request : " + jqXHR.statusText);
        console.log(jqXHR);
        console.log(textStatus);
        console.log(errorThrown);
    };

    exports.parts = function(key){
        var options = {
            host: host_rebrickable,
            port: '80',
            path: path_rebrickable + "/parts/" + "?page=1&search=%20",
            method: 'GET',
            headers: {
                'Authorization': 'key ' + key,
            }
        };
        return new Promise(function (resolve, reject) {
            try {
                var req = http.request(options, function(res) {
                    //console.log(res);
                    resolve(res);
                });
                // write the request parameters
                //req.write('post=data&is=specified&like=this');
                req.end();
            } catch (err){
                reject(err);
            }
        });
    };
    exports.basic = function(str){
        return "basic with " + str;
    };
})();
console.log('done');