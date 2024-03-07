import { createConext } from "react";

const ChatContext = createConext();

const ChatProvider = ({ children }) => {
  return <ChatContext.ChatProvider>{children}</ChatContext.ChatProvider>;
};

export default ChatProvider;
