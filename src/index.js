import createHome from './home.js';
import createMenu from './menu.js';
import createContact from './contact.js';
import './styles.css';

function setActiveButton(button) {
    const buttons = document.querySelectorAll('nav button');
    buttons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
}

function clearContent() {
    const content = document.getElementById('content');
    content.innerHTML = '';
}

function loadPage(pageFunction) {
    clearContent();
    const content = document.getElementById('content');
    content.appendChild(pageFunction());
}

document.addEventListener('DOMContentLoaded', () => {
    // Get all nav buttons
    const homeBtn = document.querySelector('nav button:nth-child(1)');
    const menuBtn = document.querySelector('nav button:nth-child(2)');
    const contactBtn = document.querySelector('nav button:nth-child(3)');

    // Add click event listeners
    homeBtn.addEventListener('click', (e) => {
        setActiveButton(homeBtn);
        loadPage(createHome);
    });

    menuBtn.addEventListener('click', (e) => {
        setActiveButton(menuBtn);
        loadPage(createMenu);
    });

    contactBtn.addEventListener('click', (e) => {
        setActiveButton(contactBtn);
        loadPage(createContact);
    });

    // Load home page by default
    loadPage(createHome);
    setActiveButton(homeBtn);
});