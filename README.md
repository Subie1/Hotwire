<h1 align="center">Hotwire</h1>
<p align="center">Easily organise and download your songs for offline use!</p>

<p align="center">
  <a href="./LICENSE"><img src="https://img.shields.io/badge/license-MPL2.0-red.svg"></a>
  <a href="https://github.com/Subie1/Hotwire/releases"><img src="https://img.shields.io/github/release/Subie1/Hotwire.svg"></a>
</p>

<p float="center">
  <img src="https://github.com/Subie1/Hotwire/assets/133152722/60f9befe-763b-4095-bfc5-d15f4afc617f" width="45%" />
  <img src="https://github.com/Subie1/Hotwire/assets/133152722/4099bda9-447d-4bd4-937a-7b7d7924a2df" width="45%" />
  <img src="https://github.com/Subie1/Hotwire/assets/133152722/dfb0ea2f-531c-4cf8-ad64-ad832bde6c5d" width="45%" />
  <img src="https://github.com/Subie1/Hotwire/assets/133152722/07f86eda-b831-4783-90aa-3d9e9c040205" width="45%" />
</p>

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
## Automated building
```
npm run package
```
* All executables will be located in `./target`

## Manual building
#### Building the **UI**
```
npm run build
```
* The HTML/JS/CSS will be located in `./src/dashboard/dist/`

#### Building the **Client**
```
npx tauri build
```
* The Executable will be located in `./src-tauri/target/release/hotwire.exe`
* The Installer will be located in `./src-tauri/target/release/bundle/msi/*.msi`

#### Building the **server-software** using [<u>pkg</u>](https://github.com/vercel/pkg)
```
pkg ./src/api/index.js --output server-software.exe
```
* The Executable will be located in `./server-software`

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
