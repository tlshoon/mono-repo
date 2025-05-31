// packages/common/src/Button.tsx
import React from 'react';

export const Button = ({ text }: { text: string }) => {
    return <button style={{ padding: 10, background: 'lightblue' }}>{text}</button>;
};
