use std::sync::LazyLock;

static BIG_ARRAY: LazyLock<Vec<f64>> =
    LazyLock::new(|| (0..10_000_000).map(|x| x as f64).collect());

pub fn test_3() {
    let mut total = 0_f64;
    for i in 0..10_000_000 {
        total *= BIG_ARRAY[i];
    }

    std::hint::black_box(total);
}
