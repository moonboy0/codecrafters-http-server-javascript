const fs = require("fs")
const path = require("path")
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
        console.log(request)
        socket.write(`HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nContent-Length: ${request.param[0].length}\r\n\r\n${request.param[0]}`)
        } ,
    method : "GET"
    },

    {
    path : "/user-agent" ,
    execute : (request ,response ,socket) => {
        socket.write(`HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nContent-Length: ${request.headers.userAgent.length }\r\n\r\n${request.headers.userAgent}`)
    } ,
    method : "GET"
    },

    {
    path : "/files/" ,
    execute : (request, response , socket) => {
        const responseText = "you should enter an file name !"
        console.log(request)
        socket.write(`HTTP/1.1 404 Not Found\r\nContent-Type: text/plain\r\nContent-Length: ${responseText.length}\r\n\r\n${responseText}`)
    } ,
    method : "GET"
    },

    {
    path : "/files/{filename}" ,
    execute : (request, response , socket) => {
       
        socket.write(`HTTP/1.1 200 OK\r\nContent-Type: application/octet-stream\r\nContent-Length: ${request.file.length }\r\n\r\n${request.file}`)

        
    } ,
    method : "GET"
    },


    {
    path : "/files/" ,
    execute : (request, response , socket) => {
        const responseText = "you should enter an file name !"
        socket.write(`HTTP/1.1 404 Not Found\r\nContent-Type: text/plain\r\nContent-Length: ${responseText.length}\r\n\r\n${responseText}`)
    } ,
    method : "POST"
    },
    
    {
    path : "/files/{filename}" ,
    execute : (request, response , socket) => {
        const findFile = fs.existsSync(path.join(request.dirr , request.fileName[0]))

        if(findFile) {
            const responseText = "file already exist"
            return socket.write(`HTTP/1.1 400 Request Is Not Valid\r\nContent-Type: text/plain\r\nContent-Length: ${responseText.length}\r\n\r\n${responseText}`)
        }

        const writeFile = fs.writeFileSync(path.join(request.dirr , request.fileName[0]),request.data)
        socket.write("HTTP/1.1 201 Created\r\n\r\n")

    } ,
    method : "POST"
    },


    

   
    
   
]



module.exports = routes

