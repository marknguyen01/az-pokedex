import HomepageComponent from '../components/HomepageComponent';
import fetchAPI, {FetchAPIRequest} from '../lib/api';

const Index = ({types}) => (
    <main className="container mx-auto p-2 md:p-4 lg:p-6">
      <HomepageComponent types={types}></HomepageComponent>
    </main>
)


export async function getServerSideProps() {
    const types = await fetchAPI('api/type', FetchAPIRequest.GET);

    return {
        props: {
            types: types
        }
    }
}

export default Index
