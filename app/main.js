const net = require("net");

const validRoutes = ["/" , "/amirreza"] 

const server = net.createServer((socket) => {
    console.log("somebody connected")
    socket.on("data" , (data) => {
        let dataString = data.toString() 


        const dataArray = dataString.split(" ")
        const findRoute = validRoutes.indexOf(dataArray[1])
        console.log(findRoute)
        if(findRoute >= 0 ) {
            socket.write("HTTP/1.1 200 OK\r\n\r\n")
        }
        else {
            socket.write("HTTP/1.1 404 Not Found\r\n\r\n")
        } 
    })
  
});

server.listen(4221, "localhost");
