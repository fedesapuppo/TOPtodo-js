function createMenu() {
    const content = document.createElement('div');

    const headline = document.createElement('h2');
    headline.textContent = 'Our Menu';

    const menuItems = document.createElement('div');
    menuItems.classList.add('menu-items');

    const pasta = document.createElement('div');
    pasta.classList.add('menu-item');
    pasta.innerHTML = `
        <h3>Pasta alla Carbonara</h3>
        <p>Classic Roman pasta with eggs, pecorino cheese, guanciale, and black pepper</p>
        <span class="price">$18</span>
    `;

    const pizza = document.createElement('div');
    pizza.classList.add('menu-item');
    pizza.innerHTML = `
        <h3>Margherita Pizza</h3>
        <p>San Marzano tomatoes, fresh mozzarella, basil, and extra virgin olive oil</p>
        <span class="price">$16</span>
    `;

    menuItems.appendChild(pasta);
    menuItems.appendChild(pizza);
    content.appendChild(headline);
    content.appendChild(menuItems);

    return content;
}

export default createMenu;