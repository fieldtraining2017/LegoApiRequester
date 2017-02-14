(function(){
    const http = require('http');
    const querystring = require('querystring');

    var host_rebrickable = "rebrickable.com";
    var path_rebrickable = "/api/v3/lego";

    // var fail = function(jqXHR,textStatus,errorThrown ){
    //     console.log("faild ajax request : " + jqXHR.statusText);
    //     console.log(jqXHR);
    //     console.log(textStatus);
    //     console.log(errorThrown);
    // };

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
                    if (res.statusCode == 200){
                        // IncommingMessage에서 body 읽기
                        // http://stackoverflow.com/questions/31006711/get-request-body-from-node-jss-http-incomingmessage
                        var body = "";
                        res.on('readable', function(){
                            body += ((d = res.read()) != null ? d : "");
                        });
                        res.on('end', function() {
                            //console.log(body);
                            resolve({res : res, data : JSON.parse(body)});
                        });
                    } else {
                        reject(res, res.statusCode);
                    }
                });
                // write the request parameters
                //req.write('post=data&is=specified&like=this');
                req.end();
            } catch (err){
                reject(null, err);
            }
        });
    };
    exports.basic = function(str){
        return "basic with " + str;
    };
})();
console.log('done');