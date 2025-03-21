# Todo App

A todo application built with JavaScript and Webpack. This application allows users to manage their tasks across multiple projects with features like priority levels, due dates, checklists, and more.

## Features

- Create and manage multiple projects
- Add todos with title, description, due date, and priority
- Add notes and checklist items to todos
- Mark todos as complete
- Edit and delete todos
- Persistent storage using localStorage
- Modern, responsive UI
- Priority color coding
- Project-based organization

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/fedesapuppo/TOPtodo-js.git
cd TOPtodo-js
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

4. Open your browser and navigate to `http://localhost:8080`

### Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
todo-app/
├── src/
│   ├── models/         # Data models (Todo, Project)
│   ├── services/       # Services (Storage)
│   ├── ui/            # UI components
│   ├── app.js         # Main application logic
│   ├── index.js       # Entry point
│   ├── index.html     # HTML template
│   └── styles.css     # Global styles
├── webpack.common.js  # Common webpack configuration
├── webpack.dev.js     # Development webpack configuration
├── webpack.prod.js    # Production webpack configuration
└── package.json       # Project dependencies and scripts
```

## Technologies Used

- JavaScript (ES6+)
- Webpack
- CSS3
- date-fns (for date manipulation)
- localStorage (for data persistence)

## License

This project is licensed under the ISC License.
