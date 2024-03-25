import create from 'zustand'
import axios from 'axios'

const homeStore = create ((set) => ({
    coins: [],
    query: '',

    setQuery: (e) => {
        set({query: e.target.value})
        homeStore.getState().searchCoins()
    },

    searchCoins: async() => {
        const {query} = homeStore.getState()
        const res = await axios.get(`https://api.coingecko.com/api/v3/search?query=${query}`)
        const coins = res.data.coins.map(coin => {
            return {
                name: coin.name,
                image: coin.large,
                id: coin.id
            }
        })
    set ({coins})
    },

    
    fetchCoins: async () => {
        const res = await axios.get('https://api.coingecko.com/api/v3/search/trending')
        
        const coins = res.data.coins.map(coin => {
            return {
                name: coin.item.name,
                image: coin.item.large, 
                id: coin.item.large,
                priceBtc: coin.item.price_btc,

            }
        })
        set({coins})
        
    }

}))

export default homeStore