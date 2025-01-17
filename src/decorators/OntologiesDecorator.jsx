export default class OntologiesDecorator {

  static filterByDependencies = ({ roleName, workup, options }) => {

    return options.filter((option) => {
      let roles = option.roles[roleName]

      return option.active && roles?.find(role => {
        return Object
          .entries(role)
          .every(([dependency_key, dependencies]) => dependencies.includes(workup[dependency_key]))
      })
    })
  }

  static find_by = (ontology_id, options) => options.find(option => option.ontology_id === ontology_id)
  static findAllByChmoId = (ontology_ids, options) => options.filter(option => ontology_ids?.includes(option.ontology_id))

  static find_all_by = (ontology_ids, options) => options.filter(option => ontology_ids?.includes(option.ontology_id))

}
