import {MongoClient} from 'mongodb';

const conexion = (documento)=>{
    try {
        const url = process.env.MONGO_URI;
        const client = new MongoClient(url);
        const dbName = "apiPersonalizada";
        client.connect();
        const db = client.db(dbName)
        const collection = db.collection(documento)
        return collection
    } catch (error) {
        console.error(error);
    }
}

export default conexion;