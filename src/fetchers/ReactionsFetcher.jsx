import { apiHostname } from '../Constants';
import { useFetchWrapper } from './fetch-wrapper'

export { useReactionsFetcher };

function useReactionsFetcher() {

  const api = useFetchWrapper();

  return {
    index,
    svgImage,
    collectionSelectOptions,
    reactionSelectOptions,
    getReactionProcess,
    updateProvenance,
    ordLinkTarget,
    updateSamplePreparation,
    deleteSamplePreparation,
    createProcessStep,
    updateProcessStep,
    deleteProcessStep,
    createAction,
    updateAction,
    deleteAction,
    updateActionPosition,
    updateProcessStepPosition
  }

  function index() {
    var path = `/reaction_processes`

    if (localStorage.getItem('filter_collection_id')) {
      path = path + '?' + new URLSearchParams({ collection_id: localStorage.getItem('filter_collection_id') })
    }
    return api.get(path);
  }

  function svgImage(reaction) {
    // Note that this is not an api call but a link target.
    return `${apiHostname}/images/reactions/${reaction.reaction_svg_file}`
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

  function createProcessStep(reactionProcessId, processStep) {
    return api.post(`/reaction_processes/${reactionProcessId}/reaction_process_steps`, { 'reaction_process_step': processStep })
  }

  function updateProcessStep(processStep) {
    return api.put(`/reaction_process_steps/${processStep.id}`, { 'reaction_process_step': processStep })
  }

  function deleteProcessStep(id) {
    return api.delete(`/reaction_process_steps/${id}`)
  }

  function updateProcessStepPosition(id, position) {
    return api.put(`/reaction_process_steps/${id}/update_position`, { 'position': position })
  }

  function createAction(processStepId, action, insertBefore) {
    return api.post(`/reaction_process_steps/${processStepId}/actions`, { 'action': action, 'insert_before': insertBefore })
  }

  function updateAction(action) {
    return api.put(`/reaction_process_actions/${action.id}`, { 'action': action })
  }

  function deleteAction(id) {
    return api.delete(`/reaction_process_actions/${id}`)
  }

  function updateActionPosition(id, position) {
    return api.put(`/reaction_process_actions/${id}/update_position`, { 'position': position })
  }

}
