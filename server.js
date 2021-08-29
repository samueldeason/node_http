

const http = require("http")


http
    .createServer((request, response) => {
        const { url, method } = request;

        const chunks = [];

        request.on("error", (error) => {
            response.statusCode = 400;
            response.setHeader("Content-Type", "application/json");
            response.write(JSON.stringify(error));
            response.end();
        })
        .on("data", (chunk) => {
            chunks.push(chunk);
        })
        .on("end", () => {
            console.log(chunks)

            const body = Buffer.concat(chunks).toString()

            const responseBody = {
                url,
                method,
                body,
            }

            response.on("error", (error) => {
                response.statusCode = 500;
                response.setHeader("Content-Type", "application/json");
                response.write(JSON.stringify(error));
                response.end();
            })
        

            switch(url){

                case "/":
                    response.setHeader("Content-Type", "text/html")
                    response.write("<h1 style='text-align: center; background-color: blue;'>Hello Wolrd!!</h1>")
                    break;

                case "/about":
                    const samuel = {
                        name: "samuel",
                        city: "Trussville",
                    }
                    response.setHeader("Content-Type", "application/json");
                    response.write(JSON.stringify(samuel))
                    break;

                case "/echo":
                    response.setHeader("Content-Type", "application/json");
                    response.write(JSON.stringify(responseBody))
                    break;

                default:
                    response.setHeader("Content-Type", "text/html")
                    response.write("<h1 style='text-align: center; background-color: blue;'>404 NOT FOUND! <a href='http://localhost:3000'>Home</a> </h1>")
            }
            
            return response.end()
        });
    })
    .listen(3000, () => console.log("Server is listening..."))