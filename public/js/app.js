const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const msgOne = document.querySelector('#msgOne');
const msgTwo = document.querySelector('#msgTwo');

weatherForm.addEventListener('submit', e => {
  e.preventDefault();
  msgOne.textContent = 'Loading...';
  msgTwo.textContent = '';
  const { value: location } = search;

  fetch(`/weather?address=${location}`).then(resp => {
    resp.json().then(data => {
      if (data.error) {
        msgOne.textContent = data.error;
      } else {
        msgOne.textContent = data.location;
        msgTwo.textContent = data.forecast;
      }
    });
  });
});
