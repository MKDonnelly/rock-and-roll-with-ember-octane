import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import Band from 'rock-and-roll-ember-octane/models/band';
import Song from 'rock-and-roll-ember-octane/models/song';

export default class BandsRoute extends Route {
  @service catalog;

  async model() {
    // Pull all songs from the server
    const songsResponse = await fetch('http://localhost:5000/v1/songs');
    const songsJson = await songsResponse.json();
    const songs = songsJson.songs.map((songJSON) => new Song(songJSON));

    // Pull all bands from the server
    const bandsResponse = await fetch('http://localhost:5000/v1/bands');
    const bandsJson = await bandsResponse.json();
    const bands = bandsJson.bands.map((bandJSON) => new Band(bandJSON));

    // Pair up the bands to their respective songs
    bands.map(function(band) {
      band.songs = songs.filter((song) => song.band === band.id);
    });

    // Pair up the songs to their respective bands.
    songs.map(function(song) {
      song.band = bands.filter((band) => band.id === song.band);
    });

    bands.map((band) => this.catalog.add('band', band));
    songs.map((song) => this.catalog.add('song', song));

    return this.catalog.bands;
  }
}
