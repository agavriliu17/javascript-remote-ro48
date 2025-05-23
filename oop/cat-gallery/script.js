// DOM Elements
const catImage = document.getElementById('catImage');
const newCatBtn = document.getElementById('newCatBtn');

// API URL
const API_URL = 'https://api.thecatapi.com/v1/images/search';

// Function to fetch a random cat image
async function fetchRandomCat() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Failed to fetch cat image');
        }

        const data = await response.json();
        catImage.src = data[0].url;
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to load cat image. Please try again.');
    }
}

// Event Listeners
newCatBtn.addEventListener('click', fetchRandomCat);

// Load initial cat image
fetchRandomCat(); 