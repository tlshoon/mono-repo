// apps/app2/src/App.tsx
import { Button } from '@common/components';
import { formatDate } from '@common/utils';

function App() {
    const today = new Date();


    return (
        <div>
            <h1>App 2</h1>
            <Button text="공통 버튼!" />

            <p>오늘 날짜: {formatDate(today)}</p>
        </div>
    );
}

export default App;
