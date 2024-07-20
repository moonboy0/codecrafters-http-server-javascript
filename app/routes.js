const routes = [
    {
    path : "/" , 
    execute : (request , response , socket) => {
        socket.write("HTTP/1.1 200 OK\r\n\r\n")
    },
    method : "GET"
    } 
    ,
    {
    path : "/*" , 
    execute : (request , response , socket) => {
        socket.write('HTTP/1.1 404 Not Found\r\n\r\n')
    },
    method : "GET"
    } ,
    {
    path : "/echo/" ,
    execute : (request, response , socket) => {
        socket.write("HTTP/1.1 200 OK\r\n\r\n")
    } ,
    method : "GET"
    },

    {
    path : "/echo/{txt}" ,
    execute : (request, response , socket) => {
        console.log(request.param)
        socket.write(`HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nContent-Length: ${request.param[0].length}\r\n\r\n${request.param[0]}`)
        
        } ,
    method : "GET"
    },

    {
    path : "/user-agent" ,
    execute : (request ,response ,socket) => {
        socket.write(`HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nContent-Length: ${request.headers.userAgent.length - 1}\r\n\r\n${request.headers.userAgent}`)
    } ,
    method : "GET"
    }


    

   
    
   
]



module.exports = routes

