'use client';
import React from 'react';
import Header from '@/components/Header';
import LadderBoard from '@/components/LadderBoard';
import { useSse } from '@/context/SseContext';

export default function LadderPage() {
    const { messages, error } = useSse();

    return (
        <div className="max-w-4xl mx-auto p-6">
            <Header />
            <h1 className="text-3xl font-bold mb-6">사다리 게임</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <LadderBoard />
            <div className="mt-6">
                <h3 className="text-xl font-semibold mb-2">모든 메시지</h3>
                {messages.length === 0 ? (
                    <p className="text-gray-500">메시지가 없습니다. SSE 연결을 확인하세요.</p>
                ) : (
                    <ul className="list-disc pl-6">
                        {messages.map((msg, index) => (
                            <li key={index} className="mb-1">
                                {msg.text} (위치: {msg.position || '없음'}, 플레이어: {msg.player || '없음'})
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}