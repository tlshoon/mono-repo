// packages/common/src/components/Input.tsx
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    return (
        <input
            ref={ref}
            {...props}
            style={{
                padding: '8px',
                borderRadius: 4,
                border: '1px solid #ccc',
            }}
        />
    );
});

Input.displayName = 'Input';
