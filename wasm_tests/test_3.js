const BIG_ARRAY = Array.from(Array(10_000_000).keys());

export function test_3() {
    let total = 0;
    for (let i = 0; i < 10_000_000; i++) {
        total *= BIG_ARRAY[i];
    }
}
