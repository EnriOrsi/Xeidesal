module.exports = function (app) {
    const request = require('request');
    var querystring = require('querystring');


    /* Inicio Configurações Spotify */
    var client_id = 'bd247d0548274e0a90b3816492365ce0'; // Your client id
    var client_secret = '440426de7dc14712a0aae64164473dc9'; // Your secret
    var redirect_uri = 'https://xeidesal.onrender.com/logado'; // Your redirect uri

    /**
     * Generates a random string containing numbers and letters
     * @param  {number} length The length of the string
     * @return {string} The generated string
     */
    var generateRandomString = function (length) {
        var text = '';
        var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (var i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    };

    var stateKey = 'spotify_auth_state';

    /* Fim Configurações Spotify */

    /* Rotas */

    app.get('/', function (req, res) {
        var sess = req.session;
        if (sess.logado) {
            if (sess.logado == 1) {
                var perfil = {
                    url: 'https://api.spotify.com/v1/me',
                    headers: {
                        'Authorization': 'Bearer ' + sess.access_token
                    },
                    json: true
                };
                request.get(perfil, function (error, response, perfil) {
                    var topArtist = {
                        url: 'https://api.spotify.com/v1/me/top/artists?limit=3',
                        headers: {
                            'Authorization': 'Bearer ' + sess.access_token
                        },
                        json: true
                    };
                    request.get(topArtist, function (error, response, topArtist) {
                        var seed = topArtist.items[0].id;
                        for (i = 1; i < topArtist.items.length; i++) {
                            seed = seed + ',' + topArtist.items[i].id;
                        }
                        var recommendations = {
                            url: 'https://api.spotify.com/v1/recommendations?limit=12&seed_artists=' + seed,
                            headers: {
                                'Authorization': 'Bearer ' + sess.access_token
                            },
                            json: true
                        };
                        request.get(recommendations, function (error, response, recommendations) {
                            var newReleases = {
                                url: 'https://api.spotify.com/v1/browse/new-releases?limit=10',
                                headers: {
                                    'Authorization': 'Bearer ' + sess.access_token
                                },
                                json: true
                            };
                            request.get(newReleases, function (error, response, newReleases) {
                                res.render('index.ejs', {
                                    'dados': perfil,
                                    'recommendations': recommendations,
                                    'newReleases': newReleases,
                                    'page': 'home'
                                });
                            });
                        });
                    });
                });
            } else {
                res.render('index.ejs', {
                    'page': 'home'
                });
            }
        } else {
            res.render('index.ejs', {
                'page': 'home'
            });
        }
    });

    app.get('/loginSpotify', function (req, res) {
        var state = generateRandomString(16);
        res.cookie(stateKey, state);

        // your application requests authorization
        var scope = 'user-read-playback-position user-read-email user-library-read user-top-read user-follow-modify user-read-recently-played user-read-private playlist-read-private playlist-read-collaborative user-follow-read user-read-playback-state user-read-currently-playing';
        res.redirect('https://accounts.spotify.com/authorize?' +
            querystring.stringify({
                response_type: 'code',
                client_id: client_id,
                scope: scope,
                redirect_uri: redirect_uri,
                state: state
            }));
    });

    app.get('/logado', function (req, res) {
        var sess = req.session;
        var code = req.query.code || null;
        var state = req.query.state || null;
        var storedState = req.cookies ? req.cookies[stateKey] : null;

        if (typeof code != 'undefined') {
            if (state === null || state !== storedState) {
                res.redirect('/erro' +
                    querystring.stringify({
                        error: 'state_mismatch'
                    }));
            } else {
                var authOptions = {
                    url: 'https://accounts.spotify.com/api/token',
                    form: {
                        code: code,
                        redirect_uri: redirect_uri,
                        grant_type: 'authorization_code'
                    },
                    headers: {
                        'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64'))
                    },
                    json: true
                };

                request.post(authOptions, function (error, response, body) {
                    if (!error && response.statusCode === 200) {
                        sess.access_token = body.access_token;
                        var perfil = {
                            url: 'https://api.spotify.com/v1/me',
                            headers: {
                                'Authorization': 'Bearer ' + sess.access_token
                            },
                            json: true
                        };
                        request.get(perfil, function (error, response, perfil) {
                            sess.email = perfil.email;
                            sess.logado = 1;
                            res.redirect('/');
                        });
                    } else {
                        res.redirect('/erro' +
                            querystring.stringify({
                                error: 'invalid_token'
                            }));
                    }
                });
            }
        } else {
            res.redirect('/');
        }
    });

    app.get('/logout', function (req, res) {
        req.session.destroy(function (erro) {
            res.redirect('/');
        });
    });

    app.get('/erro', function (req, res) {
        res.render('erro.ejs');
    });

    app.get('/perfil', function (req, res) {
        var sess = req.session;
        if (sess.logado) {
            if (sess.logado == 1) {
                var perfil = {
                    url: 'https://api.spotify.com/v1/me',
                    headers: {
                        'Authorization': 'Bearer ' + sess.access_token
                    },
                    json: true
                };
                request.get(perfil, function (error, response, perfil) {
                    var topArtist = {
                        url: 'https://api.spotify.com/v1/me/top/artists?limit=10',
                        headers: {
                            'Authorization': 'Bearer ' + sess.access_token
                        },
                        json: true
                    };
                    request.get(topArtist, function (error, response, topArtist) {
                        var followedArtists = {
                            url: 'https://api.spotify.com/v1/me/following?type=artist&limit=50',
                            headers: {
                                'Authorization': 'Bearer ' + sess.access_token
                            },
                            json: true
                        };
                        request.get(followedArtists, function (error, response, followedArtists) {
                            var savedAlbuns = {
                                url: 'https://api.spotify.com/v1/me/albums?limit=50',
                                headers: {
                                    'Authorization': 'Bearer ' + sess.access_token
                                },
                                json: true
                            };
                            request.get(savedAlbuns, function (error, response, savedAlbuns) {
                                var topTrack = {
                                    url: 'https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=1',
                                    headers: {
                                        'Authorization': 'Bearer ' + sess.access_token
                                    },
                                    json: true
                                };
                                request.get(topTrack, function (error, response, topTrack) {
                                    var top10Track = {
                                        url: 'https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=10',
                                        headers: {
                                            'Authorization': 'Bearer ' + sess.access_token
                                        },
                                        json: true
                                    };
                                    request.get(top10Track, function (error, response, top10Track) {
                                        var Playlists = {
                                            url: 'https://api.spotify.com/v1/me/playlists',
                                            headers: {
                                                'Authorization': 'Bearer ' + sess.access_token
                                            },
                                            json: true
                                        }
                                        request.get(Playlists, function (error, response, playlists) {
                                            var lastTracks = {
                                                url: 'https://api.spotify.com/v1/me/player/recently-played?limit=12',
                                                headers: {
                                                    'Authorization': 'Bearer ' + sess.access_token
                                                },
                                                json: true
                                            }
                                            request.get(lastTracks, function (error, response, lastTracks) {
                                                res.render('index.ejs', {
                                                    'dados': perfil,
                                                    'topArtist': topArtist,
                                                    'followedArtists': followedArtists,
                                                    'savedAlbuns': savedAlbuns,
                                                    'topTrack': topTrack,
                                                    'top10Track': top10Track,
                                                    'playlists': playlists,
                                                    'lastTracks': lastTracks,
                                                    'page': 'perfil'
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            } else {
                res.redirect('/');
            }
        } else {
            res.redirect('/');
        }
    });

    app.get('/user/:id', function (req, res) {
        res.redirect('/');
    });
}