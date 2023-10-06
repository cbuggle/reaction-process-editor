import { useElnApi } from "./elnApi";

export { useVesselsFetcher };

function useVesselsFetcher() {

  const api = useElnApi()

  return {
    index,
    create,
    update,
    destroy
  }

  function index() {
    //  unused??
    return api.get('/vessels');
  }

  function create(vessel, reactionProcessId, assignToReaction) {
    const body = {
      assign_to_reaction: assignToReaction,
      vessel: vessel,
      reaction_process_id: reactionProcessId
    }
    return api.post(`/vessels`, body);
  }

  function update(vessel) {
    return api.put(`/vessels/${vessel.id}`, { vessel: vessel });
  }

  function destroy(id) {
    return api.delete(`/vessels/${id}`);
  }
}




