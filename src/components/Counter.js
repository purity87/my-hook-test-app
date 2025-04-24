// Hook을 테스트하려면 일반적으로 컴포넌트 안에서 Hook을 호출하고, 그 동작을 테스트합니다.
'use client';
import React from 'react'
import { useCounter } from '@/hooks/useCounter';

export const Counter = () => {
    const { count, increment, decrement, reset } = useCounter(0);

    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={increment}>Increment</button>
            <button onClick={decrement}>Decrement</button>
            <button onClick={reset}>Reset</button>
        </div>
    );
};