import React, { useState, useRef, useEffect } from 'react';
import { Dialog } from '@progress/kendo-react-dialogs';
import { Input } from '@progress/kendo-react-inputs';
import { Button } from '@progress/kendo-react-buttons';
import { Tooltip } from '@progress/kendo-react-tooltip';
import { Notification, NotificationGroup } from '@progress/kendo-react-notification';

const TravelFAQ: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of chat on new message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, visible]);

  const toggleDialog = () => setVisible(!visible);

  // TODO: Replace with real Nuclia RAG API call
  const sendMessage = () => {
    if (!input.trim()) {
      setNotification({ type: 'error', message: 'Please enter a question.' });
      return;
    }
    setMessages(prev => [
      ...prev,
      `You: ${input}`,
      `Bot: This is a mock response for "${input}". For real integration, connect to Nuclia RAG API.`
    ]);
    setInput('');
    setNotification({ type: 'success', message: 'Message sent!' });
  };

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 24px' }}>
      <div style={{ 
        background: '#fff',
        borderRadius: 12,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        padding: '32px',
        marginBottom: 24
      }}>
        <h2 style={{ 
          fontSize: '28px',
          fontWeight: 600,
          color: '#2D3748',
          marginBottom: 32
        }}>Travel FAQ</h2>

        {notification && (
          <NotificationGroup style={{ position: 'fixed', top: 100, right: 24, zIndex: 2000 }}>
            <Notification
              type={{ style: notification.type, icon: true }}
              closable
              onClose={() => setNotification(null)}
            >
              {notification.message}
            </Notification>
          </NotificationGroup>
        )}

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          background: '#F7FAFC',
          padding: '40px',
          borderRadius: 12,
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '18px',
            color: '#4A5568',
            marginBottom: '24px',
            maxWidth: '600px',
            lineHeight: 1.6
          }}>
            Get instant answers to your travel questions using our AI-powered knowledge base.
          </div>
          <Tooltip anchorElement="target" position="top" content="Chat with our travel knowledge base bot">
            <Button
              onClick={toggleDialog}
              themeColor="primary"
              size="large"
              style={{
                padding: '12px 32px',
                fontSize: '16px',
                fontWeight: 500
              }}
            >
              Start Chat
            </Button>
          </Tooltip>
        </div>

        {visible && (
          <Dialog
            title="Travel FAQ Chat"
            onClose={toggleDialog}
            style={{
              minWidth: 500,
              maxWidth: 800,
              borderRadius: 12,
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
            }}
          >
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              height: '60vh',
              maxHeight: 600
            }}>
              <div style={{
                flex: 1,
                overflowY: 'auto',
                background: '#F7FAFC',
                borderRadius: 8,
                padding: 16,
                marginBottom: 16
              }}>
                {messages.length === 0 && (
                  <div style={{
                    color: '#718096',
                    textAlign: 'center',
                    padding: '32px 16px'
                  }}>
                    Ask a travel question to get started!
                  </div>
                )}
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    style={{
                      margin: '8px 0',
                      padding: '12px 16px',
                      borderRadius: 8,
                      background: msg.startsWith('You:') ? '#EBF8FF' : '#fff',
                      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                      marginLeft: msg.startsWith('You:') ? 'auto' : 0,
                      marginRight: msg.startsWith('You:') ? 0 : 'auto',
                      maxWidth: '80%'
                    }}
                  >
                    {msg}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
              <div style={{
                display: 'flex',
                gap: 12,
                padding: '16px',
                background: '#fff',
                borderTop: '1px solid #E2E8F0',
                borderRadius: '0 0 8px 8px'
              }}>
                <Input
                  value={input}
                  onChange={(e) => setInput(e.value)}
                  placeholder="Type your question..."
                  style={{
                    flex: 1,
                    padding: '12px',
                    borderRadius: 6,
                    border: '1px solid #E2E8F0'
                  }}
                  onKeyDown={e => { if (e.key === 'Enter') sendMessage(); }}
                />
                <Tooltip anchorElement="target" position="top" content="Send your question">
                  <Button
                    onClick={sendMessage}
                    themeColor="primary"
                    style={{
                      padding: '8px 24px',
                      fontWeight: 500
                    }}
                  >
                    Send
                  </Button>
                </Tooltip>
              </div>
            </div>
          {/*
            To connect to Nuclia RAG API, replace sendMessage logic with an async call:
            - Use fetch or axios to POST the user's question to your backend or directly to Nuclia.
            - Display the response in the chat.
            See /src/services/ or /src/hooks/ for integration examples.
          */}
        </Dialog>
      )}
      </div>
    </div>
  );
};

export default TravelFAQ;
