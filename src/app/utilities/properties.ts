import { environment  } from "../../environments/environment";
export class Properties {
    public static _SEPARATOR        = "%5E";
    public static SPOTIFY_ACCOUNT_URL = "https://accounts.spotify.com/";
    public static SPOTIFY_API_URL = "https://api.spotify.com/v1/";
    public static SPOTIFY_SEARCH_URL = this.SPOTIFY_API_URL+ "search";
    public static SPOTIFY_TOKEN_URL = this.SPOTIFY_ACCOUNT_URL+"api/token";
    public static SPOTIFY_CLIENT_ID = environment.SPOTIFY_CLIENT_ID;
    public static SPOTIFY_CLIENT_SECRET = environment.SPOTIFY_CLIENT_SECRET;
}