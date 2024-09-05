use wasm_bindgen::prelude::*;

mod tests {
    include!("wasm_tests/test_1.rs");
    include!("wasm_tests/test_2.rs");
    include!("wasm_tests/test_3.rs");
    include!("wasm_tests/test_4.rs");
    include!("wasm_tests/test_5.rs");
    include!("wasm_tests/test_6.rs");
    include!("wasm_tests/test_7.rs");
    include!("wasm_tests/test_8.rs");
}

macro_rules! template {
    ($x:ident) => {
        #[wasm_bindgen]
        pub fn $x() {
            tests::$x()
        }
    };
}

template!(test_1);
template!(test_2);
template!(test_3);
template!(test_4);
template!(test_5);
template!(test_6);
template!(test_7);
template!(test_8);
