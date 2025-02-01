export default class OntologiesDecorator {

  static labelForOntologyId = ({ ontologyId, ontologies }) =>
    this.findByOntologyId({ ontologyId: ontologyId, ontologies: ontologies })?.label

  static findByOntologyId = ({ ontologyId, ontologies }) =>
    ontologyId && ontologies?.find(option => ontologyId === option.ontology_id)

  static findAllByOntologyIds = ({ ontologyIds, ontologies }) =>
    ontologies.filter(option => ontologyIds?.includes(option.ontology_id))

  static createUnavailableOption = ({ ontologyId }) => ontologyId && { ontology_id: ontologyId, value: ontologyId, label: ontologyId, unavailable: true, roles: [] }

  static activeOptionsMeetingDependencies = ({ roleName, workup, options }) => {
    return options.filter((option) => {
      let roles = option.roles[roleName]

      return option.active && roles?.find(role => {
        return Object
          .entries(role)
          .every(([dependency_key, dependencies]) => dependencies.includes(workup[dependency_key]))
      })
    })
  }

  static selectableOptions = ({ roleName, options, ontologies, workup }) => {
    options ||= ontologies
    let currentValue = workup[roleName]
    let activeDependencyOptions = this.activeOptionsMeetingDependencies({ roleName: roleName, options: options, workup: workup })


    if (currentValue && !this.findByOntologyId({ ontologyId: currentValue, ontologies: activeDependencyOptions })) {
      let missingCurrentOption =
        this.findByOntologyId({ ontologyId: currentValue, ontologies: ontologies })
        || this.createUnavailableOption({ ontologyId: currentValue })

      activeDependencyOptions.push({ ...missingCurrentOption, unmetDependency: true })
    }
    return activeDependencyOptions
  }

  static selectableMultiOptions = ({ roleName, ontologies, options, workup }) => {
    options ||= ontologies
    let currentValues = workup[roleName]
    let activeDependencyOptions = this.activeOptionsMeetingDependencies({ roleName: roleName, options: options, workup: workup })

    currentValues?.forEach(currentValue => {
      if (currentValue && !this.findByOntologyId({ ontologyId: currentValue, ontologies: activeDependencyOptions })) {
        let missingCurrentOption = this.findByOntologyId({ ontologyId: currentValue, ontologies: ontologies })
          || this.createUnavailableOption({ ontologyId: currentValue })

        activeDependencyOptions.push({ ...missingCurrentOption, unmetDependency: true })
      }
    }
    )
    return activeDependencyOptions
  }
}
