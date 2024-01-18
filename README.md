# > Hotwire

- Easily download and organise all your songs!

# > Download

#### [Prebuilt available in releases](https://github.com/Subie1/Hotwire/releases)

## Manual

1. Cloning the repository using [<u>git</u>](https://git-scm.com/)

```
git clone https://github.com/Subie1/Hotwire hotwire
cd hotwire
```

2. Installing the dependencies

```
npm run install-all
```

# > Building

#### Building the **client**

```
npm run build
```

#### Building the **server-software** using [<u>pkg</u>](https://github.com/vercel/pkg)

```
pkg ./src/api/index.js --targets latest --output server-software.exe
```

# > Running

###### Developer Environment (No UI)

```
npm run dev
```

###### Developer Environment (With UI)

```
npx tauri dev
```

## Changing the **server-software** inside the **client**

1. Once opening the **client** navigate to `Settings > Server Software` should default to `http://localhost:4123/`
2. Change it to the value received from **server-software** if it's a local host use

# > Using the **server-software**

```
.\server-software --port 2918 --output ./songs --data ./data
```

- The `--port` parameter is where the server will listen on (Host always `0.0.0.0`)
  - Default `3000`
- The `--output` parameter is the folder where the server will store the songs downloaded by the client.
  - Default `./songs`
- The `--data` parameter is the folder where the server will store the playlist data created by clients
  - Default `./data`

# > Enjoy!

#### Built with [Tauri](https://tauri.app/) and my [ExpressViteTemplate](https://github.com/Subie1/ExpressViteTemplate)
