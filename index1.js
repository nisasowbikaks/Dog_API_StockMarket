const breedSelect = document.getElementById('breed');
const numDogsInput = document.getElementById('numDogs');
const generateBtn = document.getElementById('generateBtn');
const dogContainer = document.getElementById('dogContainer');
axios.get('https://dog.ceo/api/breeds/list/all')
    .then(function(response) {
        const breeds = Object.keys(response.data.message);
        breeds.forEach(function(breed) {
            const option = document.createElement('option');
            option.value = breed;
            option.textContent = breed;
            breedSelect.appendChild(option);
        });
    })
    .catch(function(error) {
        console.error('Error fetching breeds:', error);
    });
generateBtn.onclick = function() {
    const breed = breedSelect.value;
    const numDogs = parseInt(numDogsInput.value);

    if (!breed || isNaN(numDogs) || numDogs <= 0) {
        alert('Please select a breed and enter a valid number of dogs.');
        return;
    }

    dogContainer.innerHTML = ''; 

    const dogPromises = Array.from({ length: numDogs }, function() {
        return axios.get(`https://dog.ceo/api/breed/${breed}/images/random`);
    });

    Promise.all(dogPromises)
        .then(function(responses) {
            responses.forEach(function(response, index) {
                const dogDiv = document.createElement('div');
                dogDiv.className = 'dog-card';

                const img = document.createElement('img');
                img.src = response.data.message;
                img.alt = `${breed} Dog ${index + 1}`;

                const dogDetails = document.createElement('p');
                dogDetails.textContent = `Breed: ${breed}, Dog ${index + 1}`;

                const buyButton = document.createElement('button');
                buyButton.textContent = 'Buy the Dog';
                buyButton.onclick = function() {
                    buyDog(breed, index + 1, response.data.message);
                };

                dogDiv.appendChild(img);
                dogDiv.appendChild(dogDetails);
                dogDiv.appendChild(buyButton);
                dogContainer.appendChild(dogDiv);
            });
        })
        .catch(function(error) {
            console.error('Error fetching dog images:', error);
        });
};
function buyDog(breed, dogNumber, dogImage) {
    Promise.all([
        axios.get('https://api.adviceslip.com/advice'),
        axios.get('https://randomuser.me/api/')
    ])
        .then(function(responses) {
            const advice = responses[0].data.slip.advice;
            const user = responses[1].data.results[0];
            const dogDetails = {
                breed,
                dogNumber,
                dogImage,
                advice,
                ownerName: `${user.name.first} ${user.name.last}`,
                ownerEmail: user.email,
                ownerLocation: `${user.location.city}, ${user.location.country}`
            };

            localStorage.setItem('dogDetails', JSON.stringify(dogDetails));
            window.location.href = 'details.html';
        })
        .catch(function(error) {
            console.error('Error fetching details:', error);
        });
}
