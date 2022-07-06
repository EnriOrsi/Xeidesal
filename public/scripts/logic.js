$('a#favArtists').on('click', function () {
    $("div#favArtists").removeClass("invisible");
    $("div#favAlbuns").addClass("invisible");
    $("div#usersTop").addClass("invisible");
    $('div#topArtists').addClass('invisible');
    $('div#topMusics').addClass('invisible');

    $("div#favArtists").addClass("visible");
    $("div#favAlbuns").removeClass("visible");
    $("div#usersTop").removeClass("visible");
    $('div#topArtists').removeClass('visible');
    $('div#topMusics').removeClass('visible');
});

$('a#favAlbuns').on('click', function () {
    $("div#favArtists").addClass("invisible");
    $("div#favAlbuns").removeClass("invisible");
    $("div#usersTop").addClass("invisible");
    $('div#topArtists').addClass('invisible');
    $('div#topMusics').addClass('invisible');

    $("div#favArtists").removeClass("visible");
    $("div#favAlbuns").addClass("visible");
    $("div#usersTop").removeClass("visible");
    $('div#topArtists').removeClass('visible');
    $('div#topMusics').removeClass('visible');
});

$('a#usersTop').on('click', function () {
    $("div#favArtists").addClass("invisible");
    $("div#favAlbuns").addClass("invisible");
    $("div#usersTop").removeClass("invisible");
    $('div#topArtists').addClass('invisible');
    $('div#topMusics').addClass('invisible');

    $("div#favArtists").removeClass("visible");
    $("div#favAlbuns").removeClass("visible");
    $("div#usersTop").addClass("visible");
    $('div#topArtists').removeClass('visible');
    $('div#topMusics').removeClass('visible');
});

$('a#topArtists').on('click', function(){
    $('a#topArtists').addClass('active');
    $('a#topMusics').removeClass('active');

    $('div#topArtists').removeClass('invisible');
    $('div#topMusics').addClass('invisible');

    $('div#topArtists').addClass('visible');
    $('div#topMusics').removeClass('visible');
});

$('a#topMusics').on('click', function(){
    $('a#topArtists').removeClass('active');
    $('a#topMusics').addClass('active');

    $('div#topArtists').addClass('invisible');
    $('div#topMusics').removeClass('invisible');

    $('div#topArtists').removeClass('visible');
    $('div#topMusics').addClass('visible');
});