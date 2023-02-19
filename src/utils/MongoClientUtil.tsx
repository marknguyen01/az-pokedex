import { MongoClient } from 'mongodb'
import PokemonDAO from '../dao/PokemonDAO'

class MongoClientUtil {
  static PokemonDAO: PokemonDAO;
  constructor() {
    if (!process.env.MONGODB_URI) {
      throw new Error('Please add your Mongo URI to .env.local')
    }
    if (!process.env.MONGODB_DB) {
      throw new Error('Please add your MONGODB DB to .env.local')
    }
  }
  static async connect() {
    const mongoClient = await new MongoClient(`${process.env.MONGODB_URI}`).connect();
    const db = mongoClient.db(`${process.env.MONGODB_DB}`);
    
    this.PokemonDAO = new PokemonDAO(db);
  }
}

export default MongoClientUtil;