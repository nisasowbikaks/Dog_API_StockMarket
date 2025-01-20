function goBack() {
    window.history.back();
}

document.addEventListener('DOMContentLoaded', function() {
    const dogDetailsContainer = document.getElementById('dogDetails');
    const dogDetails = JSON.parse(localStorage.getItem('dogDetails'));

    if (dogDetails) {
        const img = document.createElement('img');
        img.src = dogDetails.dogImage;
        img.alt = `Dog ${dogDetails.dogNumber}`;

        const breedInfo = document.createElement('p');
        breedInfo.textContent = `Breed: ${dogDetails.breed}`;

        const ownerInfo = document.createElement('p');
        ownerInfo.textContent = `Owner: ${dogDetails.ownerName}, ${dogDetails.ownerLocation}`;

        const emailInfo = document.createElement('p');
        emailInfo.textContent = `Email: ${dogDetails.ownerEmail}`;

        const adviceInfo = document.createElement('p');
        adviceInfo.textContent = `Gift Advice: ${dogDetails.advice}`;

        dogDetailsContainer.appendChild(img);
        dogDetailsContainer.appendChild(breedInfo);
        dogDetailsContainer.appendChild(ownerInfo);
        dogDetailsContainer.appendChild(emailInfo);
        dogDetailsContainer.appendChild(adviceInfo);
    } else {
        dogDetailsContainer.textContent = 'No details found!';
    }
});
