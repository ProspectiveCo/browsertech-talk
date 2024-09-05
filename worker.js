const MODULES = {};

async function get_cached_module(modname) {
    if (MODULES[modname] === undefined) {
        MODULES[modname] = await import(`/worker.${modname}.js`);
    }

    const mod = MODULES[modname]?.module || MODULES[modname];
    console.log(mod);
    return mod;
}

async function bench(test, runtime, callback, args = []) {
    for (let i = 0; i < 10; i++) {
        const start = performance.now();
        await callback(...args);
        const time = performance.now() - start;
        self.postMessage(JSON.stringify({ test, runtime, time }));
    }
}

self.addEventListener("message", async (msg) => {
    const { test, runtime, args } = JSON.parse(msg.data);
    const module = await get_cached_module(runtime);
    await bench(test, runtime, module[test], args);
    self.postMessage("finished");
});
