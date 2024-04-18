import create from 'zustand'
import axios from 'axios'

const showStore = create((set) => ({
    res: {}, // Initialisez res avec un objet vide
    query: '',

    setQuery: (e) => {
        // Appeler searchChartData lorsque setQuery est exécuté
        showStore.getState().searchChartData();
    },

    searchChartData: async () => {
        try {
            const res = await axios.get(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=max&interval=daily&precision=10`);
            set({ res });
        } catch (err) {
            console.error('searchChartData() failed the API request', err);
        }
    },

    fetchChartData: async (id) => {
        try {
            const res = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=100&interval=daily&precision=10`);
            set({ res });
        } catch (err) {
            console.error('fetchChartData() failed the API request', err);
        }
    }
}));

export default showStore;