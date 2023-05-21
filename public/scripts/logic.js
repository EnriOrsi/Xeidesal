$('a#lastTracks').on('click', function () {
    $('a#lastTracks').addClass('active');
    $('a#topArtists').removeClass('active');
    $('a#topMusics').removeClass('active');
    $('a#followedArtists').removeClass('active');
    $('a#savedAlbuns').removeClass('active');

    $('div#lastTracks').html(lastTracks);
    $('div#topArtists').html('');
    $('div#topMusics').html('');
    $('div#followedArtists').html('');
    $('div#savedAlbuns').html('');
});

$('a#topArtists').on('click', function () {
    $('a#lastTracks').removeClass('active');
    $('a#topArtists').addClass('active');
    $('a#topMusics').removeClass('active');
    $('a#followedArtists').removeClass('active');
    $('a#savedAlbuns').removeClass('active');

    $('div#lastTracks').html('');
    $('div#topArtists').html(topArtists);
    $('div#topMusics').html('');
    $('div#followedArtists').html('');
    $('div#savedAlbuns').html('');
});

$('a#topMusics').on('click', function () {
    $('a#lastTracks').removeClass('active');
    $('a#topArtists').removeClass('active');
    $('a#topMusics').addClass('active');
    $('a#followedArtists').removeClass('active');
    $('a#savedAlbuns').removeClass('active');

    $('div#lastTracks').html('');
    $('div#topArtists').html('');
    $('div#topMusics').html(topMusics);
    $('div#followedArtists').html('');
    $('div#savedAlbuns').html('');
});

$('a#followedArtists').on('click', function () {
    $('a#lastTracks').removeClass('active');
    $('a#topArtists').removeClass('active');
    $('a#topMusics').removeClass('active');
    $('a#followedArtists').addClass('active');
    $('a#savedAlbuns').removeClass('active');

    $('div#lastTracks').html('');
    $('div#topArtists').html('');
    $('div#topMusics').html('');
    $('div#followedArtists').html(followedArtists);
    $('div#savedAlbuns').html('');
});

$('a#savedAlbuns').on('click', function () {
    $('a#lastTracks').removeClass('active');
    $('a#topArtists').removeClass('active');
    $('a#topMusics').removeClass('active');
    $('a#followedArtists').removeClass('active');
    $('a#savedAlbuns').addClass('active');

    $('div#lastTracks').html('');
    $('div#topArtists').html('');
    $('div#topMusics').html('');
    $('div#followedArtists').html('');
    $('div#savedAlbuns').html(savedAlbuns);
});