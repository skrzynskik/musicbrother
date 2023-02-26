export const scopes = [
    'ugc-image-upload',
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-read-currently-playing',
    'streaming',
    'app-remote-control',
    'user-read-email',
    'user-read-private',
    'playlist-read-collaborative',
    'playlist-modify-public',
    'playlist-read-private',
    'playlist-modify-private',
    'user-library-modify',
    'user-library-read',
    'user-top-read',
    'user-read-playback-position',
    'user-read-recently-played',
    'user-follow-read',
    'user-follow-modify'
];
const enum SPOTIFY_ALBUM_TYPE {
    ALBUM = 'album',
    SINGLE = 'single',
    COMP = 'compilation'
}

export type SpotifyAlbumPhoto = {
    photoUrl: string,
    height: number,
    width: number
}

export type SpotifyAlbum = {
    albumName: string,
    albumId: string,
    albumType: SPOTIFY_ALBUM_TYPE,
    albumImages: SpotifyAlbumPhoto[]
    albumUri: string
}

export type SpotifyArtist = {
    artistName: string,
    artistId: string,
    artistUri: string
}

export type SpotifyTrack = {
    album: SpotifyAlbum,
    artist: SpotifyArtist,
    songId: string
    songName: string,
    songPreviewUrl: string
    songUri: string
};

export type YouTubeMusicToken = {

}

export type YouTubeMusicTrack = {

}