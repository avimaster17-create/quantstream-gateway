const net = require('net');

const server = net.createServer((socket) => {
    console.log('Client connected!');

    // socket.on('data', (data) => {
    //     console.log("--- RAW INCOMING REQUEST ---");
    //     console.log(data.toString());
        
    //     const httpResponse = "HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\n\r\nQuantStream Gateway is LIVE.";
    //     socket.write(httpResponse);
    //     socket.end(); 
    // });
    socket.on('data', (data) => {
        console.log("--- RAW INCOMING REQUEST ---");
        const requestString = data.toString();
        console.log(requestString);

        if (requestString.startsWith('GET /health')) {
            const successResponse = "HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\n\r\nStatus: Healthy";
            socket.write(successResponse);
            
        } else {
            const notFoundResponse = "HTTP/1.1 404 Not Found\r\nContent-Type: text/plain\r\n\r\nRoute doesn't exist!";
            socket.write(notFoundResponse);
        }
       
        socket.end(); 
    });

    socket.on('end', () => {
        console.log('Client disconnected.');
    });
});


server.listen(8080, () => {
    console.log('QuantStream TCP Gateway listening on port 8080...');
});