# Discofy - Discover music at your terms
Discofy ist eine Web Applikation, die es ermöglicht ohne großen Aufwand neue Musik nach eigenen Präferenzen zu entdecken und somit personalisierte Spotify Playlists zu erstellen.

Entscheide dich für eine Kategorie, die dir zusagt, seien es deine Lieblings-Artists, -Genres oder Neuerscheinungen. Discofy liefert dir passend dazu eine Reihe von Song-Vorschlägen. Lausche und entdecke neue Musik, die du liebst und erstelle deine perfekte Playlist.

Für die Verwendung der App benötigst du lediglich einen Spotify Account.

Dieses Projekt wurde aufgesetzt mit [Create React App](https://github.com/facebook/create-react-app) und bezieht Daten aus der [Spotify Web API](https://developer.spotify.com/documentation/web-api).

## Installation

Klone das Repository
 ```sh 
 $ git clone https://github.com/Git-EL/discofy_project.git
 ```

Gehe in den Projektordner
```sh
$ cd discofy_project
```

Installiere die notwendigen Pakete
```sh
npm install
```

Starte die App im Entwickler-Modus
```sh
npm start
```

Öffne [http://localhost:3000](http://localhost:3000) um es im Browser zu sehen.
Die Seite wird neustarten, wenn du Änderungen vornimmst.

### Benötigte Inhalte
1.[Registriere](https://developer.spotify.com/documentation/general/guides/app-settings) die App im [Spotify Dashboard](https://developer.spotify.com/dashboard/) um die Client-ID und Client Secret zu erhalten und die Redirect URI festzulegen.
2.Erstelle eine .env-Datei mit folgenden Parametern in deinem Projektordner:

|Eigenschaft| Beschreibung  |
|--|--|
|REACT_APP_CLIENT_ID|""|
|REACT_APP_CLIENT_SECRET|""|
|REACT_APP_AUTHORIZE_URL|""|
|REACT_APP_REDIRECT_URL|""|

Für die Variableninhalte ist eine [Registrierung der App](https://developer.spotify.com/documentation/general/guides/app-settings) über den [Spotify Dashboard](https://developer.spotify.com/dashboard) nötig. 

## Technologien
![JavaScript](https://img.shields.io/badge/-JavaScript-black?style=flat-square&logo=javascript)
![React](https://img.shields.io/badge/-React-black?style=flat-square&logo=react)
![Nodejs](https://img.shields.io/badge/-Nodejs-black?style=flat-square&logo=Node.js)
![SCSS](https://img.shields.io/badge/-SCSS-black?style=flat-square&logo=SASS)
![HTML5](https://img.shields.io/badge/-HTML5-black?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/-CSS3-black?style=flat-square&logo=css3)
![Heroku](https://img.shields.io/badge/-Heroku-black?style=flat-square&logo=heroku)
![Git](https://img.shields.io/badge/-Git-black?style=flat-square&logo=git)
![GitHub](https://img.shields.io/badge/-GitHub-black?style=flat-square&logo=github)
