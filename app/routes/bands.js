import Route from '@ember/routing/route';
import { tracked } from '@glimmer/tracking';

class Band {
  @tracked name;

  constructor(name) {
    this.name = name;
  }
}

export default class BandsRoute extends Route {
  async model() {
    const response = await fetch('http://localhost:5000/v1/test');
    const json = await response.json();
    return json.data.map((bandJSON) => new Band(bandJSON.name));
  }
}
