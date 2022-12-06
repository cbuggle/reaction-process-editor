import { elnBaseURL } from '../Constants'

export default class ReactionsFetcher {

  static indexResponse = () => {
    var url = `${elnBaseURL}/api/v1/reaction_processes.json`

    if (localStorage.getItem('filter_collection_id')) {
      url = url + '?' + new URLSearchParams({ collection_id: localStorage.getItem('filter_collection_id') })
    }

    const promise = fetch((url), {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Authorization": "Bearer " + localStorage.jwt
      }
    });

    return promise;
  }

}
