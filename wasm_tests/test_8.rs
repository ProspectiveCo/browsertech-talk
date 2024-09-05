use js_sys::JsString;

struct Magic(JsString);

unsafe impl Send for Magic {}
unsafe impl Sync for Magic {}

static BIG_ARRAY_2: LazyLock<Magic> = LazyLock::new(|| Magic(JsString::from(VERY_BIG_JSON)));

pub fn test_8() {
    for _ in 0..5 {
        let json: String = BIG_ARRAY_2.0.clone().into();
        std::hint::black_box(serde_json::from_str::<serde_json::Value>(&json).unwrap());
    }
}
