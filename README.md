# Secured Flixx Movie App 🍿

Cloned and improved Flixx, a movie search and rating website; the original site is from Brad Traversy, and is used as a tool to teach students. Accordingly, the original application had a security vulnerability that exposed API credentials to network clients. This project aims to fix the vulnerability by creating a backend server, and improving the client applications request code. You can view the server code [here](https://github.com/fidotheprince/flixx-api), that will act as a proxy to the original API. The backend server will be responsible for making requests to the original API and returning the data to the client. The client will make requests to the backend server instead of the original API.

# Swapped Client API API Requests to Backend Server

```js
const generateBaseUrl = () => {
    return 'https://flixx-api-4ea54960865d.herokuapp.com/'
}

const fetchFromTMBD = async (endpoint) => {
    showSpinner(); 
    const baseUrl = generateBaseUrl();
    const url = `${baseUrl}resource/${endpoint}`;
    const resp = await fetch(url)
    const data = await resp.json();
    hideSpinner();
    return data;

};

const fetchDetailsFromTMBD = async (endpoint, id) => {
    const baseUrl = generateBaseUrl();
    const url = `${baseUrl}details/${endpoint}/${id}`;
    const resp = await fetch(url)
    const data = await resp.json();

    return data;
}

const searchFromTMBD = async (type, searchTerm, page) => {    
    if (!page) {
        page = 1;
    }

    const baseUrl = generateBaseUrl();
    const url = `${baseUrl}search/${type}?query=${searchTerm}&page=${page}`;
    const resp = await fetch(url)
    const data = await resp.json();

    return data;
};
```

# Addition Features and Improvements

- Mimicked React Component Pattern, and organization structure with Vanilla JS. This pattern and structure will make it easier to add new features and maintain the codebase.
    ![Component Folder Structure](./documents/Screenshot%202024-05-02%20at%204.49.52%20PM.png)

- Added `/utilities` folder to store utility functions.

# Installation

Follow these steps to run this project on your local machine:

1. Clone the repository to your local machine. You can do this by running the following command in your terminal:

```bash
git clone <repository-url>
```

Replace `<repository-url>` with the URL of this repository. If you're not sure what the URL is, you can find it by clicking the 'Code' button on the repository page.

2. Navigate to the project directory:

```bash
cd <project-directory>
```

Replace `<project-directory>` with the name of the directory that was created when you cloned the repository.

3. Open the `index.html` file in your web browser. You can do this by double-clicking the file in your file explorer or by entering the file URL in your web browser's address bar. The file URL should look something like this:

```
file:///path/to/your/project-directory/index.html
```
Replace `/path/to/your/project-directory` with the actual path to the project directory.

That's it! You should now be able to use the application in your web browser.

You can also use the `Live Server` extension in Visual Studio Code to run the project in your browser. Right-click on the `index.html` file and select `Open with Live Server`.

Please replace `<repository-url>` and `<project-directory>` with the actual repository URL and project directory name.
