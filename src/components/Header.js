// components/Header.js
'use client';
import React from 'react';
import { useSse } from '@/context/SseContext';

export default function Header() {
    const { messages } = useSse();

    return (
        <header className="bg-gray-100 p-4 shadow-md">
            <h1 className="text-2xl font-bold">
                최신 메시지: {messages[messages.length - 1]?.text || '없음'}{' '}
                {messages[messages.length - 1]?.player &&
                    `(플레이어: ${messages[messages.length - 1].player})`}
            </h1>
        </header>
    );
}