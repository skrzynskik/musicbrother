import {YouTubeMusicTrack} from "../utils/models.js";

const { default: YTMusic } = require('@codyduong/ytmusicapi');
export class YtmusicApi{
    private ytmApi: any = new YTMusic({
        auth:
            {
                "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.3 Safari/605.1.15",
                "Accept": "*/*",
                "Accept-Language": "en-US,en;q=0.5",
                "Content-Type": "application/json",
                "X-Goog-AuthUser": "0",
                "x-origin": "https://music.youtube.com",
                "Cookie" : 'SIDCC=AFvIBn-3Pl--D2FzBxyNctTedwPyRhGZSx_p1Wjt2PHTjd1d_n5hsrhJylSeUoPeY-j34ouFLw; __Secure-1PSIDCC=AFvIBn9O-45he9aIfqPJCxy5HIpuz-5wttxFqcLLZdOLlVVwXd9wnlMXfu7aw0bUZteC0UoNLVA; __Secure-3PSIDCC=AFvIBn9wz6kjnEV8i0reB52o1CbnN3ordXMbqtcH0LNNcbttzjoGuqi7YKuCnBf8l-bl7xQXoFI; PREF=f6=40000080&tz=Europe.Warsaw&f7=100&library_tab_browse_id=FEmusic_liked_videos&f4=4000000; YSC=XZCWEjAJINU; APISID=nugoQfOKGsgOm9To/AmF6-ISjb-ri2xWit; HSID=Ag71ksi6azj7EUGWK; SAPISID=V1cFT9gYGEQIzE9q/AFgd1mScbTz0qZ95M; SID=Twis1D1OHU5a0usmDNrvec3oKC50Ou11DafivvWKcuTTMf7EUoX4j1GPtnbsJNl1D2s3nA.; SSID=AHsmXmzE_1ck1r9OR; __Secure-1PAPISID=V1cFT9gYGEQIzE9q/AFgd1mScbTz0qZ95M; __Secure-1PSID=Twis1D1OHU5a0usmDNrvec3oKC50Ou11DafivvWKcuTTMf7ENfjrDYhi1SkKShSV8yr6lQ.; __Secure-3PAPISID=V1cFT9gYGEQIzE9q/AFgd1mScbTz0qZ95M; __Secure-3PSID=Twis1D1OHU5a0usmDNrvec3oKC50Ou11DafivvWKcuTTMf7E07DB2BMSPrvplg708bVbAA.; _gcl_au=1.1.405182293.1675041169; LOGIN_INFO=AFmmF2swRQIhAKWmF73AVIHth6gCz5qDONyPA94EIO_M_L_9OWjQaY5mAiBnnL5tvNnO4tlqBKX-Q5SRUu7U7lBWBWCf1tDlWMTJQw:QUQ3MjNmeDhnUkt6NlJfWEFVcVdOb0pDOUJGTW54TWFXTV96TTh3TjBPQ0c0Y1czQ2QtbHVHV0Y1aS1FLWt6Tll2bFVsaEFWdWhyd3Q0MTJkajVGVEF2MWxSNXdIbGVPZUV5amNUd1BfemxNM2JwVDRNcTlmRTQ0UGlqRm5mRXlxc3JRVnMyRWt4WEw2NlZPNHJxdU1HWURwelNiZ1RHSlBn; DEVICE_INFO=ChxOekU1TXpReE1qTTFOek15TXpNMk5EWTRNZz09EO3E0J4GGO3E0J4G; VISITOR_INFO1_LIVE=VwDSnDWISJA; CONSENT=PENDING+338'
            }

    })

    async getUserLibrary(playlistID: string ): Promise<YouTubeMusicTrack[]> {
        return await this.ytmApi.getPlaylist(playlistID ||'PL8mcvtIiuEx_I2DRC1SkCIGyrMzwqWnu3')
    }
}