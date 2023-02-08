// import type { StackflowVuePlugin } from "@stackflow/vue";
import type { Activity, Stack, StackflowPlugin } from "@stackflow/core";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import {
  type InjectionKey,
  type VNode,
  defineComponent,
  h,
  inject,
  provide,
} from "vue";

import * as theme from "./theme.css";
import type { RecursivePartial } from "./utils";
import { compact, compactMap, isBrowser } from "./utils";

type StackflowVuePlugin<T = never> = () => {
  /**
   * Determine how to render by using the stack state
   */
  render?: (args: {
    stack: Stack & {
      render: (overrideStack?: Partial<Stack>) => {
        activities: Array<
          Activity & {
            key: string;
            render: (overrideActivity?: Partial<Activity>) => VNode;
          }
        >;
      };
    };
  }) => VNode | null;

  /**
   * Wrap `<Stack />` component with your `Provider` or custom elements
   */
  wrapStack?: (args: {
    stack: Stack & {
      render: () => VNode;
    };
  }) => VNode | null;

  /**
   * Wrap an activity with your `Provider` or custom elements
   */
  wrapActivity?: (args: {
    activity: Activity & {
      render: () => VNode;
    };
  }) => VNode | null;
} & ReturnType<StackflowPlugin>;

type BasicUIPluginOptions = RecursivePartial<theme.GlobalVars> & {
  theme: "android" | "cupertino";
  rootClassName?: string;
  appBar?: {
    backButton?:
      | {
          renderIcon?: () => VNode;
          ariaLabel?: string;
        }
      | {
          render?: () => VNode;
        };
    closeButton?:
      | {
          renderIcon?: () => VNode;
          ariaLabel?: string;
          onClick?: (e: MouseEvent) => void;
        }
      | {
          render?: () => VNode;
        };
  };
};
const GLOBAL_OPTIONS_CONTEXT_KEY = Symbol(
  "stackflow-global-options-context-key",
) as InjectionKey<BasicUIPluginOptions>;

export const provideGlobalOptions = (options: BasicUIPluginOptions) =>
  provide(GLOBAL_OPTIONS_CONTEXT_KEY, options);

export function useGlobalOptions() {
  return inject(GLOBAL_OPTIONS_CONTEXT_KEY);
}

export const basicUIPlugin: (
  options: BasicUIPluginOptions,
) => StackflowVuePlugin = (options) => () => ({
  key: "basic-ui",
  wrapStack({ stack }) {
    const GlobalOptionsProvider = defineComponent({
      setup() {
        provideGlobalOptions(options);
      },
      template: `<slot />`,
    });
    return h(
      GlobalOptionsProvider,
      h(
        "div",
        {
          class: isBrowser()
            ? compact([theme[options.theme], options.rootClassName]).join(" ")
            : options.rootClassName,
          style: assignInlineVars(
            compactMap({
              [theme.globalVars.backgroundColor]: options.backgroundColor,
              [theme.globalVars.dimBackgroundColor]: options.dimBackgroundColor,
              [theme.globalVars.transitionDuration]:
                stack.globalTransitionState === "loading"
                  ? `${stack.transitionDuration}ms`
                  : "0ms",
              [theme.globalVars.appBar.borderColor]:
                options.appBar?.borderColor,
              [theme.globalVars.appBar.borderSize]: options.appBar?.borderSize,
              [theme.globalVars.appBar.height]: options.appBar?.height,
              [theme.globalVars.appBar.iconColor]: options.appBar?.iconColor,
              [theme.globalVars.appBar.textColor]: options.appBar?.textColor,
              [theme.globalVars.bottomSheet.borderRadius]:
                options.bottomSheet?.borderRadius,
              [theme.globalVars.modal.borderRadius]:
                options.modal?.borderRadius,
            }),
          ),
        },
        stack.render(),
      ),
    );
  },
});
