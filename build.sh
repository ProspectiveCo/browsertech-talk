cargo build --release --target=wasm32-unknown-unknown
wasm-bindgen --target=web --out-dir target/wasm_bindgen target/wasm32-unknown-unknown/release/browsertech.wasm