/**
 * a note for future of myself !
 * u need to add another thing to your routes options and that's method !! 
 * maybe somebody want to have a same route for diffrent methods! 
 * so implment that too ! 
 * 
 * dude it's done ! 
 */



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