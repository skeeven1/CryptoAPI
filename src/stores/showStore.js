import create from 'zustand';
import axios from 'axios';

const showStore = create((set, get) => ({
    res: {}, 
    query: '',
    cache: {},

    setQuery: (e) => {
        showStore.getState().searchChartData();
    },

    searchChartData: async () => {
        // We use cache there because we don't want to reach the API request limit in a few clicks !
        const { cache } = get();
        const cacheKey = 'bitcoin-max-daily';

        if (cache[cacheKey]) {
            set({ res: cache[cacheKey] });
            return;
        }
        
        try {
            const res = await axios.get(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=max&interval=daily&precision=10`);
            cache[cacheKey] = res; // Cache update
            set({ res });
        } catch (err) {
            console.error('searchChartData() failed the API request', err);
        }
    },
    // This is for the dropdown list containing 'default' cryptos
    fetchChartData: async (id) => {
        const { cache } = get();
        const cacheKey = `${id}-100-daily`;

        if (cache[cacheKey]) {
            set({ res: cache[cacheKey] });
            return;
        }

        try {
            const res = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=100&interval=daily&precision=10`);
            cache[cacheKey] = res; // Cache update
            set({ res });
        } catch (err) {
            console.error('fetchChartData() failed the API request', err);
        }
    }
}));

export default showStore;
