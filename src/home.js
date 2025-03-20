function createHome() {
    const content = document.createElement('div');

    // Create headline
    const headline = document.createElement('h2');
    headline.textContent = 'Welcome to La Bella Cucina';

    // Create image
    const image = document.createElement('img');
    image.src = 'https://media.houseandgarden.co.uk/photos/65cf3c130d8fbf991c214666/16:9/w_2240,c_limit/3W1A6821.jpg';
    image.alt = 'Beautiful restaurant interior';

    // Create paragraphs
    const paragraph1 = document.createElement('p');
    paragraph1.textContent = 'Experience the finest Italian dining in the heart of the city. Our award-winning chefs create authentic dishes using only the freshest ingredients imported directly from Italy.';

    const paragraph2 = document.createElement('p');
    paragraph2.textContent = 'Join us for an unforgettable culinary journey in our warm and elegant atmosphere.';

    // Append all elements to content div
    content.appendChild(headline);
    content.appendChild(image);
    content.appendChild(paragraph1);
    content.appendChild(paragraph2);

    return content;
}

export default createHome;