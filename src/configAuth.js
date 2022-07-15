module.exports = {

    secret: process.env.AUTH_SECRET || "sebita",
    expires: process.env.AUTH_EXPIRES || "24",
    rounds: process.env.AUTH_ROUNDS || 10,
}