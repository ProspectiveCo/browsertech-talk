// Nothing changed

const VERY_BIG_JSON = await fetch("/wasm_tests/test_7.json").then((x) => {
    return x.text();
});

export function test_8() {
    for (let i = 0; i < 5; i++) {
        JSON.parse(VERY_BIG_JSON);
    }
}
