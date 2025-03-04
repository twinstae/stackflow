import type { DomainEvent } from "../event-types";
import type { Activity, ActivityTransitionState } from "../Stack";
import { findIndices, last } from "../utils";

function isActivityNotExited(activity: Activity) {
  return !activity.exitedBy;
}

function compareActivitiesByEventDate(a1: Activity, a2: Activity) {
  return a2.enteredBy.eventDate - a1.enteredBy.eventDate;
}

function findLatestActiveActivity(activities: Activity[]) {
  return activities
    .filter(isActivityNotExited)
    .sort(compareActivitiesByEventDate)[0];
}

export default function findTargetActivityIndexes(
  activities: Activity[],
  event: DomainEvent,
  isTransitionDone: boolean,
): number[] {
  const targetActivities: number[] = [];

  switch (event.name) {
    case "Replaced": {
      const alreadyExistingActivityIndex = last(
        findIndices(activities, (activity) => activity.id === event.activityId),
      );

      if (alreadyExistingActivityIndex !== undefined) {
        break;
      }

      const sorted = activities.slice().sort(compareActivitiesByEventDate);

      const transitionState: ActivityTransitionState =
        event.skipEnterActiveState || isTransitionDone
          ? "enter-done"
          : "enter-active";

      if (transitionState === "enter-done") {
        for (const activity of sorted) {
          if (activity.exitedBy) {
            break;
          }

          targetActivities.push(activities.indexOf(activity));

          if (activity.enteredBy.name === "Pushed") {
            break;
          }
        }
      }
      break;
    }
    case "Popped": {
      const latestActivity = findLatestActiveActivity(activities.slice(1));

      if (latestActivity) {
        targetActivities.push(activities.indexOf(latestActivity));
      }
      break;
    }
    case "StepPushed":
    case "StepReplaced": {
      const latestActivity = findLatestActiveActivity(activities);

      if (latestActivity) {
        targetActivities.push(activities.indexOf(latestActivity));
      }
      break;
    }
    case "StepPopped": {
      const latestActivity = findLatestActiveActivity(activities);

      if (latestActivity && latestActivity.steps.length > 1) {
        targetActivities.push(activities.indexOf(latestActivity));
      }

      break;
    }
    default:
      break;
  }
  return targetActivities;
}
