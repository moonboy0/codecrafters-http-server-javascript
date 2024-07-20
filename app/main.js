const net = require("net");

const {Response , Routes} = require("./classess")

const routes = require("./routes");

console.log("server is running !")

const handleRoutes = new Routes(routes)



const server = net.createServer((socket) => {
    const response = new Response()
    //when somebody uses browser or even curl this function gonna get called !
    socket.on("data" , (data) => {
        let dataString = data.toString() 
        const arrayRequest = dataString.split(" ")
        const arrayHeader = dataString.split("\r\n")
        const header = arrayHeader.splice(2 , arrayHeader.length - 1)
        const request = {
            method : arrayRequest[0],
            url : arrayRequest[1],
            HTTPVersion : arrayRequest[2].slice(0,arrayRequest[2].indexOf("\r")),
            headers : {
                userAgent : header.filter(key => key.includes("User-Agent"))[0].split(":")[1]
            }
        }
        console.log(request)
        handleRoutes.validateRoutes(request , response , socket)
    })
  
});

server.listen(4221, "localhost");
