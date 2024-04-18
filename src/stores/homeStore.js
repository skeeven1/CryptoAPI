import create from 'zustand';
import axios from 'axios';
import debounce from '../helpers/debounce';

const homeStore = create((set, get) => ({
    coins: [],
    query: '',

    setQuery: (e) => {
        const newQuery = e.target.value;
        set({ query: newQuery });
        if (newQuery.trim() === '') {
            get().fetchCoins(); 
        } else {
            get().searchCoins(); 
        }
    },

    searchCoins: debounce(async () => {
        const query = get().query;
        if (query.trim() === '') {
            return; 
        }
        const res = await axios.get(`https://api.coingecko.com/api/v3/search?query=${query}`);
        const coins = res.data.coins.map(coin => ({
            name: coin.name,
            image: coin.large,
            id: coin.id
        }));
        set({ coins });
    }, 500),

    fetchCoins: async () => {
        const res = await axios.get('https://api.coingecko.com/api/v3/search/trending');
        const coins = res.data.coins.map(coin => ({
            name: coin.item.name,
            image: coin.item.large, 
            id: coin.item.id,
            priceBtc: coin.item.price_btc,
        }));
        set({ coins });
    }
}));

export default homeStore;
