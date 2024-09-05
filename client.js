import perspective from "/node_modules/@finos/perspective/dist/cdn/perspective.js";

const worker = await perspective.worker();
const table = await worker.table({
    test: "string",
    runtime: "string",
    time: "integer",
});

const workspace = document.getElementsByTagName("perspective-workspace")[0];
workspace.tables.set("results", table);

async function create_worker(runtime) {
    const perf_worker = new Worker("worker.js");
    let resolver;
    perf_worker.addEventListener("message", (msg) => {
        if (msg.data === "finished") {
            resolver();
        } else {
            table.update([JSON.parse(msg.data)]);
        }
    });

    return async function (test, ...args) {
        perf_worker.postMessage(JSON.stringify({ test, runtime, args }));
        await new Promise((resolve) => {
            resolver = resolve;
        });
    };
}

const js_worker = await create_worker("javascript");
const wasm_worker = await create_worker("webassembly");

async function bench(name, ...args) {
    await Promise.all([js_worker, wasm_worker].map((f) => f(name, ...args)));
}

const scoreboard = document.querySelector("#scoreboard");
const tests = [
    "test_1",
    "test_2",
    "test_3",
    "test_4",
    "test_5",
    "test_6",
    "test_7",
    "test_8",
];
for (const idx in tests) {
    const test = tests[idx];
    scoreboard.innerHTML += `
        <div id="${test}" class="disabled">
            <button class="js">JavaScript</button>
            <button class="wasm">Rust (WebAssembly)</button>
        </div>
    `;
}

async function load_test(test) {
    document.querySelector("#js_pre").className = "";
    document.querySelector("#rust_pre").className = "";
    document.querySelector("#js_pre").removeAttribute("data-highlighted");
    document.querySelector("#rust_pre").removeAttribute("data-highlighted");
    document.querySelector("#" + test).classList.remove("disabled");
    const js_src = await fetch(`wasm_tests/${test}.js`).then((x) => x.text());
    document.querySelector("#js_pre").textContent = js_src;
    const rs_src = await fetch(`wasm_tests/${test}.rs`).then((x) => x.text());
    document.querySelector("#rust_pre").textContent = rs_src;
    window.hljs.highlightAll();
}

await load_test(tests[0]);

let total_score = 0;
let total_tests = 0;
const score_elem = document.querySelector("#total_score");
scoreboard.addEventListener("click", async (event) => {
    if (
        event.target.tagName === "BUTTON" &&
        !event.target.parentElement.classList.contains("running")
    ) {
        event.target.parentElement.classList.add("running");
        const test = event.target.parentElement.getAttribute("id");
        event.target.classList.add("selected");
        await bench(test);
        const view = await table.view({
            group_by: ["runtime"],
            filter: [["test", "==", test]],
            aggregates: { time: "avg" },
            columns: ["time"],
        });

        const json = await view.to_json();
        await view.delete();
        const score = json
            .slice(1)
            .reduce(
                (d, row) => ({ [row.__ROW_PATH__[0]]: row.time, ...d }),
                {},
            );

        console.log;

        if (score.javascript <= score.webassembly) {
            document.querySelector("#js_pre").classList.add("win");
            document.querySelector("#rust_pre").classList.add("lose");
        } else {
            document.querySelector("#js_pre").classList.add("lose");
            document.querySelector("#rust_pre").classList.add("win");
        }

        if (
            (score.javascript <= score.webassembly &&
                event.target.classList.contains("js")) ||
            (score.javascript > score.webassembly &&
                event.target.classList.contains("wasm"))
        ) {
            event.target.parentElement.classList.add("win");
            total_score += 1;
        } else {
            event.target.parentElement.classList.add("lose");
        }

        total_tests += 1;
        score_elem.innerText = `${total_score}/${total_tests} Correct (${((total_score / total_tests) * 100).toFixed(2)}%)`;

        let resolver2;
        window.addEventListener("keypress", () => {
            resolver2?.();
        });

        await new Promise((resolve) => {
            resolver2 = resolve;
        });

        resolver2 = undefined;

        // await new Promise((x) => setTimeout(x, 3000));

        const next_test = tests[tests.indexOf(test) + 1];
        if (next_test) {
            await load_test(next_test);
        }
    }
});
