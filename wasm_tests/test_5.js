// Explicitly use a Typed Array

const BIG_ARRAY = Uint32Array.from(Array(10_000_000).keys());

export function test_5() {
    let total = 0;
    for (let i = 0; i < 10_000_000; i++) {
        total *= BIG_ARRAY[i];
    }
}
