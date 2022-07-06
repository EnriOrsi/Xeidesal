module.exports = function (app) {
    var md5 = require('md5');
    var multer = require('multer');
    var fs = require('fs');
    var sharp = require('sharp');
    var request = require('request');
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

    /* Início das Funções */

    /* Inicio config de salvar img no multer*/
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'public/uploads/');
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + '-' + file.originalname);
        }
    });

    var upload = multer({ storage: storage });
    /* Fim config de salvar img no multer*/
    
    /* Inicio config de redimensionar img capa no sharp*/
    compressImageCapa = (file) => {
        const imagem = file.destination + file.originalname.split('.')[0] + '.webp';
        return sharp(file.path).resize(2000, 510).toFormat('webp').webp({ quality: 80 }).toBuffer().then(data => {
            fs.access(file.path, (err) => {
                if (!err) {
                    fs.unlink(file.path, err => {
                        if (err) console.log(err)
                    })
                }
            });
            fs.writeFile(imagem, data, err => {
                if (err) {
                    console.log(err);
                }
            });
            return imagem;
        })
    }
    /* Fim config de redimensionar img capa no sharp*/

    /* Fim das Funções */

    /* Início das Rotas Simples */

    app.post('/cadastrar', function (req, res) {
        dados = req.body;
        dados.senha = md5(dados.senha);
        foto = 'public/uploads/avatarO.png';
        var conexao = app.infra.conexao();
        var usuarioBanco = new app.infra.bancoUsuario(conexao);
        usuarioBanco.register(dados, foto, function (erro) {
            if (erro) {
                console.log(erro);
                if (erro.errno == 1062) {
                    console.log("Email já cadastrado");
                    res.render('index.ejs', { 'cad': 0 });
                } else {
                    console.log("Erro no banco");
                    res.render('index.ejs', { 'cad': 1 });
                }
            } else {
                res.render('index.ejs', { 'cad': 2 });
            }
        });
    });

    app.post('/editar', function (req, res) {
        var dados = req.body;
        var conexao = app.infra.conexao();
        var usuarioBanco = new app.infra.bancoUsuario(conexao);
        usuarioBanco.update(dados, function (erros, resultado) {
            if (erros) {
                console.log(erros);
            }
            else {
                res.redirect('/perfil');
            }
        });
    });

    /* Fim das Rotas Simples */

    /* Início das Rotas de Upload */

    app.post('/upload/header', upload.single('capa'), function (req, res) {
        var sess = req.session;
        var file = req.file;
        compressImageCapa(file).then(imagem => {
            var conexao = app.infra.conexao();
            var usuarioBanco = new app.infra.bancoUsuario(conexao);
            usuarioBanco.alteraCapa(sess.email, imagem, function (erro) {
                if (erro) {
                    console.log(erro);
                } else {
                    res.redirect('/perfil')
                }
            });
        }).catch(err => console.log(err));
    });

    app.post('/upload/perfil', upload.single('foto'), function (req, res) {
        var sess = req.session;
        var file = req.file;
        compressImagePerfil(file).then(imagem => {
            var conexao = app.infra.conexao();
            var usuarioBanco = new app.infra.bancoUsuario(conexao);
            usuarioBanco.alteraImage(sess.email, imagem, function (erro) {
                if (erro) {
                    console.log(erro);
                } else {
                    res.redirect('/perfil')
                }
            });
        }).catch(err => console.log(err));
    });

    /* Fim das Rotas de Upload */

    /* Início das Rotas de Busca */

    app.post('/buscas/musica', function (req, res) {
        var dados = req.body;
        dados.musica = "%" + dados.musica + "%";
        var conexao = app.infra.conexao();
        var musicasBanco = new app.infra.bancoMusicas(conexao);
        musicasBanco.search(dados, function (erro, resposta) {
            if (erro) {
                console.log(erro);
                res.redirect('/erro');
            }
            else {
                res.render('musicas.ejs', { 'dados': resposta });
            }
        });
    });

    app.post('/buscas/album', function (req, res) {
        var dados = req.body;
        dados.album = "%" + dados.album + "%";
        var conexao = app.infra.conexao();
        var musicasBanco = new app.infra.bancoMusicas(conexao);
        musicasBanco.searchAlbum(dados, function (erro, resposta) {
            if (erro) {
                console.log(erro);
                res.redirect('/erro');
            }
            else {
                res.render('albuns.ejs', { 'dados': resposta });
            }
        });
    });

    app.post('/buscas/artista', function (req, res) {
        var dados = req.body;
        dados.artista = "%" + dados.artista + "%";
        var conexao = app.infra.conexao();
        var musicasBanco = new app.infra.bancoMusicas(conexao);
        musicasBanco.searchArtista(dados, function (erro, resposta) {
            if (erro) {
                console.log(erro);
                res.redirect('/erro');
            }
            else {
                res.render('artistas.ejs', { 'dados': resposta });
            }
        });
    });

    /* FIm das Rotas de Busca */

}