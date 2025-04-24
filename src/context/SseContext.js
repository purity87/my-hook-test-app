// SSE 데이터를 관리할 Context
'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';

const SseContext = createContext();

export const SseProvider = ({ children }) => {
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        // SSE 연결 설정
        const connect = () => {
            const eventSource = new EventSource('/api/sse'); // Next.js API 경로

            eventSource.onmessage = (event) => {
                try {
                    const newMessage = JSON.parse(event.data);
                    setMessages((prev) => [...prev, newMessage]);
                    setError(null);
                } catch (err) {
                    console.error('메시지 파싱 오류:', err);
                    setError('메시지 처리 중 오류 발생');
                }
            };

            eventSource.onerror = () => {
                console.error('SSE 연결 오류');
                setError('SSE 연결 실패, 재시도 중...');
                eventSource.close();
                setTimeout(connect, 2000);
                eventSource.close();
            };
            return eventSource;
        };

        const eventSource = connect();

        // 컴포넌트 언마운트 시 연결 해제
        return () => eventSource.close();
    }, []);

    return (
        <SseContext.Provider value={{ messages, error }}>
            {children}
        </SseContext.Provider>
    )
};

// 커스텀 Hook
export const useSse = () => {
    const context = useContext(SseContext);
    if(!context) {
        throw new Error('useSse는 SseProvider 안에서 사용해야 합니다.')
    }
    return context;
}

