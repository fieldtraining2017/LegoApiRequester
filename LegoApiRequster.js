'use strict';
(function () {
    var http = require('http');
    var querystring = require('querystring');

    // var fail = function(jqXHR,textStatus,errorThrown ){
    //     console.log('faild ajax request : ' + jqXHR.statusText);
    //     console.log(jqXHR);
    //     console.log(textStatus);
    //     console.log(errorThrown);
    // };

    var rebrickabe_ajax_promise = function (key, path, onResolve) {
        var host_rebrickable = 'rebrickable.com';
        var path_rebrickable = '/api/v3/lego';
        var options = {
            host: host_rebrickable,
            port: '80',
            path: path_rebrickable + path,
            method: 'GET',
            headers: {
                'Authorization': 'key ' + key,
            }
        };
        return new Promise(function (resolve, reject) {
            try {
                var req = http.request(options, function (res) {
                    //console.log(res);
                    if (res.statusCode == 200) {
                        // IncommingMessage에서 body 읽기
                        // http://stackoverflow.com/questions/31006711/get-request-body-from-node-jss-http-incomingmessage
                        var body = '';
                        res.on('readable', function () {
                            var d = res.read();
                            body += (d != null ? d : '');
                        });
                        res.on('end', function () {
                            //console.log(body);
                            resolve(onResolve(res, JSON.parse(body)));
                        });
                    } else {
                        reject({res: res, errorCode: res.statusCode, errorString: getErr(res.statusCode)});
                    }
                });
                // write the request parameters
                //req.write('post=data&is=specified&like=this');
                req.end();
            } catch (err) {
                reject(null, err);
            }
        });
    }

    exports.parts = function (key, query) {
        var assign_helpers = function (obj) {
            if (!obj)
                return;
            obj.page = (obj.page != undefined ? obj.page + 1 : 1);
            obj.list = obj.data.results;
            obj.hasNext = (obj.data.next != null);
            obj.next = function () {
                obj.page += 1;
                var params = {
                    page: obj.page,
                    search: (query ? query : '')
                };
                var path = '/parts/?' + querystring.stringify(params);
                return rebrickabe_ajax_promise(key, path,
                    function (res, data) {
                        return assign_helpers({res: res, data: data});
                    }
                );
            };
            return obj;
        }
        var params = {
            page: 1,
            search: (query ? query : '')
        };
        var path = '/parts/?' + querystring.stringify(params);
        return rebrickabe_ajax_promise(key, path, function (res, data) {
                return assign_helpers({res: res, data: data});
            }
        );
    };

    exports.sets = function (key, query) {
        var assign_helpers = function (obj) {
            if (!obj)
                return;
            obj.page = (obj.page != undefined ? obj.page + 1 : 1);
            obj.list = obj.data.results;
            obj.hasNext = (obj.data.next != null);
            obj.next = function () {
                obj.page += 1;
                var params = {
                    page: obj.page,
                    search: (query ? query : '')
                };
                var path = '/sets/?' + querystring.stringify(params);
                return rebrickabe_ajax_promise(key, path,
                    function (res, data) {
                        return assign_helpers({res: res, data: data});
                    }
                );
            };
            obj.hasPrevious = (obj.data.previous != null);
            obj.previous = function () {
                obj.page -= 1;
                var params = {
                    page: obj.page,
                    search: (query ? query : '')
                };
                var path = '/sets/?' + querystring.stringify(params);
                return rebrickabe_ajax_promise(key, path, function (res, data) {
                        return assign_helpers({res: res, data: data});
                    }
                );
            }
            return obj;
        }
        var params = {
            page: 1,
            search: (query ? query : '')
        };
        var path = '/sets/?' + querystring.stringify(params);
        return rebrickabe_ajax_promise(key, path,
            function (res, data) {
                return assign_helpers({res: res, data: data});
            }
        );
    };

    exports.basic = function (str) {
        return 'basic with ' + str;
    };
})();
