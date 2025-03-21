export default class VialSelectDecorator {

  static colorFor = (currentVialGroup) => {

    currentVialGroup ||= 0

    return (
      ["#660033",
        "#469110",
        "#00520A",
        "#A2574F",
        "#E68057",
        "#993A8B",
        "#993A8B",
      ][currentVialGroup]
    )
  }
}
