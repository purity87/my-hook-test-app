// Hook을 사용하는 컴포넌트 테스트
// Hook을 사용하는 컴포넌트를 테스트하여 사용자 인터랙션을 시뮬레이션합니다.
import { render, screen, fireEvent } from '@testing-library/react';
import { Counter } from '../Counter';

describe('Counter Component', () => {
    it('renders initial count', () => {
        render(<Counter />);
        expect(screen.getByText('Count: 0')).toBeInTheDocument();
    });

    it('increments count when increment button is clicked', () => {
        render(<Counter />);
        const incrementButton = screen.getByText('Increment');
        fireEvent.click(incrementButton);
        expect(screen.getByText('Count: 1')).toBeInTheDocument();
    });

    it('decrements count when decrement button is clicked', () => {
        render(<Counter />);
        const decrementButton = screen.getByText('Decrement');
        fireEvent.click(decrementButton);
        expect(screen.getByText('Count: -1')).toBeInTheDocument();
    });

    it('resets count when reset button is clicked', () => {
        render(<Counter />);
        const incrementButton = screen.getByText('Increment');
        const resetButton = screen.getByText('Reset');
        fireEvent.click(incrementButton);
        fireEvent.click(resetButton);
        expect(screen.getByText('Count: 0')).toBeInTheDocument();
    });
});