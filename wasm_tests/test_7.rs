const VERY_BIG_JSON: &str = include_str!("./test_7.json");

pub fn test_7() {
    for _ in 0..5 {
        std::hint::black_box(serde_json::from_str::<serde_json::Value>(VERY_BIG_JSON).unwrap());
    }
}
