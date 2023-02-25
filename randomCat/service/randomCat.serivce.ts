import http from 'http';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CatFetcher {
  /** Fetch a random cat image url from random.cat */
  fetchCat(): Promise<string> {
    return new Promise((resolve) => {
      http.get('http://aws.random.cat/meow', (resp) => {
        let data = '';
        resp.on('data', chunk => data += chunk);
        resp.on('end', () => resolve(JSON.parse(data).file));
      });
    });
  }
}