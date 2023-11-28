import { useElnApi } from "./elnApi";

export { useVesselsFetcher };

function useVesselsFetcher() {

  const api = useElnApi()

  return {
    index
  }

  function index() {
    return api.get('/vessels');
  }
}




