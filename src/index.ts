import express, { Express, Request, Response } from 'express';
import { SpotifyApi } from "./APIs/spotify-api.js";
import * as dotenv from 'dotenv'
import { YtmusicApi } from "./APIs/ytmusic-api.js";
const app: Express = express();
dotenv.config()


const spotifyApi = new SpotifyApi(
    'http://localhost:8888/spotifyCallback',
    '70b88414c0f14bd1ae7c97cef569cc39',
    'd1a5209b14f24584856a36b69b9c4e32'
)

const ytmApi = new YtmusicApi();

app.get('/', (req: Request, res: Response) => {
    res.sendFile('index.html', { root: './src/static' })
});

app.get('/spotifyLogin', (req: Request, res: Response) => {
    spotifyApi.authorize(req, res);
});

app.get('/spotifyCallback', (req: Request, res: Response) => {
    spotifyApi.callbackHandler(req, res)
})

app.get('/getSpotifySongLibrary', async (req: Request, res: Response) => {
    await spotifyApi.getUserLibrary()
    res.sendFile('done.html', { root: './src/static' })
})

app.get('/getYTMSongLibrary', async (req: Request, res: Response) => {
    await ytmApi.getUserLibrary('PL8mcvtIiuEx_I2DRC1SkCIGyrMzwqWnu3')
    res.sendFile('done.html', { root: './src/static' })
})

app.listen(8888, () => {
    console.log('server up an runnin at http://localhost:8888/')
});
