import React, { createContext, useContext, useState } from "react";

// Define the context type
interface ChatsContextType {
  chats: any[];
  setChats: React.Dispatch<React.SetStateAction<any[]>>;
}

// Create Context
const ChatsContext = createContext<ChatsContextType | undefined>(undefined);

// Provider Component
export const ChatsProvider = ({ children }: { children: React.ReactNode }) => {
  const [chats, setChats] = useState<any[]>([]);

  return (
    <ChatsContext.Provider value={{ chats, setChats }}>
      {children}
    </ChatsContext.Provider>
  );
};

// Custom hook to use chats context
export const useChats = () => {
  const context = useContext(ChatsContext);
  if (!context) throw new Error("useChats must be used within a ChatsProvider");
  return context;
};
