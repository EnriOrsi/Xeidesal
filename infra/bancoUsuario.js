function usuarioBanco(conexao) {
    this._conexao = conexao;
}

usuarioBanco.prototype.register = function (dados, foto, callback) {
    this._conexao.query('insert into usuario set ?, foto = ?', [dados, foto], callback);
}

usuarioBanco.prototype.search = function (dados, callback) {
    this._conexao.query('select *from usuario where nome = ?', dados, callback);
}

usuarioBanco.prototype.find = function (email, callback) {
    this._conexao.query('select *from usuario where email = ?', email, callback);
}

usuarioBanco.prototype.update = function (dados, callback) {
    this._conexao.query('update usuario set ? where email = ?', [dados, dados.email], callback);
}

usuarioBanco.prototype.delete = function (dados, callback) {
    this._conexao.query('delete from usuario where email = ? and senha = ?', [dados.email, dados.senha], callback);
}

usuarioBanco.prototype.login = function (dados, callback) {
    this._conexao.query('select *from usuario where email = ? and senha = ?', [dados.email, dados.senha], callback);
}

usuarioBanco.prototype.alteraCapa = function (dados, foto, callback) {
    this._conexao.query('update usuario set capa=? where email= ?', [foto, dados], callback);
}

usuarioBanco.prototype.alteraImage = function (dados, foto, callback) {
    this._conexao.query('update usuario set foto=? where email= ?', [foto, dados], callback);
}

module.exports = function () {
    return usuarioBanco;
}