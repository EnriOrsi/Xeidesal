function usuarioMusicas(conexao) {
    this._conexao = conexao;
}

usuarioMusicas.prototype.lista = function (callback) {
    this._conexao.query('SELECT musica.id_musica, musica.id_album, musica.id_artista, musica.email, musica.musica, musica.arquivo, album.album, album.foto_album, album.anoLancamento, artista.artista, artista.foto_artista, artista.biografia FROM musica INNER JOIN album ON musica.id_album = album.id_album AND musica.id_artista = album.id_artista INNER JOIN artista ON artista.id_artista = album.id_artista AND musica.id_artista = artista.id_artista WHERE artista.id_artista = album.id_artista AND musica.id_artista = artista.id_artista ORDER BY artista.artista, album.anoLancamento DESC;', callback);
}

usuarioMusicas.prototype.listaAlbum = function (callback) {
    this._conexao.query('SELECT *FROM album INNER JOIN artista ON album.id_artista = artista.id_artista WHERE album.id_artista = artista.id_artista ORDER BY artista.artista, album.anoLancamento DESC', callback)
}

usuarioMusicas.prototype.listaArtista = function (callback) {
    this._conexao.query('SELECT *FROM artista ORDER BY artista', callback)
}

usuarioMusicas.prototype.album = function (id, callback) {
    this._conexao.query('SELECT album.album, album.foto_album, album.anoLancamento, artista.id_artista, artista.artista, artista.foto_artista, artista.biografia FROM album INNER JOIN artista ON artista.id_artista = album.id_artista WHERE artista.id_artista = album.id_artista AND album.id_album=?;', id, callback);
}

usuarioMusicas.prototype.musicasAlbum = function (id, callback) {
    this._conexao.query('SELECT musica.id_musica, musica.ordem, musica.id_album, musica.id_artista, musica.email, musica.musica, musica.arquivo, album.album, album.foto_album, album.anoLancamento, artista.artista, artista.foto_artista, artista.biografia FROM musica INNER JOIN album ON musica.id_album = album.id_album AND musica.id_artista = album.id_artista INNER JOIN artista ON artista.id_artista = album.id_artista AND musica.id_artista = artista.id_artista WHERE artista.id_artista = album.id_artista AND musica.id_artista = artista.id_artista AND album.id_album=? ORDER BY ordem;', id, callback);
}

usuarioMusicas.prototype.artista = function (id, callback) {
    this._conexao.query('SELECT * FROM artista where id_artista = ?', id, callback);
}

usuarioMusicas.prototype.albunsArtista = function (id, callback) {
    this._conexao.query('SELECT *FROM album INNER JOIN artista ON album.id_artista = artista.id_artista WHERE album.id_artista = artista.id_artista AND artista.id_artista = ? ORDER BY artista.artista, album.anoLancamento DESC', id, callback);
}

usuarioMusicas.prototype.search = function (dados, callback) {
    this._conexao.query('SELECT musica.id_musica, musica.id_album, musica.id_artista, musica.email, musica.musica, musica.arquivo, album.album, album.foto_album, album.anoLancamento, artista.artista, artista.foto_artista, artista.biografia FROM musica INNER JOIN album ON musica.id_album = album.id_album AND musica.id_artista = album.id_artista INNER JOIN artista ON artista.id_artista = album.id_artista AND musica.id_artista = artista.id_artista WHERE artista.id_artista = album.id_artista AND musica.id_artista = artista.id_artista AND musica.musica like ? ORDER BY musica.musica;', dados.musica, callback)
}

usuarioMusicas.prototype.searchAlbum = function (dados, callback) {
    this._conexao.query('SELECT * FROM album INNER JOIN artista ON album.id_artista = artista.id_artista WHERE album.album like ? ORDER BY artista.artista, album.anoLancamento DESC', dados.album, callback)
}

usuarioMusicas.prototype.searchArtista = function (dados, callback) {
    this._conexao.query('SELECT * FROM artista WHERE artista like ? ORDER BY artista', dados.artista, callback)
}

module.exports = function () {
    return usuarioMusicas;
}