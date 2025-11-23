export default () => ({
    database: {
        name: "jsonplaceholder",
        label: "Prod database",
        host: "localhost",
        port: 3306,
        username: "root",
        password: "Janvier1998",
    },
    server: {
        name: "Prod Server",
        host: "localhost",
        port: "3000"
    },
    jwt: {
        secret: "e4f1d2c3b5a697887766554433221100ffeeddccbbaa99887766554433221100"
    }
})