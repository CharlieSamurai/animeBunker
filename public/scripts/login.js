const logName = document.querySelector('#log-inp-name');
const logPassword = document.querySelector('#log-inp-password');
const logButton = document.querySelector('#log-button');

logButton?.addEventListener('click', async () => {
    const response = await fetch(`${localAdress}/user/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: logName.value,
            password: logPassword.value
        }),
    })
    window.location.assign(localAdress);
});