module.exports = {
    cache: {
        server: 'local-cache.textransfer.tech',
        port: '6379',
    },
    db: {
        database: 'app',
        username: 'root',
        password: 'root',
        host: 'local-database.textransfer.tech',
        port: '3306',
        dialect: 'mysql',
        pool: {
            max: 10,
            min: 0,
            idle: 10000
        },
        query: {
            raw: true
        },
    }
}