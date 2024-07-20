const net = require("net");

const {Response , Routes} = require("./classess")

const routes = require("./routes");

console.log("server is running !")

const handleRoutes = new Routes(routes)



const server = net.createServer((socket) => {
    console.log("somebody connected")
    const response = new Response()
    //when somebody uses browser or even curl this function gonna get called !
    socket.on("data" , (data) => {
        let dataString = data.toString() 
        const arrayRequest = dataString.split(" ")
        const request = {
            method : arrayRequest[0],
            url : arrayRequest[1],
        }
        
        handleRoutes.validateRoutes(request , response , socket)
    })
  
});

server.listen(4221, "localhost");
