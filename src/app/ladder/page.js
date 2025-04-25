'use client';
import React from 'react';
import Header from '@/components/Header';
import LadderBoard from '@/components/LadderBoard';
import { useSse } from '@/context/SseContext';

export default function LadderPage() {
    const { messages, error } = useSse();

    return (
        <div className="max-w-4xl mx-auto p-6 bg-gray-100 min-h-screen">
            <Header />
            <h1 className="text-4xl font-extrabold mb-6 text-gray-800 text-center">진짜 사다리타기</h1>
            {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
            <LadderBoard />
            <div className="mt-8 bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-3 text-gray-700">모든 메시지</h3>
                {messages.length === 0 ? (
                    <p className="text-gray-500">메시지가 없습니다. SSE 연결을 확인하세요.</p>
                ) : (
                    <ul className="list-disc pl-6 space-y-1">
                        {messages.map((msg, index) => (
                            <li key={index} className="text-gray-600">
                                {msg.text} (플레이어: {msg.player || '없음'})
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}