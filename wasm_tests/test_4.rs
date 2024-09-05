// Use u32 like last time

static BIG_ARRAY_U32: LazyLock<Vec<u32>> = LazyLock::new(|| (0..10_000_000).collect());

pub fn test_4() {
    let mut total = 0_u32;
    for i in 0..10_000_000 {
        total *= BIG_ARRAY_U32[i];
    }

    std::hint::black_box(total);
}
