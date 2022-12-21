import { apiHostname } from '../Constants';
import { useFetchWrapper } from './fetch-wrapper'

export { useReactionsFetcher };

function useReactionsFetcher() {

  const api = useFetchWrapper();

  return {
    index,
    collectionSelectOptions,
    reactionSelectOptions,
    getReactionProcess,
    updateProvenance,
    ordLinkTarget,
    updateSamplePreparation,
    deleteSamplePreparation,
    createProcessStep,
    deleteProcessStep
  }

  function index() {
    var path = `/reaction_processes`

    if (localStorage.getItem('filter_collection_id')) {
      path = path + '?' + new URLSearchParams({ collection_id: localStorage.getItem('filter_collection_id') })
    }
    return api.get(path);
  }

  function collectionSelectOptions() {
    return api.get(`/reaction_processes/collection_select_options`);
  }

  function reactionSelectOptions() {
    // {label:, value:} are piggybacked onto the reaction processes so index can be used conveniently for select options as well.
    return index();
  }

  function getReactionProcess(id) {
    return api.get(`/reactions/${id}/reaction_process`);
  }

  function updateProvenance(provenance) {
    return api.put(`/reaction_processes/${provenance.reaction_process_id}/provenance.json`, { 'provenance': provenance });
  }

  function ordLinkTarget(id) {
    // Note that this is not an api call but a link target.
    return `${apiHostname}/reactions/${id}/ord`
  }

  function updateSamplePreparation(reactionProcessId, samplePreparation) {
    return api.put(`/reaction_processes/${reactionProcessId}/samples_preparations`, { 'sample_preparation': samplePreparation })
  }

  function deleteSamplePreparation(reactionProcessId, id) {
    return api.delete(`/reaction_processes/${reactionProcessId}/samples_preparations/${id}`)
  }

  function createProcessStep(reactionProcessId) {
    return api.post(`/reaction_processes/${reactionProcessId}/reaction_process_steps`)
  }

  function deleteProcessStep(id) {
    return api.delete(`/reaction_process_step/${id}`)
  }
}
