const removeFromFav = document.querySelectorAll('.removeFromFavorite');

removeFromFav?.forEach((a) => {
    a?.addEventListener('click', async (e) => {
        const motherDiv = e.target.closest('.inFavorite');
        const response = await fetch(`${localAdress}/anime/${motherDiv.id}`, {method: 'DELETE'});
        motherDiv.classList.remove('inFavorite');
        e.target.remove();
    })
})