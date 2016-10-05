import { Injectable }    from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';


@Injectable()
export class GitHubService {
  private url: string = 'https://api.github.com/search/repositories?q=language:javascript&sort=stars&order=desc&per_page=100';

  constructor(private http: Http) { }

  // Get all items from API call
  public getAll() : Promise<any> {
    return this.http.get(this.url).toPromise().then(
      response => {
        return response.json().items;
      }
    ).catch(GitHubService.handleError);
  }

  // Handle error
  private static handleError(error: any) : Promise<any> {
    alert('An error occurred with the server:\n' + error.status +
      ', ' + error.statusText);
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
