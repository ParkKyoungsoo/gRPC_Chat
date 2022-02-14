// GENERATED CODE -- DO NOT EDIT!

// package: chatService
// file: proto/grpc_chat.proto

import * as proto_grpc_chat_pb from "../proto/grpc_chat_pb";
import * as grpc from "@grpc/grpc-js";

interface IChatServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  chat: grpc.MethodDefinition<proto_grpc_chat_pb.ChatMessage, proto_grpc_chat_pb.ChatMessage>;
}

export const ChatServiceService: IChatServiceService;

export interface IChatServiceServer extends grpc.UntypedServiceImplementation {
  chat: grpc.handleBidiStreamingCall<proto_grpc_chat_pb.ChatMessage, proto_grpc_chat_pb.ChatMessage>;
}

export class ChatServiceClient extends grpc.Client {
  constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
  chat(metadataOrOptions?: grpc.Metadata | grpc.CallOptions | null): grpc.ClientDuplexStream<proto_grpc_chat_pb.ChatMessage, proto_grpc_chat_pb.ChatMessage>;
  chat(metadata?: grpc.Metadata | null, options?: grpc.CallOptions | null): grpc.ClientDuplexStream<proto_grpc_chat_pb.ChatMessage, proto_grpc_chat_pb.ChatMessage>;
}
