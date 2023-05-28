const { Pool } = require('pg');
const process = require('process');

class PlaylistService {
    constructor(){
        this._pool = new Pool({
            host: process.env.PGHOST,
            database: process.env.PGDATABASE,
            port: process.env.PGPORT,
            user: process.env.PGUSER,
            password:process.env.PGPASSWORD, 
        });
    }
    async getPlaylistById(playlistId) {
        const query = {
            text: `
                SELECT
                    playlists.id,
                    playlists.name
                FROM playlists
                WHERE playlists.id = $1
            `,
            values: [playlistId],
        };
        const result = await this._pool.query(query);
        const playlist = result.rows[0];
        const songsQuery = {
            text: `
                SELECT
                    songs.id,
                    songs.title,
                    songs.performer
                FROM playlistsongs
                LEFT JOIN songs
                    ON playlistsongs.song_id = songs.id
                WHERE playlistsongs.playlist_id = $1
            `,
            values: [playlistId],
        };
        const songsResult = await this._pool.query(songsQuery);
        const songs = songsResult.rows;
        playlist.songs = songs;
        const playlistResult = {
            playlist,
        }
        return playlistResult;
    }
}
module.exports = PlaylistService;