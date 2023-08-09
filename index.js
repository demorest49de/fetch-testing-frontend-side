"use strict";

//fetch('db.json');
// fetch('http://localhost:3000/api/goods', {
//     method: 'POST',
//     body: JSON.stringify({
//         title: 'mango',
//         description: 'mango is tropical fruit',
//         category: 'fruit',
//         price: 50,
//         units: 'piece',
//         count: 30
//     }),
//     headers: {
//         'Content-Type': 'application/json'
//     }
// });


const loadGoods = async (cb) => {
    const result = await fetch('http://localhost:3000/api/goods');
    const data = await result.json();
    
    console.log(' : ', data);
    cb(data);
    return data;
};

const renderGoods = (data) => {
    
    const cardwrapper = document.createElement('div');
    cardwrapper.classList.add('cards');
    const goods = data.map(item => {
        console.log(' : ', item);
    });
    
    cardwrapper.append(...goods);
};


// console.log(' : ', loadGoods());
const goods = loadGoods(renderGoods);
console.log(' : ', goods);