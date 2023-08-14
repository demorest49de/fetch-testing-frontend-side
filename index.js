"use strict";

// const URL = '';
const URL = 'https://jsonplaceholder.typicode.com/posts';
const postWrapper = document.querySelector('.post-wrapper');

const fetchRequest = async (URL, {
    method = 'GET',
    callback,
    body,
    headers,
}) => {
    try {
        const options = {
            method,
        };
        
        if (body) options.body = JSON.stringify(body);
        if (headers) options.headers = headers;
        
        const response = await fetch(URL, options);
        if (response.ok) {
            const data = await response.json();
            if (callback) return callback(null, data);
        }
        
        throw new Error(`Error: ${response}`);
        
    } catch (error) {
        return callback(new Error(error.message));
    }
};


// правильная функция для работы с запросами - универсальная
// const httpRequest = (url, {
//     method = 'GET',
//     callback,
//     body = {},
//     headers,
// }) => {
//     try {
//         const xhr = new XMLHttpRequest();
//         xhr.open(method, URL);
//         if (headers) {
//             for (const [key, value] of Object.entries(headers)) {
//                 xhr.setRequestHeader(key, value);
//             }
//         }
//
//         xhr.addEventListener('load', () => {
//             if (xhr.status < 200 || xhr.status >= 300) {
//                 callback(new Error(xhr.status), xhr.statusText);
//                 return;
//             }
//             const data = xhr.response;
//             console.log(' : ', callback);
//             if (callback) callback(null, JSON.parse(data));// здесь происходит вызов рендерГудс
//         });
//
//         xhr.addEventListener('error', ({target}) => {
//             console.log(target.status);
//             callback(new Error(xhr.statusText), xhr.responseText);
//         });
//
//         xhr.send(JSON.stringify(body));
//     } catch (error) {
//         callback(new Error(error.message));
//     }
// };


const handleWarnings = (error, data) => {
    const status = data;
    const errorText = `${error.message ? ("Error: " + error.message) : ""}` + (status ? `, ${status}` : '');
    console.warn(' что-то пошло не так. ', errorText);
    alert(` что-то пошло не так. ${errorText}`);
};

const cbGET = (error, data) => {
    if (error) {
        handleWarnings(error, data);
        return false;
    }
    
    const posts = data.map(x => {
        
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
    
    
    postWrapper.style.cssText = `
        margin: 0 auto;
        display:flex;
        flexDirection: row;
        flex-wrap: wrap;
    `;
    
    postWrapper.append(...posts);
    return true;
};

//GET
// const getBtn = document.querySelector('#get');
// getBtn.addEventListener('click', () => {
//     //1 способ
//     // httpRequest(URL, {
//     //     method: 'GET',
//     //     callback: cbGET,
//     // });
//
//     //2 способ
//     fetchRequest(URL, {
//         method: 'GET',
//         callback: cbGET,
//     });
// });


//POST
// const form = document.querySelector('#form');
// form.addEventListener('submit', (e) => {
//     e.preventDefault();//что бы страница не перезагружалась от действий по умолчанию;
//
//     httpRequest(URL, {
//         method: 'POST',
//         callback(error, data) {
//             if (error) {
//                 const errorText = handleWarnings(error, data);
//                 form.textContent = ` что-то пошло не так: ${errorText}`;
//             } else {
//                 console.log(' data from POST method:) ', data);
//                 form.textContent = `заявка принята. ваш номер ${data.id}`;
//             }
//         },
//         body: {
//             title: form.title.value,
//             body: form.description.value
//         },
//         headers: {
//             'Content-type': 'application/json',
//         }
//     });
// });


//Работа с промисами
// const httpRequest = (url, {
//     method = 'GET',
//     callback,
//     body = {},
//     headers,
// }) => {
//     try {
//         const xhr = new XMLHttpRequest();
//         xhr.open(method, URL);
//         if (headers) {
//             for (const [key, value] of Object.entries(headers)) {
//                 xhr.setRequestHeader(key, value);
//             }
//         }
//
//         xhr.addEventListener('load', () => {
//             if (xhr.status < 200 || xhr.status >= 300) {
//                 callback(new Error(xhr.status), xhr.statusText);
//                 return;
//             }
//             const data = xhr.response;
//             console.log(' : ', callback);
//             if (callback) callback(null, JSON.parse(data));// здесь происходит вызов рендерГудс
//         });
//
//         xhr.addEventListener('error', ({target}) => {
//             console.log(target.status);
//             callback(new Error(xhr.statusText), xhr.responseText);
//         });
//
//         xhr.send(JSON.stringify(body));
//     } catch (error) {
//         callback(new Error(error.message));
//     }
// };

const getBtn = document.querySelector('#get');

getBtn.addEventListener('click', async () => {
    //1 способ
    // httpRequest(URL, {
    //     method: 'GET',
    //     callback: cbGET,
    // });
    //get.classlist.add('preloader-class');
    //2 способ
    const result = await fetchRequest(URL, {
        method: 'GET',
        callback: cbGET,
    });
    console.log(result);
    if(result){
        //get.classlist.remove('preloader-class');
    }
});