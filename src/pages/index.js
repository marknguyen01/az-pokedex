import mongooseClient from '@/lib/mongooseClient';
import Pokemon from '../models/Pokemon';
import Type from '../models/Type';
import HomepageComponent from '../components/HomepageComponent';


const Index = ({pokemonList, typeList}) => (
    <main className="container mx-auto p-2 md:p-4 lg:p-6">
      <HomepageComponent pokemons={pokemonList} types={typeList}></HomepageComponent>
    </main>
)


export async function getServerSideProps() {
    await mongooseClient();
    const pokemonList = await Pokemon.find({});
    const typeList = await Type.find({
        $and: [
            {_id: {$ne: 10001}},
            {_id: {$ne: 10002}},
        ]
    })
  
    pokemonList.sort((a, b) => a.id - b.id);
    typeList.sort((a, b) => a.id - b.id);

    return {
        props: {
            pokemonList: JSON.stringify(pokemonList),
            typeList: JSON.stringify(typeList)
        }
    }
}

export default Index
