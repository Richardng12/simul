// const HOST = 'http://localhost:8888';
const HOST = 'https://quero.serveo.net';

const USER_INFO = `${HOST}/userinfo`;
const USER = `${HOST}/user`;
const SPOTIFY_AUTH = `${HOST}/auth/spotify`;
const LOBBY = `${HOST}/lobbies`;
const SONGS = `${HOST}/songs`;
const CHAT_SERVER = `${HOST}/getChats`;
const FILE_SERVER = `${HOST}/uploadFiles`;
const GET_LYRIC = `${HOST}/lyric`;

export default HOST;
export { USER_INFO, SPOTIFY_AUTH, CHAT_SERVER, FILE_SERVER, LOBBY, SONGS, USER, GET_LYRIC };
