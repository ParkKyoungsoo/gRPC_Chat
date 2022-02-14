import readline from 'readline'
import * as grpc from '@grpc/grpc-js';
import { ChatServiceClient } from './proto/grpc_chat_grpc_pb';
import { ChatMessage } from './proto/grpc_chat_pb';

const host = '0.0.0.0:50051';

const client = new ChatServiceClient(host, grpc.credentials.createInsecure());

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const user = process.argv[2];
let metedata: grpc.Metadata = new grpc.Metadata();
metedata.add('user', user);
const call:grpc.ClientDuplexStream<ChatMessage, ChatMessage> = client.chat(metedata);

call.on('data', (ChatMessage: ChatMessage): void => {
    console.log(`${ChatMessage.getFromname()} ==> ${ChatMessage.getMessage()}`);
});

call.on('end', ():void => {
    console.log('Server ended call');
});

rl.on('line', (line: string): void => {
    if(line === 'quit') {
        call.end();
        rl.close();
    } else {
        const quitMessage = new ChatMessage();
        quitMessage.setMessage(line);
        call.write(quitMessage);
    }
});

console.log('Enter your message below: ');


