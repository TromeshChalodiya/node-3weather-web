console.log('This is the client side javascript');

// fetch('http://localhost:3000/weather?address=chicago').then(res => {
//   res.json().then(data => {
//     if (data.error) {
//       console.log(data.error);
//     } else {
//       console.log(data.location);
//       console.log(data.forecast);
//     }
//   });
// });

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', e => {
  e.preventDefault();
  const location = search.value;
  messageOne.textContent = 'Loading....';
  messageTwo.textContent = '';
  fetch(
    'http://localhost:3000/weather?address=' + encodeURIComponent(location),
    {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'text/plain'
      }
    }
  ).then(res => {
    res.json().then(data => {
      if (data.error) {
        console.log(data.error);
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = '';
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
      }
    });
  });
});
