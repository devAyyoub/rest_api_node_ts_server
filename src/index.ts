import server from "./server";

// Routing

server.get('/', (req, res) => {
    const auth = true
    res.send(auth)
})

server.listen(4000, () => {
    console.log(`REST API en el puerto 4000`);
    
})