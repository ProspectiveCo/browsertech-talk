const long_ass_string = await fetch("/wasm_tests/test_6.txt").then((x) => {
    return x.text();
});

export function test_6() {
    for (let i = 0; i < 1_000; i++) {
        btoa(long_ass_string);
    }
}
