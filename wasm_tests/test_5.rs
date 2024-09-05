// Nothing changed

pub fn test_5() {
    let mut total = 0_u32;
    for i in 0..10_000_000 {
        total *= BIG_ARRAY_U32[i];
    }

    std::hint::black_box(total);
}
