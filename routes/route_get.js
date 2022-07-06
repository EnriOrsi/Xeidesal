module.exports = function (app) {
    var md5 = require('md5');
    const request = require('request');
    var querystring = require('querystring');


    /* Inicio Configurações Spotify */
    var client_id = 'bd247d0548274e0a90b3816492365ce0'; // Your client id
    var client_secret = '440426de7dc14712a0aae64164473dc9'; // Your secret
    var redirect_uri = 'http://localhost:3000/logado'; // Your redirect uri

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
        var conexao = app.infra.conexao();
        var usuarioBanco = new app.infra.bancoUsuario(conexao);
        if (sess.logado) {
            if (sess.logado == 1) {
                res.redirect('/logado');
            } else {
                res.render('index.ejs');
            }
        } else {
            res.render('index.ejs');
        }
    });

    app.get('/adm', function (req, res) {
        res.redirect('/perfil');
    });

    app.get('/loginSpotify', function (req, res) {
        var state = generateRandomString(16);
        res.cookie(stateKey, state);

        // your application requests authorization
        var scope = 'user-read-playback-position user-read-email user-library-read user-top-read playlist-modify-public ugc-image-upload user-follow-modify user-modify-playback-state user-read-recently-played user-read-private playlist-read-private user-library-modify playlist-read-collaborative playlist-modify-private user-follow-read user-read-playback-state user-read-currently-playing';
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
                        sess.logado = 1;
                        var perfil = {
                            url: 'https://api.spotify.com/v1/me',
                            headers: { 'Authorization': 'Bearer ' + sess.access_token },
                            json: true
                        };
                        request.get(perfil, function (error, response, perfil) {
                            sess.email = perfil.email;
                            res.render('logado.ejs', { 'dados': perfil });
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
                    headers: { 'Authorization': 'Bearer ' + sess.access_token },
                    json: true
                };
                request.get(perfil, function (error, response, perfil) {
                    var topArtist = {
                        url: 'https://api.spotify.com/v1/me/top/artists?limit=10',
                        headers: { 'Authorization': 'Bearer ' + sess.access_token },
                        json: true
                    };
                    request.get(topArtist, function (error, response, topArtist) {
                        var followedArtists = {
                            url: 'https://api.spotify.com/v1/me/following?type=artist&limit=50',
                            headers: { 'Authorization': 'Bearer ' + sess.access_token },
                            json: true
                        };
                        request.get(followedArtists, function (error, response, followedArtists) {
                            var savedAlbuns = {
                                url: 'https://api.spotify.com/v1/me/albums?limit=50',
                                headers: { 'Authorization': 'Bearer ' + sess.access_token },
                                json: true
                            };
                            request.get(savedAlbuns, function (error, response, savedAlbuns) {
                                var topTrack = {
                                    url: 'https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=1',
                                    headers: { 'Authorization': 'Bearer ' + sess.access_token },
                                    json: true
                                };
                                request.get(topTrack, function (error, response, topTrack) {
                                    var top10Track = {
                                        url: 'https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=10',
                                        headers: { 'Authorization': 'Bearer ' + sess.access_token },
                                        json: true
                                    };
                                    request.get(top10Track, function (error, response, top10Track) {
                                        res.render('perfil.ejs', { 'dados': perfil, 'topArtist': topArtist, 'followedArtists': followedArtists, 'savedAlbuns': savedAlbuns, 'topTrack': topTrack, 'top10Track': top10Track });
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

    app.get('/album/:id', function (req, res) {
        var id = req.params.id;
        var sess = req.session;
        var conexao = app.infra.conexao();
        var usuarioMusicas = new app.infra.bancoMusicas(conexao);
        if (sess.logado) {
            if (sess.logado == 1) {
                res.redirect('/albumLogado/' + id);
            } else {
                usuarioMusicas.album(id, function (erro, resposta) {
                    if (erro) {
                        console.log(erro);
                        res.redirect('/erro');
                    }
                    else {
                        usuarioMusicas.musicasAlbum(id, function (error, resultado) {
                            if (error) {
                                console.log(error);
                                res.redirect('/erro');
                            }
                            else {
                                res.render('album.ejs', { 'dados': resposta, 'musica': resultado });
                            }
                        });
                    }
                });
            }
        } else {
            usuarioMusicas.album(id, function (erro, resposta) {
                if (erro) {
                    console.log(erro);
                    res.redirect('/erro');
                }
                else {
                    usuarioMusicas.musicasAlbum(id, function (error, resultado) {
                        if (error) {
                            console.log(error);
                            res.redirect('/erro');
                        }
                        else {
                            res.render('album.ejs', { 'dados': resposta, 'musica': resultado });
                        }
                    });
                }
            });
        }
    });

    app.get('/artista/:id', function (req, res) {
        var id = req.params.id;
        var sess = req.session;
        var conexao = app.infra.conexao();
        var usuarioMusicas = new app.infra.bancoMusicas(conexao);
        if (sess.logado) {
            if (sess.logado == 1) {
                usuarioMusicas.artista(id, function (erro, resultado) {
                    if (erro) {
                        console.log(erro);
                        res.redirect('/erro');
                    }
                    else {
                        var usuarioBanco = new app.infra.bancoUsuario(conexao);
                        usuarioBanco.find(sess.email, function (erro, resposta) {
                            if (erro) {
                                console.log(erro);
                                res.redirect('/erro');
                            } else {
                                usuarioMusicas.albunsArtista(id, function (error, retorno) {
                                    if (error) {
                                        console.log(error);
                                        res.redirect('/erro');
                                    }
                                    else {
                                        res.render('artistaLogado.ejs', { 'dados': resposta, 'artista': resultado, 'album': retorno });
                                    }
                                });
                            }
                        });
                    }
                });

            } else {
                usuarioMusicas.artista(id, function (erro, resposta) {
                    if (erro) {
                        console.log(erro);
                        res.redirect('/erro');
                    }
                    else {
                        usuarioMusicas.albunsArtista(id, function (error, resultado) {
                            if (error) {
                                console.log(error);
                                res.redirect('/erro');
                            }
                            else {
                                res.render('artista.ejs', { 'dados': resposta, 'album': resultado });
                            }
                        });
                    }
                });
            }
        } else {
            usuarioMusicas.artista(id, function (erro, resposta) {
                if (erro) {
                    console.log(erro);
                    res.redirect('/erro');
                }
                else {
                    usuarioMusicas.albunsArtista(id, function (error, resultado) {
                        if (error) {
                            console.log(error);
                            res.redirect('/erro');
                        }
                        else {
                            res.render('artista.ejs', { 'dados': resposta, 'album': resultado });
                        }
                    });
                }
            });
        }
    });

    /*
    app.get('/adm', function (req, res) {
        res.redirect('/perfil');
    });

    app.get('/configuracoes/:email', function (req, res) {
        var sess = req.session;
        var conexao = app.infra.conexao();
        var usuarioBanco = new app.infra.bancoUsuario(conexao);
        if (sess.logado) {
            if (sess.logado == 1) {
                if (sess.tipeUser == 1) {
                    usuarioBanco.find(sess.email, function (erro, resposta) {
                        if (erro) {
                            console.log(erro);
                            res.redirect('/erro');
                        } else {
                            res.render('configuracoes.ejs', { 'dados': resposta });
                        }
                    });
                } else if (sess.tipeUser == 0) {
                    usuarioBanco.find(sess.email, function (erro, resposta) {
                        if (erro) {
                            console.log(erro);
                            res.redirect('/erro');
                        } else {
                            res.render('configuracoes.ejs', { 'dados': resposta });
                        }
                    });
                } else if (sess.tipeUser == 2) {
                    res.redirect('/mod');
                }
            } else {
                res.redirect('/');
            }
        } else {
            res.redirect('/');
        }
    });

    app.get('/musicas', function (req, res) {
        var sess = req.session;
        var conexao = app.infra.conexao();
        var usuarioMusicas = new app.infra.bancoMusicas(conexao);
        if (sess.logado) {
            if (sess.logado == 1) {
                res.redirect('/musicasLogado');
            } else {
                usuarioMusicas.lista(function (erro, resposta) {
                    if (erro) {
                        console.log(erro);
                        res.redirect('/erro');
                    }
                    else {
                        res.render('musicas.ejs', { 'dados': resposta });
                    }
                });
            }
        } else {
            usuarioMusicas.lista(function (erro, resposta) {
                if (erro) {
                    console.log(erro);
                    res.redirect('/erro');
                }
                else {
                    res.render('musicas.ejs', { 'dados': resposta });
                }
            });
        }
    });

    app.get('/albuns', function (req, res) {
        var sess = req.session;
        var conexao = app.infra.conexao();
        var usuarioMusicas = new app.infra.bancoMusicas(conexao);
        if (sess.logado) {
            if (sess.logado == 1) {
                res.redirect('/albunsLogado');
            } else {
                usuarioMusicas.listaAlbum(function (erro, resposta) {
                    if (erro) {
                        console.log(erro);
                        res.redirect('/erro');
                    }
                    else {
                        res.render('albuns.ejs', { 'dados': resposta });
                    }
                });
            }
        } else {
            usuarioMusicas.listaAlbum(function (erro, resposta) {
                if (erro) {
                    console.log(erro);
                    res.redirect('/erro');
                }
                else {
                    res.render('albuns.ejs', { 'dados': resposta });
                }
            });
        }
    });
    
    app.get('/artistas', function (req, res) {
        var sess = req.session;
        var conexao = app.infra.conexao();
        var usuarioMusicas = new app.infra.bancoMusicas(conexao);
        if (sess.logado) {
            if (sess.logado == 1) {
                usuarioMusicas.listaArtista(function (erro, resultado) {
                    if (erro) {
                        console.log(erro);
                        res.redirect('/erro');
                    }
                    else {
                        var usuarioBanco = new app.infra.bancoUsuario(conexao);
                        usuarioBanco.find(sess.email, function (erro, resposta) {
                            if (erro) {
                                console.log(erro);
                                res.redirect('/erro');
                            } else {
                                res.render('artistasLogado.ejs', { 'dados': resposta, 'artistas': resultado });
                            }
                        });
                    }
                });

            } else {
                usuarioMusicas.listaArtista(function (erro, resposta) {
                    if (erro) {
                        console.log(erro);
                        res.redirect('/erro');
                    }
                    else {
                        res.render('artistas.ejs', { 'dados': resposta });
                    }
                });
            }
        } else {
            usuarioMusicas.listaArtista(function (erro, resposta) {
                if (erro) {
                    console.log(erro);
                    res.redirect('/erro');
                }
                else {
                    res.render('artistas.ejs', { 'dados': resposta });
                }
            });
        }
    });
    */

}