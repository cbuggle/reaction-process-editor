import { render, screen } from "@testing-library/react";

import ActivityInfo from "../../../components/activities/ActivityInfo";
import { SelectOptions } from "../../../contexts/SelectOptions";
import {
  fillIfPresent,
  runActionFormSpecs,
} from "../../../testSupport/reaction2ActionFormSpecSupport";
import { reaction2Process } from "../../../testSupport/reaction2TestHelpers";

runActionFormSpecs({
  activityName: "GAS_EXCHANGE",
  fillHappyPath: () => {
    fillIfPresent.select("solvents", "CHEBI:17997");
  },
});

describe("reaction 2 GAS_EXCHANGE ActivityInfo", () => {
  test("renders selected gas names", () => {
    render(
      <SelectOptions.Provider value={reaction2Process.select_options}>
        <ActivityInfo
          activity={{
            activity_name: "GAS_EXCHANGE",
            workup: {
              gas_type: ["CHEBI:17997"],
            },
          }}
        />
      </SelectOptions.Provider>
    );

    expect(screen.getByRole("heading", { name: "N2" })).toBeInTheDocument();
  });
});
