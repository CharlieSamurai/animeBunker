const headersSpans = document.querySelectorAll('.header-span');

headersSpans?.forEach((spanElement) => {
    spanElement.addEventListener('click', async () => {
        switch(spanElement.innerText) {
            case 'Home': 
                window.location.assign(localAdress);
                break;
            case 'Login':
                window.location.assign(`${localAdress}/user/login`);
                break;
            case 'Register':
                window.location.assign(`${localAdress}/user/register`);
                break;
            case 'Profile':
                window.location.assign(`${localAdress}/user/profile`);
                break;
            case 'Logout':
                const response = await fetch(`${localAdress}/user/logout`, {
                    method: 'DELETE',
                });
                window.location.assign(localAdress);
                break;
        }
    })
});