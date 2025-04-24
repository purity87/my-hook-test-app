// components/LadderBoard.js
'use client';
import React, { useEffect, useState } from 'react';
import { useSse } from '@/context/SseContext';

export default function LadderBoard() {
    const { messages } = useSse();
    const [currentPosition, setCurrentPosition] = useState(0);
    const [currentPlayer, setCurrentPlayer] = useState(null);
    const [path, setPath] = useState([]);

    useEffect(() => {
        const latestMessage = messages[messages.length - 1];
        if (latestMessage?.position) {
            setCurrentPosition(latestMessage.position);
        }
        if (latestMessage?.player) {
            setCurrentPlayer(latestMessage.player);
        }
    }, [messages]);

    // 사다리 설정
    const lanes = 4; // 4개의 수직선
    const steps = 5; // 5단계
    const laneWidth = 100;
    const stepHeight = 60;
    const svgWidth = lanes * laneWidth;
    const svgHeight = steps * stepHeight;

    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">사다리 게임 보드</h2>
            <p
                className={`transition-all duration-500 ${
                    currentPlayer ? 'text-blue-600' : 'text-black'
                }`}
            >
                현재 위치: {currentPosition} {currentPlayer && `(플레이어: ${currentPlayer})`}
            </p>
            <svg
                width={svgWidth}
                height={svgHeight}
                className="border border-gray-300 mt-4"
            >
                {/* 수직 사다리 선 */}
                {Array.from({ length: lanes }).map((_, i) => (
                    <line
                        key={`vline-${i}`}
                        x1={i * laneWidth + laneWidth / 2}
                        y1={0}
                        x2={i * laneWidth + laneWidth / 2}
                        y2={svgHeight}
                        stroke="black"
                        strokeWidth="2"
                    />
                ))}
                {/* 수평 연결선 (SSE path 기반) */}
                {path.map((connect, step) =>
                    connect ? (
                        <line
                            key={`hline-${step}`}
                            x1={(currentPosition * laneWidth + laneWidth / 2)}
                            y1={(step + 0.5) * stepHeight}
                            x2={((currentPosition + 1) * laneWidth + laneWidth / 2)}
                            y2={(step + 0.5) * stepHeight}
                            stroke="black"
                            strokeWidth="2"
                        />
                    ) : null
                )}
                {/* 플레이어 아이콘 */}
                <circle
                    cx={currentPosition * laneWidth + laneWidth / 2}
                    cy={svgHeight - 20}
                    r="15"
                    fill="blue"
                    className="transition-all duration-500"
                />
                <text
                    x={currentPosition * laneWidth + laneWidth / 2}
                    y={svgHeight - 30}
                    textAnchor="middle"
                    fontSize="12"
                    fill="white"
                >
                    {currentPlayer || 'P'}
                </text>
            </svg>
        </div>
    );
}