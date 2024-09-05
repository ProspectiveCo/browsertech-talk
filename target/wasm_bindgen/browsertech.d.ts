/* tslint:disable */
/* eslint-disable */
/**
*/
export function test_1(): void;
/**
*/
export function test_2(): void;
/**
*/
export function test_3(): void;
/**
*/
export function test_4(): void;
/**
*/
export function test_5(): void;
/**
*/
export function test_6(): void;
/**
*/
export function test_7(): void;
/**
*/
export function test_8(): void;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly test_6: () => void;
  readonly test_1: () => void;
  readonly test_2: () => void;
  readonly test_3: () => void;
  readonly test_7: () => void;
  readonly test_8: () => void;
  readonly test_4: () => void;
  readonly test_5: () => void;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
*
* @returns {InitOutput}
*/
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
