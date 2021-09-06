import Route from '@ember/routing/route';
import { tracked } from '@glimmer/tracking';

class Band {
  @tracked name;

  constructor({ id, name, songs }) {
    this.id = id;
    this.name = name;
    this.songs = songs.map((songJSON) => new Song(songJSON));
  }
}

class Song {
  constructor({ title, rating, band }) {
    this.title = title;
    this.rating = rating ?? 0;
    this.band = band;
  }
}

export default class BandsRoute extends Route {
  async model() {
    const response = await fetch('http://localhost:5000/v1/bands');
    const json = await response.json();
    return json.bands.map((bandJSON) => new Band(bandJSON));
  }
}
