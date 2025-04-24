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

            // 모의 데이터 전송 (실제로는 서버 로직으로 대체)
            const interval = setInterval(() => {
                const message = {
                    text: `서버 메시지: ${new Date().toISOString()}`,
                    position: Math.floor(Math.random() * 10), // 사다리 게임용 위치 데이터 예시 (0~9)
                    player: `Player${Math.floor(Math.random() * 4) + 1}`, // 플레이어 예시
                };
                const data = `data: ${JSON.stringify(message)}\n\n`;
                controller.enqueue(encoder.encode(data));
            }, 2000);

            // 클라이언트 연결 종료 시 정리
            req.signal.addEventListener('abort', () => {
                clearInterval(interval);
                controller.close();
            });
        },
    });

    return new NextResponse(stream, { headers });
}