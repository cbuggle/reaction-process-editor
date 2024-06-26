import MetricsDecorator from "./MetricsDecorator";
import StringDecorator from "./StringDecorator";
import OptionsDecorator from "./OptionsDecorator";
export default class PurifyDecorator {


  static filtrationStepInfo = (stepData, purifySolventOptions) => {

    const solventsList = OptionsDecorator.optionsArrayToLabel(
      stepData.solvents?.map((solvent) => solvent.id),
      purifySolventOptions
    );

    let ratioList = "";

    if (stepData.solvents?.length > 1) {
      ratioList = StringDecorator.brackets(
        stepData.solvents.map((solvent) => solvent.ratio).join(":")
      );
    }

    const infoStrings = [
      MetricsDecorator.infoLineAmount(stepData.amount),
      solventsList,
      ratioList,
    ];

    if (stepData.step_mode) {
      infoStrings.push(
        StringDecorator.brackets(
          StringDecorator.toLabelSpelling(stepData.step_mode)
        )
      );
    }

    if (stepData.prod_mode) {
      infoStrings.push(
        StringDecorator.brackets(
          "prod: " + StringDecorator.toLabelSpelling(stepData.prod_mode)
        )
      );
    }

    if (stepData.repetitions) {
      infoStrings.push(
        StringDecorator.brackets(
          stepData.repetitions.value +
          " " +
          MetricsDecorator.label("REPETITIONS")
        )
      );
    }

    return infoStrings.join(" ");
  };

  static chromatographyStepInfo = (stepData, purifySolventOptions) => {
    const solventsList = OptionsDecorator.optionsArrayToLabel(
      stepData.solvents.map((s) => s.id),
      purifySolventOptions
    );
    let ratioList = "";

    if (stepData.solvents.length > 1) {
      ratioList = StringDecorator.brackets(
        stepData.solvents.map((solvent) => solvent.ratio).join(":")
      );
    }

    return [
      MetricsDecorator.infoLineAmount(stepData.amount),
      solventsList,
      ratioList,
    ].join(" ");
  };

}
