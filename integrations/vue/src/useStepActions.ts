import type { ActivityComponentType } from "./activity";
import { makeStepId } from "./activity";
import type { BaseActivities } from "./BaseActivities";
import { useCoreActions } from "./core";

export type UseStepActionsOutputType<P> = {
  // pending: boolean;
  stepPush: (params: P, options?: {}) => void;
  stepReplace: (params: P, options?: {}) => void;
  stepPop: (options?: {}) => void;
};

export type UseStepActions<T extends BaseActivities = {}> = <
  K extends Extract<keyof T, string>,
>(
  activityName: K,
) => UseStepActionsOutputType<
  T[K] extends
    | ActivityComponentType<infer U extends { [K in keyof U]: string | undefined; }>
    | { component: ActivityComponentType<infer U extends { [K in keyof U]: string | undefined; }> }
    ? U
    : {}
>;

export const useStepActions: UseStepActions = () => {
  const coreActions = useCoreActions();

  return {
		stepPush(params) {
			const stepId = makeStepId();

			coreActions?.stepPush({
				stepId,
				stepParams: params,
			});
		},
		stepReplace(params) {
			const stepId = makeStepId();

			coreActions?.stepReplace({
				stepId,
				stepParams: params,
			});
		},
		stepPop() {
			coreActions?.stepPop({});
		},
	};
};
