export function test_1() {
    function fibonacci(num) {
        if (num === 1) {
            return 1;
        } else if (num === 2) {
            return 1;
        } else return fibonacci(num - 1) + fibonacci(num - 2);
    }

    fibonacci(35);
}
