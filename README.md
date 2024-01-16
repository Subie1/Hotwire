# Hotwire
- Easily download and organise all your songs!

# Download
#### [Prebuilt available in releases](https://github.com/Subie1/Hotwire/releases)

## Manual
1. Cloning the repository using [`git`](https://git-scm.com/)
```
git clone https://github.com/Subie1/Hotwire hotwire
cd hotwire
```

2. Installing the dependencies
```
npm run install-all
```

#### Developer Environment
```
npm run dev
```

#### Building the `client`
```
npm run build
```

#### Building the `server-software` using [`pkg`](https://github.com/vercel/pkg)
```
pkg ./src/api/index.js --targets node18-win-x64 --output server-software.exe
```

## Changing the `server-software` inside the `client`
1. Once opening the `client` navigate to `Settings > Server Software` should default to `http://localhost:4123/`
2. Change it to the value received from `server-software` if it's a local host use 

# Using the `server-software`
```
.\server-software --port 2918 --output ./songs
```

- The `--port` parameter is where the server will listen on (Host always `0.0.0.0`)
    - Default `3000`
- The `--output` parameter is the folder where the server will store the songs downloaded by the client.
    - Default `./songs`

# Enjoy!
#### Built with [Tauri](https://tauri.app/) and my [ExpressViteTemplate](https://github.com/Subie1/ExpressViteTemplate)