import browsertech from "/target/wasm_bindgen/browsertech.js";

const wasm_module = await browsertech(
    "/target/wasm_bindgen/browsertech_bg.wasm",
);

export const module = wasm_module;
