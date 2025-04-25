import { NextResponse } from 'next/server';

export async function GET(req) {
    const headers = {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
    };

    // 스트림 생성
    const stream = new ReadableStream({
        async start(controller) {
            const encoder = new TextEncoder();
            const interval = setInterval(() => {
                // 4개의 레인(0, 1, 2, 3) 사이에 연결선 생성 (0-1, 1-2, 2-3)
                const bridges = Array.from({ length: 5 }, () => ({
                    lanePair: Math.floor(Math.random() * 3), // 0: 0-1, 1: 1-2, 2: 2-3
                    hasBridge: Math.random() > 0.5, // 연결선 여부
                }));
                const message = {
                    text: `서버 메시지: ${new Date().toISOString()}`,
                    position: Math.floor(Math.random() * 4), // 시작 레인 (0~3)
                    player: `Player${Math.floor(Math.random() * 4) + 1}`,
                    bridges, // 5단계의 연결선 데이터
                };
                const data = `data: ${JSON.stringify(message)}\n\n`;
                controller.enqueue(encoder.encode(data));
            }, 2000);

            req.signal.addEventListener('abort', () => {
                clearInterval(interval);
                controller.close();
            });
        },
    });

    return new NextResponse(stream, { headers });
}