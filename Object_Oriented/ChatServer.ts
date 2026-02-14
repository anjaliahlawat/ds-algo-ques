// Design a chat server

// server.js 
// const WebSocket = require("ws");

// const wss = new WebSocket.Server({ port: 8080 });

// const clients = new Map(); // userId -> socket

// wss.on("connection", (socket) => {
//   console.log("Client connected");

//   socket.on("message", (data) => {
//     const msg = JSON.parse(data.toString());

//     if (msg.type === "register") {
//       clients.set(msg.userId, socket);
//       console.log(`User ${msg.userId} registered`);
//       return;
//     }

//     if (msg.type === "chat") {
//       const receiverSocket = clients.get(msg.to);

//       if (receiverSocket) {
//         receiverSocket.send(JSON.stringify(msg));
//       }
//     }
//   });

//   socket.on("close", () => {
//     console.log("Client disconnected");
//   });
// });

console.log("WebSocket server running on ws://localhost:8080");

// ===============================================================================

class ProfileDetails {}

class SecuritySettings {}

// class ContactDetails {
//     id: string
//     name: string
//     phoneNumber: string

//     constructor(id: string, name: string, phoneNumber: string) {
//         this.id = id;
//         this.name = name;
//         this.phoneNumber = phoneNumber
//     }
// }

// class AddressBook {
//     contacts: ContactDetails[];

//     addContact(contact: ContactDetails) {
//         this.contacts.push(contact);
//     }

//     getContacts(): ContactDetails[] {
//         return this.contacts;
//     }
// }

enum UserStatus {
    Available,
    Offline,
    Idle,
    Away,
    Busy
}

enum RequestStatus {
	Unread, Read, Accepted, Rejected
}

class ChatUser {
    id: string;
    name: string;
    phoneNumber;
    status: UserStatus;
    profileDetails: ProfileDetails;
    securitySettings: SecuritySettings;
    contacts: Map<BigInteger, User>;

    constructor(id: string, name: string, phoneNumber: string) {
        this.id = id;
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.contacts = new Map()
    }

    sentAddRequest() {}

    receivedAddRequest(req: AddRequest) {
        const user = req.getFromUser()

    }

    updateStatus(status) {
        this.status = status
    }
}

class UserService {
    registeredUsers: Map<string, ChatUser> = new Map();

    registerUser(name: string, phoneNumber: string) {
        const id = (Array.from(this.registeredUsers).length +1).toString();
        const user = new ChatUser(id, name, phoneNumber)
        this.registeredUsers.set(id, user);
        this.createUserProfile(id)
    }

    getUser(userId: string) {
        return this.registeredUsers.get(userId);
    }

    addUser(user: User, toAccountName) {

    }

    userSignedOn() {}

    userSignedOff() {}

    approveAddRequest() {}

    rejectAddRequest() {}

    createUserProfile(id: string) {}

    updateProfile() {}

    updateSecuritySettings() {}

    deleteUser() {}
}

class AddRequest {
     fromUser: string;
     toUser: string;
     date: Date;
     status: RequestStatus

     constructor(fromUser, toUser, date) {
        this.fromUser = fromUser;
        this.toUser = toUser;
        this.date = date;
        this.status = RequestStatus.Unread
     }

     getFromUser() {
        return this.fromUser
     }

     toFromUser() {
        return this.fromUser
     }

     getStatus() {
        return this.status
     }

     getDate() {
        return this.date
     }
}

class AuthenticationService {

}

enum MessageStatus {
    SENT,
    DELIVERED,
    READ
}

class MessageDetails {
    id: string;
    conversationId: string;
    timestamp: Date;
    content: string;
    senderId: string;
    status?: MessageStatus;

    constructor(id: string, conversationId: string, senderId: string, content: string) {
    this.id = id;
    this.conversationId = conversationId;
    this.senderId = senderId;
    this.content = content;
    this.timestamp = new Date();
    this.status = MessageStatus.SENT;
  }
}

class MessageService {
    userId; string;
    
    chats: Map<string, MessageDetails[]> // id of enduser

    constructor(id: string) {
        this.userId = id
    }

    createMessage() {}

    sendMessage(receiver) {

    }

    retrieveChat(endUser) {

    }

    updatemessageStatus() {}

    editMessage() {}

    deleteMessage(messageId) {

    }
}

class Conversation {
    id: string;
    participants: Set<string>

    addParticipants() {}
}

class ConversationService {
    userService: UserService;
    messageService: MessageService;

    constructor() {
        this.userService = new UserService()
    }

    startConversation(user1Id, user2Id) {
        const user1 = this.userService.getUser(user1Id)
        const user2 = this.userService.getUser(user2Id)
    }

    onMessageReceive(){

    }
}

// Questions:
// 1. How can chatservice know about different clients registered? ✅ through UserService
// 2. So chatservice should not be about registering clients? but only managing conversation between clients? Yes ✅
// 3. Where to add user registration then? ✅
// 4. how to connect client with user details? 
// 5. Are clients and user objects will be different and will be handled different as well? 
// 6. How to check and where to put online/offline status? Chatservice?
// 7. How to connect messageservice with chatservice? Will it live inside Chatservice class? ✅ No..It will on chatservice though.
