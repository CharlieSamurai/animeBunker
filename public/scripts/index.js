const searchButton = document.querySelector('#throwFetchBtn');
const searchInput = document.querySelector('#throwFetchInp');
const baseApiAdress = 'https://kitsu.io/api/edge';

searchButton?.addEventListener('click', async () => {
    try {
        
        const response = await fetch (`${localAdress}/test`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                input: searchInput.value,
            }),
        });
        const serverResponse = await response.json();
        
        console.log(serverResponse);
        
        
        serverResponse.data.sort(function (a, b) {
            if (a.attributes.popularityRank > b.attributes.popularityRank) {
                return 1;
            }
            if (a.attributes.popularityRank < b.attributes.popularityRank) {
                return -1;
            }
            return 0;
        });

        mainDiv.innerHTML = '';
        
        serverResponse.data.forEach((el) => {
            const newDiv = document.createElement('div');
            const leftDiv = document.createElement('div');
            const rightDiv = document.createElement('div');
            const rightDivP = document.createElement('p');
            const rightDivPp = document.createElement('p');
            const rightDivPpp = document.createElement('p');
            const rightDivPppp = document.createElement('p');
            const rightDivA = document.createElement('a');
            const newImg = document.createElement('img');
            const newButton = document.createElement('button');
            newButton.innerText = 'add to favorites';
            newButton.classList.add('addToFavorite');
            rightDiv.classList.add('rightDivInDiv');
            rightDivA.href = `https://www.google.com/search?q=${el.attributes.canonicalTitle}+anime`;
            rightDivA.target = '_blank';
            rightDivA.innerText = 'Search in Google!';
            rightDivP.innerText = `Title: ${el.attributes.canonicalTitle}`;
            rightDivPp.innerText = `Episodes: ${el.attributes.episodeCount}`;
            rightDivPpp.innerText = `Description: ${el.attributes.description}`;
            rightDivPppp.append(rightDivA);
            rightDiv.append(rightDivP, rightDivPp, rightDivPpp, rightDivPppp);
            newDiv.classList.add('searchedDiv');
            newDiv.append(leftDiv, rightDiv, newButton);
            newImg.style = 'width: 100%; height: 100%'
            newImg.src = el.attributes.posterImage.original;
            leftDiv.append(newImg);
            mainDiv.append(newDiv);
        });
    }
    catch(e) {
        alert(e);
    }
});