import { useFetchWrapper } from './fetch-wrapper'

export { useReactionsFetcher };

function useReactionsFetcher() {

  const api = useFetchWrapper();

  return {
    index,
    collectionSelectOptions,
    reactionSelectOptions
  }

  function index() {
    var path = `/reaction_processes.json`

    if (localStorage.getItem('filter_collection_id')) {
      path = path + '?' + new URLSearchParams({ collection_id: localStorage.getItem('filter_collection_id') })
    }
    return api.get(path)
  }

  function collectionSelectOptions() {
    return api.get(`/reaction_processes/collection_select_options.json`);
  }

  function reactionSelectOptions() {
    // {label:, value:} are piggybacked onto the reaction processes so they can be used conveniently for select options as well.
    return index();
  }

}
