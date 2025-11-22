export default () => ({
    database: {
        name: "jsonplaceholder",
        label: "Dev database",
        host: "localhost",
        port: 3306,
        username: "root",
        password: "Janvier1998",
        database: "jsonplaceholder"
    },
    server: {
        name: "Dev server",
        host: "localhost",
        port: "3000"
    },
    jwt: {
        secret: "JWT_SECRET"
    }


})