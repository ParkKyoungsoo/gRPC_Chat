import * as grpc from '@grpc/grpc-js';
import { ChatServiceService, IChatServiceServer } from './proto/grpc_chat_grpc_pb';
import { ChatMessage } from './proto/grpc_chat_pb';

const clients: Map<grpc.MetadataValue[], grpc.ServerDuplexStream<ChatMessage, ChatMessage> > = new Map();
const chatService: IChatServiceServer = {
    chat(call: grpc.ServerDuplexStream<ChatMessage, ChatMessage> ): void {


        call.on('data', (chatMessage: ChatMessage):void => {
            const user: grpc.MetadataValue[] = call.metadata.get('user');
            const msg: string = chatMessage.getMessage();
            console.log(`${user} ==> ${msg}`);
            for(const [msgUser, userCall] of clients) {                
                if(msgUser !== user) {
                    const serverMessage = new ChatMessage();
                    serverMessage.setFromname(user.toString());
                    serverMessage.setMessage(msg);
                    userCall.write(serverMessage);
                }                
            }

            if(clients.get(user) === undefined) {
                clients.set(user, call);
            }
        });

        call.on('end', (): void => {
            const endMessage = new ChatMessage();
            endMessage.setFromname('Chat server');
            endMessage.setMessage('Nice to see ya! Come back again...');
            call.write(endMessage);
            call.end();
        });

    }
}

const server: grpc.Server = new grpc.Server();
server.addService(ChatServiceService, chatService);
server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), (): void => {
    server.start();
});

console.log('gPRC Chat Server started....');

 