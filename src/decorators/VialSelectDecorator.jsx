export default class VialSelectDecorator {

  static colorFor = (currentVialGroup) => {

    currentVialGroup ||= 0
    return (
      ["#000000",
        "#469110",
        "#660033",
        "#3399AA",
        "#66520A",
        "#A2574F",
        "#E68057",
        "#003366",
        "#993A8B",
        "#AA3300",
        "#ff0000",
        "#00ff00",
        "#0000ff",
      ][currentVialGroup]
    )
  }
}
