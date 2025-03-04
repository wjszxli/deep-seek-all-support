import { makeAutoObservable } from "mobx";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

class ChatStore {
  messages: Message[] = [];
  isProcessing: boolean = false;
  currentRequestController: AbortController | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  addMessage(message: Message) {
    this.messages.push(message);
  }

  setProcessing(processing: boolean) {
    this.isProcessing = processing;
  }

  sendMessage = async (content: string) => {
    if (!content.trim()) return;
    
    // Add user message
    this.addMessage({
      id: `user-${Date.now()}`,
      content,
      sender: 'user',
      timestamp: new Date()
    });
    
    this.setProcessing(true);
    
    // Create AbortController for the request
    this.currentRequestController = new AbortController();
    
    try {
      // Here you would make your actual API call
      // passing the signal from the controller
      // const response = await fetch('/api/chat', {
      //   signal: this.currentRequestController.signal,
      //   // other options...
      // });
      
      // Simulate AI response after delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Add AI response message
      this.addMessage({
        id: `ai-${Date.now()}`,
        content: `I received: "${content}". This is a simulated response.`,
        sender: 'ai',
        timestamp: new Date()
      });
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('Request was cancelled');
      } else {
        console.error('Error in chat request:', error);
        // You might want to add an error message
      }
    } finally {
      this.setProcessing(false);
      this.currentRequestController = null;
    }
  }

  cancelResponse = () => {
    if (this.currentRequestController) {
      this.currentRequestController.abort();
      this.currentRequestController = null;
    }
    this.setProcessing(false);
  }
}

export const chatStore = new ChatStore(); 