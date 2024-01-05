# Template to avoid repetitive making of API & Frontend
## Packages used:
### Runner
- Dotenv (dotenv)
    - Loads the .env

### Backend
- Express (express)
    - The main networking
- Nodemon (nodemon)
    - Package for developer environment & restarting on file change

### Frontend
(Apart from all the vite & react pre-installs)
- React Icons (react-icons)
    - Easy import icons from your favorite services
- ESLint (eslint)
    - Easily organise your code by having enfornced syntax real time
- TailwindCSS (tailwindcss, autoprefixer)
    - Easier way to utilise CSS
- Axios (axios)
    - Easily send out HTTP requests

## Installing
- This requires `git` & `nodejs` installed.
```
git clone https://github.com/Subie1/ExpressViteTemplate
cd ExpressViteTemplate
```

- This is for the basic setup now you need to install every package
    ## Automatic:
    ```
    npm run install-all
    ```

    ## Manual:
    ### Core Install
    ```
    npm i
    ```

    ### Backend Install
    ```
    cd src/api
    npm i
    ```

    ### Frontend Install
    ```
    cd src/dashboard
    npm i
    ```

# Run
```
node .
```

# Enjoy!