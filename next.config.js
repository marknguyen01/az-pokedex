/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    POKEMON_API_URL: 'https://pokeapi.co/api/v2/',
    FAILED_FETCH_MESSAGE: 'Failed to fetch Pokemon API',
  }
}

module.exports = nextConfig
