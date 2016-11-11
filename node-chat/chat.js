var http=require('http');
//创建服务器
var server=http.createServer(handle);
var fs=require('fs');

var mime=require('mime');

//绑定服务器
var io=require('socket.io')(server);

function handle(req,res){
    console.log(req.url)
    var filePath='';
    if (req.url=="/"){
        filePath="./html/index.html"
    }else{
        filePath="."+req.url
    }
    Static(res,filePath)
}
function Static(res,filePath){
    fs.exists(filePath,function(exist){
        if (exist){
            fs.readFile(filePath,function(err,data){
                if(err){
                    send404(res)
                }

                res.writeHead(200,{
                    'Content-Type':mime.lookup(filePath)
                })
                res.end(data)
            })
        }else{
            send404(res)
        }
    })
}
server.listen(3000,function(){
    console.log('go go go')
});


function send404(res){
    res.writeHead(404,{
        'Content-Type':'text/plain'
    })
    res.end('404, sorry not found')
}

//发送,接收信息
var num=1;
    io.on('connection',function(socket){
        num++;
    //    on 事件名,接受回调
    //    服务端要和客户端一一对应
        socket.on('message',function(data){
            console.log(data.info);
            //    emit 事件名,{发射主体}
            io.sockets.emit('news',{name:'wj',num:num,say:data.info});
        })
    })