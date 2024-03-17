import React from 'react';

const FlashMessage = ({ flashMessage }) => {
    if (!flashMessage) {
        return null;
    }

    const getMessageTypeClass = () => {
        switch (flashMessage.type) {
            case 'success':
                return 'bg-green-600';
            case 'error':
                return 'bg-red-500';
            case 'info':
                return 'bg-lime-500';
            default:
                console.warn(`Unknown message type: ${flashMessage.type}`);
                return 'bg-green-500';
        }
    };

    const messageTypeClass = getMessageTypeClass();
    return (
        <div className={`fixed top-16 left-0 right-0 z-20 ${messageTypeClass} text-white p-4 text-center`}>
            {flashMessage.message}
        </div>
    );
};

export default FlashMessage;
