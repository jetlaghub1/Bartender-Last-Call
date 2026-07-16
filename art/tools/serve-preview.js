const http=require('http');
const fs=require('fs');
const path=require('path');
const root=path.resolve(__dirname,'../..');
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp'};
http.createServer((request,response)=>{
  const pathname=decodeURIComponent(new URL(request.url,'http://localhost').pathname);
  const requested=pathname==='/'?'index.html':pathname.replace(/^\/+/, '');
  const file=path.resolve(root,requested);
  if(!file.startsWith(root+path.sep)){response.writeHead(403).end('Forbidden');return;}
  fs.readFile(file,(error,data)=>{
    if(error){response.writeHead(404).end('Not found');return;}
    response.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store'}).end(data);
  });
}).listen(41716,'127.0.0.1',()=>console.log('Preview ready at http://127.0.0.1:41716'));
