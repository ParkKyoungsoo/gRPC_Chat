// import * as grpc from '@grpc/grpc-js';
// import * as protoloader from '@grpc/proto-loader';
// import { ChatMessage } from './proto/chatService/ChatMessage';
// import { ProtoGrpcType } from './proto/grpc_chat';

// const packageDefinition: protoloader.PackageDefinition = protoloader.loadSync('./proto/grpc_chat.proto');
// const grpcChat:ProtoGrpcType = (grpc.loadPackageDefinition(packageDefinition) as unknown) as ProtoGrpcType;
// const clients: Map<any,any> = new Map();

// const chat = (call: grpc.ServerWritableStream<ChatMessage, ChatMessage>):void => {
//     call.on('data', (chatMessage: any): void => {
//         const user: grpc.MetadataValue [] = call.metadata.get('user');
//         const msg: string = chatMessage.message;
//         console.log(`${user} ==> ${msg}`);
//         for(let [msgUser, userCall] of clients) {
//             if(msgUser !== user){
//                 userCall.write({
//                         fromName: user,
//                         message: msg
//                     });
//                 }
//             }
    
//             if(clients.get(user) === undefined) {
//                 clients.set(user, call);
//             }
//         });
//         call.on('end', (): void => {
//             call.write({
//             fromName: 'Chat server',
//             message: 'Nice to see ya! Come back again....'
//         });
//         call.end();
//     });
// }

// const server: grpc.Server = new grpc.Server();
// server.addService(grpcChat.chatService.ChatService.service, {
//   chat: chat
// });
// server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), (): void => {
//   server.start();
// });

// console.log('gPRC Chat Server started....');

