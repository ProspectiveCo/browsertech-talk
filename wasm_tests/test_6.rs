const LONG_ASS_STRING: &str = include_str!("./test_6.txt");

pub fn test_6() {
    for _ in 0..1_000 {
        std::hint::black_box(base64::encode(LONG_ASS_STRING));
    }
}
