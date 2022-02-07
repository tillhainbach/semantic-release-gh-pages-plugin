/**
 * Flowtype definitions for index
 * Generated by Flowgen from a Typescript Definition
 * Flowgen v1.17.0
 */

declare module "@qiwi/semantic-release-gh-pages-plugin" {
  declare export * from "@qiwi/semantic-release-gh-pages-plugin/target/es6";
}

declare module "@qiwi/semantic-release-gh-pages-plugin/target/es6" {
  import type { TContext } from "@qiwi/semantic-release-gh-pages-plugin/target/es6/interface";

  declare export * from "@qiwi/semantic-release-gh-pages-plugin/target/es6/defaults";

  declare export var verifyConditions: (
    pluginConfig: any,
    context: TContext
  ) => Promise<void>;
  declare export var publish: (
    pluginConfig: any,
    context: TContext
  ) => Promise<mixed>;
  declare var _default: {
    verifyConditions: (pluginConfig: any, context: TContext) => Promise<void>,
    publish: (pluginConfig: any, context: TContext) => Promise<mixed>,
    ...
  };
  declare export default typeof _default;
}

declare module "@qiwi/semantic-release-gh-pages-plugin/target/es6/interface" {
  import type { BranchSpec, Context } from "semantic-release";

  declare export interface ILogger {
    log: (message: string, ...vars: any[]) => void;
    error: (message: string, ...vars: any[]) => void;
  }
  declare export type TAnyMap = {
    [key: string]: any,
    ...
  };
  declare export type TStringMap = {
    [key: string]: string,
    ...
  };
  declare export type TContext = {
    ...Context,
    ...{
      env: TStringMap,
      branch?: Exclude<BranchSpec, string>,
      cwd: string,
      options: {
        ...TAnyMap,
        ...{
          publish?: Array<any>,
          verifyConditions?: Array<any>,
          ...
        },
      },
      ...
    },
  };
  declare export interface IGhpagesPluginConfig {
    dir: string;
    src: string | string[];
    dst: string;
    ciBranch: string;
    docsBranch: string;
    pullTagsBranch?: string;
    msg: string;
    repo: string;
    token?: string;
    enterprise?: boolean;
    dotfiles?: boolean;
    add?: boolean;
  }
  declare export type IPushOpts = {
    message: string,
    logger: ILogger,
    env: TAnyMap,
    cwd: string,
    ...
  } & IGhpagesPluginConfig;
}

declare module "@qiwi/semantic-release-gh-pages-plugin/target/es6/defaults" {
  /**
   * @module semantic-release-gh-pages-plugin
   */
  declare export var PLUGIN_PATH: "@qiwi/semantic-release-gh-pages-plugin";
  declare export var DEFAULT_BRANCH: "gh-pages";
  declare export var DEFAULT_SRC: "docs";
  declare export var DEFAULT_BASE_DIR: ".";
  declare export var DEFAULT_DST: ".";
  declare export var DEFAULT_MSG: "docs updated <%= nextRelease.gitTag %>";
  declare export var DEFAULT_ENTERPRISE: false;
  declare export var DEFAULT_PULL_TAGS_BRANCH: "master";
}

declare module "@qiwi/semantic-release-gh-pages-plugin/target/es5" {
  import type { TContext } from "@qiwi/semantic-release-gh-pages-plugin/target/es5/interface";

  declare export * from "@qiwi/semantic-release-gh-pages-plugin/target/es5/defaults";

  declare export var verifyConditions: (
    pluginConfig: any,
    context: TContext
  ) => Promise<void>;
  declare export var publish: (
    pluginConfig: any,
    context: TContext
  ) => Promise<mixed>;
  declare var _default: {
    verifyConditions: (pluginConfig: any, context: TContext) => Promise<void>,
    publish: (pluginConfig: any, context: TContext) => Promise<mixed>,
    ...
  };
  declare export default typeof _default;
}

declare module "@qiwi/semantic-release-gh-pages-plugin/target/es5/interface" {
  import type { BranchSpec, Context } from "semantic-release";

  declare export interface ILogger {
    log: (message: string, ...vars: any[]) => void;
    error: (message: string, ...vars: any[]) => void;
  }
  declare export type TAnyMap = {
    [key: string]: any,
    ...
  };
  declare export type TStringMap = {
    [key: string]: string,
    ...
  };
  declare export type TContext = {
    ...Context,
    ...{
      env: TStringMap,
      branch?: Exclude<BranchSpec, string>,
      cwd: string,
      options: {
        ...TAnyMap,
        ...{
          publish?: Array<any>,
          verifyConditions?: Array<any>,
          ...
        },
      },
      ...
    },
  };
  declare export interface IGhpagesPluginConfig {
    dir: string;
    src: string | string[];
    dst: string;
    ciBranch: string;
    docsBranch: string;
    pullTagsBranch?: string;
    msg: string;
    repo: string;
    token?: string;
    enterprise?: boolean;
    dotfiles?: boolean;
    add?: boolean;
  }
  declare export type IPushOpts = {
    message: string,
    logger: ILogger,
    env: TAnyMap,
    cwd: string,
    ...
  } & IGhpagesPluginConfig;
}

declare module "@qiwi/semantic-release-gh-pages-plugin/target/es5/defaults" {
  /**
   * @module semantic-release-gh-pages-plugin
   */
  declare export var PLUGIN_PATH: "@qiwi/semantic-release-gh-pages-plugin";
  declare export var DEFAULT_BRANCH: "gh-pages";
  declare export var DEFAULT_SRC: "docs";
  declare export var DEFAULT_BASE_DIR: ".";
  declare export var DEFAULT_DST: ".";
  declare export var DEFAULT_MSG: "docs updated <%= nextRelease.gitTag %>";
  declare export var DEFAULT_ENTERPRISE: false;
  declare export var DEFAULT_PULL_TAGS_BRANCH: "master";
}
