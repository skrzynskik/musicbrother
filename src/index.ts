import express, {Express, Request, Response} from 'express';
import {SpotifyApi} from "./spotify-api.js";
const app: Express = express();

const spotifyApi = new SpotifyApi(
    'http://localhost:8888/spotifyCallback',
    '70b88414c0f14bd1ae7c97cef569cc39',
    'd1a5209b14f24584856a36b69b9c4e32'
)

app.get('/', (req: Request, res: Response) => {
    res.sendFile('/Users/kacperskrzynski/Documents/UEK/MusicBrother/src/index.html')
});

app.get('/spotifyLogin', (req: Request, res: Response) => {
    spotifyApi.authorize(req, res);
});

app.get('/spotifyCallback', (req: Request, res: Response) => {
    spotifyApi.callbackHandler(req,res)
})

app.get('/getSongLibrary', async (req: Request, res: Response) => {
    await spotifyApi.getUserLibrary()
    res.redirect('http://localhost:8888/')
})
app.listen(8888, () => {
    console.log('server up an runnin at http://localhost:8888/')
});
