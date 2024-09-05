
import psp, { cwd_static_file_handler, make_session } from "@finos/perspective";
import express from "express";
import expressWs from "express-ws";
// import * as securities from "./securities.mjs";

// // node buffer -> JS buffer
// function buffer_to_arraybuffer(buffer) {
//     return new Int8Array(
//         buffer.buffer.slice(
//             buffer.byteOffset,
//             buffer.byteOffset + buffer.length
//         )
//     );
// }

// // Don't need this table since it won't be read from node itself, just need
// // to create it so the WebSocket clients can find it.
// const _table = await securities.securities.getTable();

const app = expressWs(express()).app;
app.ws("/subscribe", async (ws) => {
    const session = await make_session(async (proto) => {
        await ws.send(buffer_to_arraybuffer(proto));
    });

    ws.on("message", (proto) => {
        const x = session.handle_request(buffer_to_arraybuffer(proto));
        return x;
    });
});

app.use("/", (x, y) => cwd_static_file_handler(x, y, ["./"]));

const server = app.listen(8888, () =>
    console.log(`Listening on port ${server.address().port}`)
);
