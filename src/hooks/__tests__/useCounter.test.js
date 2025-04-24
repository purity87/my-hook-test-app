// @testing-library/react의 renderHook을 사용하여 Hook을 직접 테스트합니다.
import { renderHook, act } from '@testing-library/react';
import { useCounter } from '../useCounter';

describe('useCounter Hook', () => {
    it('should initialize with default value', () => {
        const { result } = renderHook(() => useCounter());
        expect(result.current.count).toBe(0);
    });

    it('should initialize with provided value', () => {
        const { result } = renderHook(() => useCounter(5));
        expect(result.current.count).toBe(5);
    });

    it('should increment count', () => {
        const { result } = renderHook(() => useCounter());
        act(() => {
            result.current.increment();
        });
        expect(result.current.count).toBe(1);
    });

    it('should decrement count', () => {
        const { result } = renderHook(() => useCounter());
        act(() => {
            result.current.decrement();
        });
        expect(result.current.count).toBe(-1);
    });

    it('should reset count', () => {
        const { result } = renderHook(() => useCounter(10));
        act(() => {
            result.current.increment();
            result.current.reset();
        });
        expect(result.current.count).toBe(10);
    });
});