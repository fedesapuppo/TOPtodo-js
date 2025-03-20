function createContact() {
    const content = document.createElement('div');

    const headline = document.createElement('h2');
    headline.textContent = 'Contact Us';

    const info = document.createElement('div');
    info.innerHTML = `
        <p>📍 123 Pasta Street, Foodville, FC 12345</p>
        <p>📞 (555) 123-4567</p>
        <p>📧 info@labellacucina.com</p>
        <p>🕒 Open Tuesday - Sunday</p>
        <p>Lunch: 11:30 AM - 2:30 PM</p>
        <p>Dinner: 5:30 PM - 10:00 PM</p>
    `;

    content.appendChild(headline);
    content.appendChild(info);

    return content;
}

export default createContact;