import { useState } from 'react';
import { Mail, Send } from 'lucide-react';

export default function MessagesView({ messages }) {
  const [selectedMessageId, setSelectedMessageId] = useState(messages[0]?.id ?? null);
  const [replyText, setReplyText] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);

  const selectedMessage = messages.find((message) => message.id === selectedMessageId);

  const handleSelectMessage = (messageId) => {
    setSelectedMessageId(messageId);
    setReplyText('');
    setSentSuccess(false);
  };

  const handleSendReply = (event) => {
    event.preventDefault();
    if (!selectedMessage || !replyText.trim()) {
      return;
    }

    setSentSuccess(true);
    setReplyText('');
  };

  return (
    <div className="fade-in-up">
      <div className="row mb-4 align-items-center">
        <div className="col-12">
          <h2 className="fw-bold mb-1">Messages</h2>
          <p className="text-secondary-color mb-0" style={{ fontSize: '0.9rem' }}>
            Review customer questions and support conversations from one inbox.
          </p>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-12 col-xl-5">
          <div className="glass-card p-3 h-100">
            <div className="d-flex align-items-center gap-2 mb-3 px-1">
              <Mail size={18} className="text-primary" />
              <h5 className="fw-bold mb-0">Customer Inbox</h5>
            </div>
            <div className="d-flex flex-column gap-2">
              {messages.map((message) => (
                <button
                  key={message.id}
                  type="button"
                  className={`message-row message-row-button text-start ${selectedMessageId === message.id ? 'selected' : ''}`}
                  onClick={() => handleSelectMessage(message.id)}
                  aria-pressed={selectedMessageId === message.id}
                >
                  <img src={message.avatar} alt={message.sender} className="rounded-circle" style={{ width: '42px', height: '42px', objectFit: 'cover', flexShrink: 0 }} />
                  <div className="flex-grow-1">
                    <div className="d-flex justify-content-between gap-2">
                      <span className="fw-bold text-primary-color small">{message.sender}</span>
                      <span className="text-muted" style={{ fontSize: '0.72rem' }}>{message.time}</span>
                    </div>
                    <p className="text-secondary-color mb-1 small">{message.preview}</p>
                    <span className="badge-premium badge-premium-info">{message.status}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="col-12 col-xl-7">
          <div className="glass-card p-4 h-100">
            {selectedMessage ? (
              <form onSubmit={handleSendReply}>
                <div className="d-flex align-items-start gap-3 mb-4">
                  <img src={selectedMessage.avatar} alt={selectedMessage.sender} className="rounded-circle" style={{ width: '46px', height: '46px', objectFit: 'cover', flexShrink: 0 }} />
                  <div>
                    <h5 className="fw-bold mb-1">Reply to {selectedMessage.sender}</h5>
                    <p className="text-secondary-color small mb-1">{selectedMessage.preview}</p>
                    <span className="text-muted" style={{ fontSize: '0.75rem' }}>{selectedMessage.time}</span>
                  </div>
                </div>

                {sentSuccess && (
                  <div className="alert alert-success border border-success-subtle mb-3 py-2 px-3 small" style={{ background: 'rgba(16, 185, 129, 0.08)' }}>
                    Reply sent to {selectedMessage.sender}.
                  </div>
                )}

                <textarea
                  className="form-control form-control-custom mb-3"
                  rows="8"
                  placeholder={`Write your reply to ${selectedMessage.sender}...`}
                  value={replyText}
                  onChange={(event) => {
                    setReplyText(event.target.value);
                    setSentSuccess(false);
                  }}
                />
                <button
                  type="submit"
                  className="btn btn-primary d-inline-flex align-items-center gap-2"
                  disabled={!replyText.trim()}
                  style={{ background: 'var(--grad-primary)', border: 'none' }}
                >
                  <Send size={16} />
                  Send Reply
                </button>
              </form>
            ) : (
              <div className="h-100 d-flex flex-column align-items-center justify-content-center text-center py-5">
                <Mail size={32} className="text-muted mb-3" />
                <h5 className="fw-bold mb-2">Select a customer</h5>
                <p className="text-secondary-color small mb-0">Choose a message from the inbox to write a reply.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
