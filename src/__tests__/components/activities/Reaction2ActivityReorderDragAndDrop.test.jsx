import {
  mockReactDndDropSpecs,
  mockUpdateActivityPosition,
  reaction2Process,
  reaction2Step,
  renderReaction2Steps,
  resetReaction2Mocks,
} from "../../../testSupport/reaction2TestHelpers";

const activity = ({ id, name, position }) => ({
  id,
  value: id,
  step_id: "reaction-2-step-1",
  activity_name: name,
  position,
  workup: {
    automation_control: { status: "CAN_RUN" },
    automation_mode: reaction2Process.initial_conditions.automation_mode,
    description: `${name} activity`,
  },
  preconditions: reaction2Process.initial_conditions,
  fractions: [],
});

const processWithReorderableActivities = () => {
  const activities = [
    activity({ id: "reaction-2-add-activity", name: "ADD", position: 0 }),
    activity({ id: "reaction-2-mixing-activity", name: "MIXING", position: 1 }),
    activity({ id: "reaction-2-wait-activity", name: "WAIT", position: 2 }),
  ];
  const step = reaction2Step("Reorder activities", 0, {
    id: "reaction-2-step-1",
    value: "reaction-2-step-1",
    label: "1/1 Reorder activities",
    activities,
  });

  return {
    ...reaction2Process,
    reaction_process_steps: [step],
  };
};

describe("reaction 2 activity drag and drop reordering", () => {
  beforeEach(() => {
    resetReaction2Mocks();
  });

  test("reorders multiple activities on one ProcessStep by dropping one activity onto another", () => {
    renderReaction2Steps({
      reactionProcess: processWithReorderableActivities(),
    });

    const activityDropSpecs = mockReactDndDropSpecs.filter((spec) => spec.accept === "action");
    expect(activityDropSpecs).toHaveLength(3);
    const waitActivityDropSpec = activityDropSpecs[2];

    waitActivityDropSpec.drop({
      activity: {
        id: "reaction-2-add-activity",
        step_id: "reaction-2-step-1",
      },
    });

    expect(mockUpdateActivityPosition).toHaveBeenCalledWith(
      "reaction-2-add-activity",
      2
    );
  });

  test("does not reorder when an activity is dropped onto itself", () => {
    renderReaction2Steps({
      reactionProcess: processWithReorderableActivities(),
    });

    const activityDropSpecs = mockReactDndDropSpecs.filter((spec) => spec.accept === "action");
    expect(activityDropSpecs).toHaveLength(3);
    const firstActivityDropSpec = activityDropSpecs[0];

    firstActivityDropSpec.drop({
      activity: {
        id: "reaction-2-add-activity",
        step_id: "reaction-2-step-1",
      },
    });

    expect(mockUpdateActivityPosition).not.toHaveBeenCalled();
  });
});
