"use strict";

const URL = 'https://jsonplaceholder.typicode.com/posts';
const postWrapper = document.querySelector('.post-wrapper');

// правильная функция для работы с запросами - универсальная
const httpRequest = (url, {
    method = 'GET',
    callback,
    body = {},
    headers,
}) => {
    try {
        const xhr = new XMLHttpRequest();
        xhr.open(method, URL);
        if (headers) {
            for (const [key, value] of Object.entries(headers)) {
                xhr.setRequestHeader(key, value);
            }
        }
        
        xhr.addEventListener('load', () => {
            if (xhr.status < 200 || xhr.status >= 300) {
                callback(new Error(xhr.status), xhr.statusText);
                return;
            }
            const data = xhr.response;
            console.log(' : ', callback);
            if (callback) callback(null, data);// здесь происходит вызов рендерГудс
        });
        
        xhr.addEventListener('error', () => {
            console.log('error',);
            callback(new Error(xhr.status), xhr.response);
        });
        
        xhr.send(JSON.stringify(body));
    } catch (error) {
        callback(new Error(error));
    }
};

const cbGET = (error, data) => {
    if (error) {
        const status = data;
        const checkedStatus = status ? `, ${status}` : '';
        console.warn(' что-то пошло не так: ', error,checkedStatus);
        alert(` что-то пошло не так: ${error}${checkedStatus}`);
        return;
    }
    
    const posts = JSON.parse(data).map(x => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
           <h2>Title: ${x.title}</h2>
           <p>Text: ${x.body}</p>
        `;
        card.style.cssText = `
           border: 1px solid black;
           max-width: 250px;
        `;
        return card;
    });
    console.log(posts);
    postWrapper.style.cssText = `
        margin: 0 auto;
        display:flex;
        flexDirection: row;
        flex-wrap: wrap;
    `;
    postWrapper.append(...posts);
};

//GET
const getBtn = document.querySelector('#get');
getBtn.addEventListener('click', () => {
    httpRequest(URL, {
        method: 'GET',
        callback: cbGET,
    });
});


//POST
const form = document.querySelector('#form');
form.addEventListener('submit', (e) => {
    e.preventDefault();//что бы страница не перезагружалась от действий по умолчанию;
    
    httpRequest(URL, {
        method: 'POST',
        callback(error, data) {
            if (error) {
                const status = data;
                const checkedStatus = status ? `, ${status}` : '';
                console.warn(' что-то пошло не так: ', error,checkedStatus);
                alert(` что-то пошло не так: ${error}${checkedStatus}`);
                form.textContent = ` что-то пошло не так: ${error}`;
            } else {
                console.log(' data from POST method:) ', data);
                form.textContent = `заявка принята. ваш номер ${JSON.parse(data).id}`;
            }
        },
        body: {
            title: form.title.value,
            body: form.description.value
        },
        headers: {
            'Content-type': 'application/json',
        }
    });
});