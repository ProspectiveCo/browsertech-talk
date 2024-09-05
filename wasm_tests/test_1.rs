pub fn test_1() {
    fn fibonacci(n: f64) -> f64 {
        match n {
            0_f64 => 1_f64,
            1_f64 => 1_f64,
            _ => fibonacci(n - 1_f64) + fibonacci(n - 2_f64),
        }
    }

    std::hint::black_box(fibonacci(35_f64));
}
