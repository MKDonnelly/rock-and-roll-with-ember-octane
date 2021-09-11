import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import Band from 'rock-and-roll-ember-octane/models/band';
import Song from 'rock-and-roll-ember-octane/models/song';

export default class BandsRoute extends Route {
  @service catalog;

  async model() {
    const bandsResponse = await fetch('http://localhost:5000/v1/bands');
    const bandsJson = await bandsResponse.json();
    const bands = bandsJson.bands.map((bandJSON) => new Band(bandJSON));
    bands.map((band) => this.catalog.add('band', band));

    const songsResponse = await fetch('http://localhost:5000/v1/songs');
    const songsJson = await songsResponse.json();
    const songs = songsJson.songs.map((songJSON) => new Song(songJSON));
    songs.map((song) => this.catalog.add('song', song))

    return this.catalog.bands;
  }
}
