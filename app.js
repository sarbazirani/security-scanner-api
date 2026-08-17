const http = require("http");
const { json } = require("stream/consumers");
const scans = [];
const server = http.createServer((req, res) => {
  console.log("Method:", req.method);
  console.log("URL:", req.url);
  
  if (req.method==="GET" && req.url === "/") {
    res.end("Home page ");
  } else if (req.method==="GET" && req.url.startsWith("/scans/")) {
    const idScan=Number(req.url.split("/")[2]);
    if(Number.isNaN(idScan)){
      res.statusCode=400;
      res.setHeader("Content-Type","application/json");
      res.end(JSON.stringify({
        "error":"Scans id must be number!"
      }));
      return;     
    }
    const scan = scans.find((item)=>item.id===idScan);
    if(!scan){
      res.statusCode=404;
      res.setHeader("Content-Type","application/json");
      res.end(JSON.stringify({
        "error":"Scans with id "+idScan+ " not found"
      }));
      return;
    }
    res.statusCode=200;
    res.setHeader("Content-Type","application/json");
    res.end(JSON.stringify(scan));
  } else if (req.method==="GET" && req.url === "/scans") {
    res.statusCode=200;
    res.setHeader("Content-Type","application/json");
    res.end(JSON.stringify(scans));
  } else if (req.method==="POST" && req.url === "/scans") {
    let body="";
    req.on("data",(chunk)=>{
      body += chunk.toString();
    });
    req.on("end",()=>{
      console.log("Raw body= ",body);
      try {
        const data = JSON.parse(body);
        if (!data.target || data.target.trim() === "") {
          res.statusCode = 400;
          res.end("Validation Error: 'target' is required and cannot be empty.");
          return; // حتما return می‌کنیم تا ادامه کد اجرا نشود
        }
        const newScan = {
          id: scans.length+1,
          status: "Pending",
          target: data.target,
          createdAt: new Date()
        }
        scans.push(newScan);
        console.log("Target",data.target);
        res.statusCode=201;
        res.setHeader("Content-Type","application/json");
        res.end(JSON.stringify(newScan));
      } catch (e) {
        res.statusCode=400;
        res.end("Bad request"+e.message);        
      }
    });
  } else {
    res.statusCode = 404;
    res.end("not found " + req.url);
  }
});

server.listen(3000, () => {
  console.log("run at 3000");
});
