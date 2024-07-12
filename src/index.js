document.addEventListener('DOMContentLoaded', function(){
    const imgUrl = "https://dog.ceo/api/breeds/image/random/100";
    const breedUrl = "https://dog.ceo/api/breeds/list/all";

    function fetchDogImages() {
        fetch(imgUrl)
            .then(response => response.json())
            .then(data => {
                const imageContainer = document.getElementById('dog-image-container');
                data.message.forEach(imageUrl => {
                    const img = document.createElement('img');
                    img.src = imageUrl;
                    imageContainer.appendChild(img);
                });
            })
            .catch(error => console.error('Error fetching dog images:', error));
    }

    function fetchDogBreeds() {
        fetch(breedUrl)
            .then(response => response.json())
            .then(data => {
                const breedList = document.getElementById('dog-breeds');
                const breeds = data.message;
                for (const breed in breeds) {
                    const li = document.createElement('li');
                    li.textContent = breed;
                    breedList.appendChild(li);
                }
            })
            .catch(error => console.error('Error fetching dog breeds:', error));
    }

    function addBreedClickEvent() {
        const breedList = document.getElementById('dog-breeds');
        breedList.addEventListener('click', function(event) {
            if (event.target.tagName === 'LI') {
                event.target.style.color = 'firebrick';
            }
        });
    }

    function addBreedFilterEvent() {
        const breedDropdown = document.getElementById('breed-dropdown');
        breedDropdown.addEventListener('change', function(event) {
            const selectedLetter = event.target.value;
            const breedList = document.getElementById('dog-breeds');
            const breeds = breedList.getElementsByTagName('li');
            for (let i = 0; i < breeds.length; i++) {
                const breed = breeds[i].textContent;
                if (selectedLetter === 'all' || breed.startsWith(selectedLetter)) {
                    breeds[i].style.display = '';
                } else {
                    breeds[i].style.display = 'none';
                }
            }
        });
    }

    fetchDogImages();
    fetchDogBreeds();
    addBreedClickEvent();
    addBreedFilterEvent();
});
