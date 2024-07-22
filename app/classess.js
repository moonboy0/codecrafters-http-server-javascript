/**
 * a note for future of myself !
 * u need to add another thing to your routes options and that's method !! 
 * maybe somebody want to have a same route for diffrent methods! 
 * so implment that too ! 
 * 
 * dude it's done ! 
 */

const fs = require("fs")
const path = require("path")
class Routes {
    constructor(routes = []) { 
        if(routes.length < 0) {
            throw new Error('routes are empty!')
        }
        this.routes = routes
    }

    validateRoutes (request , response , socket) {
        const findRoutes = this.routes.find(route => route.path == request.url && route.method == request.method)
        if(!findRoutes) {
            /**
             * checking if the routes is dynamic or not ! 
             */
            
            for(let routeA of this.routes){ 
                if(request.url.includes(routeA.path)) {
                    if(routeA.path == "/") continue;
                    
                    const arrayOfURL = this.routes.filter(route => route.path.includes(routeA.path))
                    if(arrayOfURL.length > 2) throw new Error("you enabled dyanmic and 404 at the same time and that's not possible ! ")

                    if(arrayOfURL[1].path.indexOf("{") != -1) {
                        let paramArray = request.url.split(arrayOfURL[0].path)
                        if(arrayOfURL[1].path.startsWith("/files/")) {
                            if(!request.dirr) {
                                throw new Error("you did'nt give program any dirr for this route ! ")
                            }
                            request.fileName = paramArray.splice(1, paramArray.length - 1)
                           
                            if(!fs.existsSync(path.join(request.dirr , request.fileName[0]))) {
                                const responseText = "can't find the file!"
                                console.log(request)
                                return socket.write(`HTTP/1.1 404 Not Found\r\nContent-Type: text/plain\r\nContent-Length: ${responseText.length}\r\n\r\n${responseText}`)
                            }
                            request.file = fs.readFileSync(path.join(request.dirr , request.fileName[0]) )
                            return arrayOfURL[1].execute(request , response , socket)
                        }
                        request.param = paramArray.splice(1, paramArray.length - 1)
                        return arrayOfURL[1].execute(request , response , socket)
                    } else {
                        return arrayOfURL[1].execute(request , response , socket)
                    }
                }
            }

            const find404 = this.routes.find(route => route.path == "/*")

            return find404.execute(request , response , socket)


        }

        return findRoutes.execute(request,response , socket)
    }

}



class Response {
    
}

module.exports = {
    Response , Routes
}