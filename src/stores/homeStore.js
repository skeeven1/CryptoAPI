import create from 'zustand';
import axios from 'axios'; 
import debounce from '../helpers/debounce'; 

// état initial de la crypto et barre
const homeStore = create((set, get) => ({
    coins: [], 
    query: '', 

    // fonctionnement de la barre
    setQuery: (e) => {
        const newQuery = e.target.value; // lorsqu'on écrit dans la barre
        set({ query: newQuery }); // mise à jour de l'état 
        if (newQuery.trim() === '') {
            get().fetchCoins(); // pas de requête = cryptomonnaies tendance
        } else {
            get().searchCoins(); // cherche les crypto saisie
        }
    },

    // fonction qui limite les rêquêtes api
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

    // fonction cryptomonnaies tendance
    fetchCoins: async () => {
        const res = await axios.get('https://api.coingecko.com/api/v3/search/trending'); 
        const coins = res.data.coins.map(coin => ({
            name: coin.item.name, 
            image: coin.item.large, 
            id: coin.item.id, 
            priceBtc: coin.item.price_btc, 
        }));
        set({ coins }); // mise à jour avec les données récupérées
    }
}));

export default homeStore; 
