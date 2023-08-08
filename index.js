"use strict";

fetch('db.json');
fetch('http://localhost:3000/api/goods', {
    method: 'POST',
    body: JSON.stringify({
        title: 'mango',
        description: 'mango is tropical fruit',
        category: 'fruit',
        price: 50,
        units: 'piece',
        count: 30
    }),
    headers: {
        'Content-Type': 'application/json'
    }
});

fetch('http://localhost:3000/api/goods');