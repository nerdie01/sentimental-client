import * as React from 'react';

export var ws = new WebSocket('ws://192.168.86.28:25565');;
export var summary, transcription, emotions;

export function sendToClient(msg, encoded) {
    try {
        if (encoded) {
            //send a start token to the server
            ws.send('$$B64START');
            //divide msg into 1000 char chunks and send
            var chunkSize = 10000;
            var chunks = [];
            for (var i = 0; i < msg.length; i += chunkSize) {
                chunks.push(msg.substring(i, i + chunkSize));
            }
            for (var i = 0; i < chunks.length; i++) {
                ws.send(chunks[i]);
            }
            ws.send('$$B64END');
        }
        else {
            ws.send(msg);
        }
    }
    catch {
        console.error('Error sending message to server: ', error);
    }
}