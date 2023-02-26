import client, {Channel, Connection} from 'amqplib'
import {SpotifyApi} from "../APIs/spotify-api.js";
import {SpotifyTrack} from "../utils/models.js";

const spotifyAPI = new SpotifyApi(
    'http://localhost:8888/spotifyCallback',
    '70b88414c0f14bd1ae7c97cef569cc39',
    'd1a5209b14f24584856a36b69b9c4e32'
)

export class SpotifyGet {

}

const connection: Connection = await client.connect('amqp://localhost', (e0, connection) => {
    if(e0) {
        throw e0
    }
    const channel: Channel = connection.createChannel((e1, channel) => {
        if (e1) {
            throw e1
        }
        var queue = 'spotify-get-queue'
        let msg: SpotifyTrack[] = []
        spotifyAPI.getUserLibrary().then(data => msg = data)
    })
});