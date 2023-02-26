import SpotifyWebApi from 'spotify-web-api-node'
import {scopes, SpotifyTrack} from "../utils/models.js";
import {Request, Response} from "express";
import {Api} from "./api.js";

export class SpotifyApi implements Api<SpotifyTrack[]>{
    private readonly clientId: string;
    private readonly redirectUri: string;
    private readonly clientSecret: string;
    private spotifyApi: any;

    private accessToken: string = '';
    private refreshToken: string = '';
    private expiryDate: any;

    constructor(redirectUri: string, clientId: string, clientSecret: string) {
        this.redirectUri = redirectUri;
        this.clientId = clientId;
        this.clientSecret = clientSecret
        this.init();
    }

    public async getUserLibrary(): Promise<SpotifyTrack[]> {
        let tracks: SpotifyTrack[] = [] as SpotifyTrack[];
        await this.spotifyApi.getMySavedTracks().then(async (data: any) => {
            const totalSongs = data.body.total;
            console.log(totalSongs)
            // for now you really do not want to change it to anything else
            for (let i = 0; i < 10; i++) {
                await this.spotifyApi.getMySavedTracks({
                    limit: 1,
                    offset: i
                }).then((data: any) => {
                    tracks.push((data.body.items[0] as SpotifyTrack))
                })
            }
        })
        console.log(tracks);
        return tracks
    }

    public async getAlbum() {
        return await this.spotifyApi.getAlbum('4GyUkM4rpGM9qHEs6Kpvgx').then(data => {
            console.log(data.body.tracks.items);
        });
    }
    public authorize(request: Request, response: Response): void {
        return response.redirect(this.spotifyApi.createAuthorizeURL(scopes));
    }

    public callbackHandler(request: Request, response: Response): void {
        const error = request.query.error;
        const code = request.query.code;

        if (error) {
            console.error('Callback err:', error);
            response.send(`Callback Error: ${error}`);
            return;
        }

        this.spotifyApi
            .authorizationCodeGrant(code)
            .then((data: any) => {
                this.accessToken = data.body['access_token'];
                this.refreshToken = data.body['refresh_token'];
                this.expiryDate = data.body['expires_in'];

                this.spotifyApi.setAccessToken(this.accessToken);
                this.spotifyApi.setRefreshToken(this.refreshToken);

                console.log('AccTk', this.accessToken);
                console.log('RefTk', this.refreshToken);
                console.log('Exp', this.expiryDate);

                setInterval(async () => {
                    const data = await this.spotifyApi.refreshAccessToken();
                    this.accessToken = data.body['access_token'];

                    console.log("Token refreshed")
                    console.log('AccTk', this.accessToken);
                    this.spotifyApi.setAccessToken(this.accessToken)
                }, this.expiryDate / 2 * 1000)

                return response.redirect('http://localhost:8888/')
            }).catch((error: any) => {
                console.error('Error getting tokens: ', error);
                return response.send(`Error getting Token: ${error}`)
        })
    }
    private init(): void {
        this.spotifyApi = new SpotifyWebApi({
            redirectUri: this.redirectUri,
            clientId: this.clientId,
            clientSecret: this.clientSecret
        })
    }
}