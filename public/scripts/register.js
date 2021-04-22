const regName = document.querySelector('#reg-inp-name');
const regPassword = document.querySelector('#reg-inp-password');
const regButton = document.querySelector('#reg-button');

regButton?.addEventListener('click', async () => {
    const response = await fetch(`${localAdress}/user/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: regName.value,
            password: regPassword.value
        }),
    })
    window.location.assign(localAdress);
});