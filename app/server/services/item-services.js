const axios = require('axios');


const getDecimalsFromPrice = amount => 
  amount % 1 !== 0 ? parseInt(amount.toString().split('.')[1]) : 0;

const getItemListening = async query => {
    try {
        const response = await axios
        .get(`https://api.mercadolibre.com/sites/MLA/search`, {
        params:{q:query, limit: 4}
})
    const items= [];
    response.data.results.forEach((item) => {
      const currentItem = {
          id: item.id,
          title: item.title,
          price: {currency: item.currency_id,
                  amount: Math.trunc(item.price),
                  decimals:getDecimalsFromPrice(item.price)
                },
          picture: item.thumbnail,
          free_shipping: item.shipping.free_shipping,
      }
      items.push(currentItem)
    });
    const listingDto = {
      author: { name: "Luciano", lastname:"Longhi"},
      categories: response.data.results.map(item => item.category_id),
      items
    }
    return listingDto;
    } catch(e){
        console.error(e)
    }
};

const getItem = async id => {
    try {
        const response = await axios.get(`https://api.mercadolibre.com/items/${id}`)
        const itemDto = {
        author: { name: "Luciano", lastname:"Longhi"},
        item : {
            id: response.data.id,
            title: response.data.title,
            price: {currency: response.data.currency_id,
                    amount: Math.trunc(response.data.price),
                    decimals:getDecimalsFromPrice(response.data.price)
                },
            picture: response.data.thumbnail,
            free_shipping: response.data.shipping.free_shipping,
            sold_quantity: response.data.sold_quantity,
            description: 'Description'
            }
        };
        return itemDto;
    } catch(e){
        console.error(e)
    }
};

module.exports = { getItem, getItemListening};
