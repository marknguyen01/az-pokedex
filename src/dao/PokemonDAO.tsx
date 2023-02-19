import { Collection, Db } from 'mongodb'

class PokemonDao {
    static collection: Collection<any>;

    constructor(db : Db) {
        PokemonDao.collection = db.collection("pokemon");
    }

    static async createPokemon() {
        const result = await this.collection.insertOne({name: "test"});
    }
}

export default PokemonDao;