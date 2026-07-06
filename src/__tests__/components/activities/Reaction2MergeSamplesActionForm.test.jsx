import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ActivityInfo from "../../../components/activities/ActivityInfo";
import { SelectOptions } from "../../../contexts/SelectOptions";
import {
  actionModes,
  runActionFormSpecs,
} from "../../../testSupport/reaction2ActionFormSpecSupport";
import {
  fixtureVessel,
  reaction2Process,
} from "../../../testSupport/reaction2TestHelpers";

const [sample1, sample2] = reaction2Process.select_options.materials.SAMPLE;
const mergeSamplesVessel = {
  ...fixtureVessel,
  automation_modes: actionModes.map(({ value }) => value),
};

runActionFormSpecs({
  activityName: "MERGE_SAMPLES",
  vessels: [mergeSamplesVessel],
  fillHappyPath: () => {
    userEvent.click(screen.getByRole("button", { name: mergeSamplesVessel.label }));
  },
  expectedActivity: () => ({
    reaction_process_vessel: expect.objectContaining({
      id: mergeSamplesVessel.id,
      vesselable_type: mergeSamplesVessel.vesselable_type,
    }),
  }),
});

describe("reaction 2 MERGE_SAMPLES ActivityInfo", () => {
  test("renders source and target sample names", () => {
    render(
      <SelectOptions.Provider value={reaction2Process.select_options}>
        <ActivityInfo
          activity={{
            activity_name: "MERGE_SAMPLES",
            workup: {
              source_sample_id: sample1.value,
              target_sample_id: sample2.value,
            },
          }}
        />
      </SelectOptions.Provider>
    );

    expect(screen.getByRole("heading", {
      name: `${sample1.label} -> ${sample2.label}`,
    })).toBeInTheDocument();
  });
});
