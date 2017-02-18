var http = require('http');
var express = require('express');
var querystring = require('querystring');
var app = express();

app.get('/parts', function(req, res){
  var host_rebrickable = 'rebrickable.com';
  var path_rebrickable = '/api/v3/lego/parts/?';
  var key_rebrickable = 'McWYsSJnPY';
  var options = {
    host: host_rebrickable,
    port: '80',
    path: path_rebrickable + querystring.stringify({page: req.query.page, search : req.query.search}),
    method: 'GET',
    headers: {
      'Authorization': 'key ' + key_rebrickable
    }
  };

  try {
    var ajax_req = http.request(options, function(ajax_res) {
      if (ajax_res.statusCode == 200){
        // IncommingMessage에서 body 읽기
        // http://stackoverflow.com/questions/31006711/get-request-body-from-node-jss-http-incomingmessage
        var body = '';
        ajax_res.on('readable', function(){
          var d = ajax_res.read();
          body += (d != null ? d : '');
        });
        console.log('read data success');
        ajax_res.on('end', function() {
          //console.log(body);
          res.write(body);
          res.end();
        });
        console.log('send data success');
      } else {

      }
    });
    // write the request parameters
    //req.write('post=data&is=specified&like=this');
    ajax_req.end();
  } catch (err){
    throw err;
  }
});

app.get('/sets', function(req, res){
  var host_rebrickable = 'rebrickable.com';
  var path_rebrickable = '/api/v3/lego/sets/?';
  var key_rebrickable = 'McWYsSJnPY';
  var options = {
    host: host_rebrickable,
    port: '80',
    path: path_rebrickable + querystring.stringify({page: req.query.page, search : req.query.search}),
    method: 'GET',
    headers: {
      'Authorization': 'key ' + key_rebrickable
    }
  };

  try {
    var ajax_req = http.request(options, function(ajax_res) {
      if (ajax_res.statusCode == 200){
        // IncommingMessage에서 body 읽기
        // http://stackoverflow.com/questions/31006711/get-request-body-from-node-jss-http-incomingmessage
        var body = '';
        ajax_res.on('readable', function(){
          var d = ajax_res.read();
          body += (d != null ? d : '');
        });
        ajax_res.on('end', function() {
          //console.log(body);
          res.write(body);
          res.end();
        });
      } else {

      }
    });
    // write the request parameters
    //req.write('post=data&is=specified&like=this');
    ajax_req.end();
  } catch (err){
    throw err;
  }
});

app.listen(1337, function(){
  console.log('Connnected 1337 port!');;
});
