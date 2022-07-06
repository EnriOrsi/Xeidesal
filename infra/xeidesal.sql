drop database if exists xeidesal;
create database xeidesal;
use xeidesal;

create table usuario(
	email varchar (255) unique primary key,
    tipo_usuario int, /* ADM = 0, User = 1 */
    nome varchar (666),
    sobrenome varchar (666),
    senha varchar (666),
    foto varchar (666),
    capa varchar (666)
);

insert into usuario set email="enri.orsi@gmail.com", tipo_usuario=1, nome="Enri", sobrenome="Bernardi Carvalho Orsi", senha=md5("enri2002"), foto="public/uploads/avatarO.png", capa="public/uploads/capa.png";

create table artista(
	id_artista int not null auto_increment primary key,
    artista varchar(666),
    foto_artista varchar(666),
    icon varchar(666),
    biografia varchar(666),
    email varchar(666),
    foreign key (email) references usuario (email)
);

INSERT INTO artista SET artista="Motionless In White", foto_artista="/public/artistas/MIW.jpg", icon="/public/artistas/icons/MIW.jpg", biografia="Motionless in White é uma banda de metal dos Estados Unidos formada em 2005 em Scranton, Pensilvânia. A banda é bastante conhecida pelos temas de horror em suas letras e maquiagens góticas. Atualmente tem um contrato com a Roadrunner Records. Ao longo de sua carreira, lançaram dois EPs e cinco álbums de estúdio", email="enri.orsi@gmail.com";
INSERT INTO artista SET artista="Bring Me The Horizon", foto_artista="/public/artistas/BMTH.jpg", icon="/public/artistas/icons/BMTH.jpg", biografia="Bring Me the Horizon é uma banda britânica de rock, formada em 2004 em Sheffield, South Yorkshire. O grupo é composto atualmente pelo vocalista Oliver Sykes, o guitarrista Lee Malia, o baixista Matt Kean, o baterista Matt Nicholls e o tecladista Jordan Fish.", email="enri.orsi@gmail.com";
INSERT INTO artista SET artista="Pierce The Veil", foto_artista="/public/artistas/PTV.jpg", icon="/public/artistas/icons/PTV.jpg", biografia="Pierce the Veil é uma banda de post-hardcore americana de San Diego, Califórnia formada em 2006. A banda foi formada pelos irmãos Vic e Mike Fuentes depois do fim da banda, que foi formada a partir da cena de punk rock de San Diego. Outros membros da banda incluem Tony Perry e Jaime Preciado.", email="enri.orsi@gmail.com";
INSERT INTO artista SET artista="While She Sleeps", foto_artista="/public/artistas/WSS.jpg", icon="/public/artistas/icons/WSS.jpg", biografia="While She Sleeps é uma banda britânica de metalcore de Sheffield. Formado em 2006, o grupo é formado pelo vocalista Lawrence Taylor, pelos guitarristas Sean Long e Mat Welsh, pelo baixista Aaran McKenzie e pelo baterista Adam Savage.", email="enri.orsi@gmail.com";

create table album(
	id_album int not null auto_increment primary key,
    album varchar(666),
    foto_album varchar(666),
    anoLancamento varchar(666),
    id_artista int,
    email varchar(666),
    foreign key (id_artista) references artista (id_artista),
    foreign key (email) references usuario (email)
);

INSERT INTO album SET album="Creatures", foto_album="/public/albuns/creatures.jpg", anoLancamento='2010', id_artista=1, email="enri.orsi@gmail.com";
INSERT INTO album SET album="Infamous", foto_album="/public/albuns/infamous.jpg", anoLancamento='2012', id_artista=1, email="enri.orsi@gmail.com";
INSERT INTO album SET album="Reincarnate", foto_album="/public/albuns/reincarnate.jpg", anoLancamento='2014', id_artista=1, email="enri.orsi@gmail.com";
INSERT INTO album SET album="Graveyard Shift", foto_album="/public/albuns/GS.jpg", anoLancamento='2017', id_artista=1, email="enri.orsi@gmail.com";
INSERT INTO album SET album="Disguise", foto_album="/public/albuns/disguise.jpg", anoLancamento='2019', id_artista=1, email="enri.orsi@gmail.com";
INSERT INTO album SET album="Suicide Season", foto_album="/public/albuns/suicideseason.jpg", anoLancamento='2008', id_artista=2, email="enri.orsi@gmail.com";
INSERT INTO album SET album="There Is A Hell Believe Me I've Seen It, There Is A Heaven Let's Keep It A Secret", foto_album="/public/albuns/theresahell.jpg", anoLancamento='2010', id_artista=2, email="enri.orsi@gmail.com";
INSERT INTO album SET album="Sempiternal", foto_album="/public/albuns/sempiternal.jpg", anoLancamento='2013', id_artista=2, email="enri.orsi@gmail.com";
INSERT INTO album SET album="That's The Spirit", foto_album="/public/albuns/TTS.jpg", anoLancamento='2015', id_artista=2, email="enri.orsi@gmail.com";
INSERT INTO album SET album="Amo", foto_album="/public/albuns/amo.jpg", anoLancamento='2019', id_artista=2, email="enri.orsi@gmail.com";
INSERT INTO album SET album="Post Human: Survival Horror", foto_album="/public/albuns/phsurvivalhorror.jpg", anoLancamento='2020', id_artista=2, email="enri.orsi@gmail.com";
INSERT INTO album SET album="A Flair For The Dramatic", foto_album="/public/albuns/aflairforthedramatic.jpg", anoLancamento='2007', id_artista=3, email="enri.orsi@gmail.com";
INSERT INTO album SET album="Selfish Machines", foto_album="/public/albuns/selfishmachines.jpg", anoLancamento='2010', id_artista=3, email="enri.orsi@gmail.com";
INSERT INTO album SET album="Collide With The Sky", foto_album="/public/albuns/collidewiththesky.jpg", anoLancamento='2012', id_artista=3, email="enri.orsi@gmail.com";
INSERT INTO album SET album="Misadventures", foto_album="/public/albuns/misadventures.jpg", anoLancamento='2016', id_artista=3, email="enri.orsi@gmail.com";
INSERT INTO album SET album="This Is The Six", foto_album="/public/albuns/thisisthesix.jpg", anoLancamento='2013', id_artista=4, email="enri.orsi@gmail.com";
INSERT INTO album SET album="Brainwashed", foto_album="/public/albuns/brainwashed.jpg", anoLancamento='2015', id_artista=4, email="enri.orsi@gmail.com";
INSERT INTO album SET album="You Are We", foto_album="/public/albuns/youarewe.jpg", anoLancamento='2017', id_artista=4, email="enri.orsi@gmail.com";
INSERT INTO album SET album="So What?", foto_album="/public/albuns/sowhat.jpg", anoLancamento='2019', id_artista=4, email="enri.orsi@gmail.com";
INSERT INTO album SET album="Sleep Society", foto_album="/public/albuns/sleepsociety.jpg", anoLancamento='2020', id_artista=4, email="enri.orsi@gmail.com";

create table musica(
	id_musica int not null auto_increment primary key,
    musica varchar(666),
    arquivo varchar(666),
    id_album int,
    id_artista int,
    email varchar(666),
    ordem int,
    foreign key (id_album) references album (id_album),
    foreign key (id_artista) references artista (id_artista),
    foreign key (email) references usuario (email)
);

INSERT INTO musica SET musica="Reincarnate", arquivo="/public/musics/reincarnate.mp3",  id_album=3, id_artista=1, email="enri.orsi@gmail.com", ordem=02;
INSERT INTO musica SET musica="Voices", arquivo="/public/musics/voices.mp3",  id_album=4, id_artista=1, email="enri.orsi@gmail.com", ordem=08;
INSERT INTO musica SET musica="Scissorhands (The Last Snow)", arquivo="/public/musics/scissorhands.mp3",  id_album=1, id_artista=1, email="enri.orsi@gmail.com", ordem=12;
INSERT INTO musica SET musica="Undead Ahead 2: The Tale of the Midnight Ride", arquivo="/public/musics/undeadahead2.mp3",  id_album=5, id_artista=1, email="enri.orsi@gmail.com", ordem=06;
INSERT INTO musica SET musica="Devil's Night", arquivo="/public/musics/devilsnight.mp3",  id_album=2, id_artista=1, email="enri.orsi@gmail.com", ordem=02;
INSERT INTO musica SET musica="</c0de>", arquivo="/public/musics/code.mp3",  id_album=5, id_artista=1, email="enri.orsi@gmail.com", ordem=03;
INSERT INTO musica SET musica="Diamonds Aren't Forever", arquivo="/public/musics/diamondsarentforever.mp3",  id_album=6, id_artista=2, email="enri.orsi@gmail.com", ordem=07;
INSERT INTO musica SET musica="It Never Ends", arquivo="/public/musics/itneverends.mp3",  id_album=7, id_artista=2, email="enri.orsi@gmail.com", ordem=03;
INSERT INTO musica SET musica="Empire (Let Them Sing)", arquivo="/public/musics/empireletthemsing.mp3",  id_album=8, id_artista=2, email="enri.orsi@gmail.com", ordem=03;
INSERT INTO musica SET musica="Avalanche", arquivo="/public/musics/avalanche.mp3",  id_album=9, id_artista=2, email="enri.orsi@gmail.com", ordem=07;
INSERT INTO musica SET musica="Mantra", arquivo="/public/musics/mantra.mp3",  id_album=10, id_artista=2, email="enri.orsi@gmail.com", ordem=02;
INSERT INTO musica SET musica="Kingslayer", arquivo="/public/musics/kingslayer.mp3",  id_album=11, id_artista=2, email="enri.orsi@gmail.com", ordem=06;
INSERT INTO musica SET musica="Dive In", arquivo="/public/musics/divein.mp3",  id_album=15, id_artista=3, email="enri.orsi@gmail.com", ordem=01;
INSERT INTO musica SET musica="Bulletproof Love", arquivo="/public/musics/bulletprooflove.mp3",  id_album=13, id_artista=3, email="enri.orsi@gmail.com", ordem=07;
INSERT INTO musica SET musica="Circles", arquivo="/public/musics/circles.mp3",  id_album=15, id_artista=3, email="enri.orsi@gmail.com", ordem=06;
INSERT INTO musica SET musica="King For A Day", arquivo="/public/musics/kingforaday.mp3",  id_album=14, id_artista=3, email="enri.orsi@gmail.com", ordem=04;
INSERT INTO musica SET musica="Caraphernelia", arquivo="/public/musics/caraphernelia.mp3",  id_album=13, id_artista=3, email="enri.orsi@gmail.com", ordem=04;
INSERT INTO musica SET musica="Floral & Fading", arquivo="/public/musics/floralfading.mp3",  id_album=15, id_artista=3, email="enri.orsi@gmail.com", ordem=04;
INSERT INTO musica SET musica="Sleep Society", arquivo="/public/musics/sleepsociety.mp3",  id_album=20, id_artista=4, email="enri.orsi@gmail.com";
INSERT INTO musica SET musica="ANTI-SOCIAL", arquivo="/public/musics/antisocial.mp3",  id_album=19, id_artista=4, email="enri.orsi@gmail.com", ordem=01;
INSERT INTO musica SET musica="Silence Speaks", arquivo="/public/musics/silencespeaks.mp3",  id_album=18, id_artista=4, email="enri.orsi@gmail.com", ordem=06;
INSERT INTO musica SET musica="HAUNT ME", arquivo="/public/musics/hauntme.mp3",  id_album=19, id_artista=4, email="enri.orsi@gmail.com", ordem=06;
INSERT INTO musica SET musica="Hurricane", arquivo="/public/musics/hurricane.mp3",  id_album=18, id_artista=4, email="enri.orsi@gmail.com", ordem=08;
INSERT INTO musica SET musica="I'VE SEEN IT ALL", arquivo="/public/musics/iveseenitall.mp3",  id_album=19, id_artista=4, email="enri.orsi@gmail.com", ordem=02;

create table musicasFavs(
	id_favs int not null auto_increment primary key,
    id_musica int,
    email varchar(666),
    foreign key (email) references usuario (email),
    foreign key (id_musica) references musica (id_musica)
);

create table artistasFavs(
	id_favs int not null auto_increment primary key,
    id_artista int,
    email varchar(666),
    foreign key (email) references usuario (email),
    foreign key (id_artista) references artista (id_artista)
);

create table albunsFavs(
	id_favs int not null auto_increment primary key,
    id_album int,
    email varchar(666),
    foreign key (email) references usuario (email),
    foreign key (id_album) references album (id_album)
);

SELECT musica.id_musica, musica.id_album, musica.id_artista, musica.email, musica.musica, musica.arquivo, album.album, album.foto_album, album.anoLancamento, artista.artista, artista.foto_artista, artista.biografia FROM musica INNER JOIN album ON musica.id_album = album.id_album AND musica.id_artista = album.id_artista INNER JOIN artista ON artista.id_artista = album.id_artista AND musica.id_artista = artista.id_artista WHERE artista.id_artista = album.id_artista AND musica.id_artista = artista.id_artista ORDER BY artista.artista;
SELECT musica.id_musica, musica.id_album, musica.id_artista, musica.email, musica.musica, musica.arquivo, album.album, album.foto_album, album.anoLancamento, artista.artista, artista.foto_artista, artista.biografia FROM musica INNER JOIN album ON musica.id_album = album.id_album AND musica.id_artista = album.id_artista INNER JOIN artista ON artista.id_artista = album.id_artista AND musica.id_artista = artista.id_artista WHERE artista.id_artista = album.id_artista AND musica.id_artista = artista.id_artista ORDER BY artista.artista, album.anoLancamento DESC;

select *from usuario;
select *from artista;
select *from album;
select *from musica;
select *from musicasFavs;
select *from artistasFavs;
select *from albunsFavs;
