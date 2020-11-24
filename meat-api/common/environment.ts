export const environment = {
    // configurar a porta da API,  3000 ou a porta e setada
    server: { port: process.env.SERVER_PORT || 3000 },
    db:{url: process.env.DB_URL || 'mongodb+srv://sys:sys@cluster0.crr6g.mongodb.net/RESTAURANT?retryWrites=true&w=majority'},
    security:{saltRounds: process.env.SALT_ROUND || 10}       
}