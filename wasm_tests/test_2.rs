// Explicitly use integers

pub fn test_2() {
    fn fibonacci(n: u32) -> u32 {
        match n {
            0_u32 => 1_u32,
            1_u32 => 1_u32,
            _ => fibonacci(n - 1_u32) + fibonacci(n - 2_u32),
        }
    }

    std::hint::black_box(fibonacci(35));
}
