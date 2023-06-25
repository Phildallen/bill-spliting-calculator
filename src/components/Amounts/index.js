import {useState} from "react";

const BillSplitter = () => {
    const [bill, setBill] = useState('')
    const [tipPercentage, setTipPercentage] = useState(0)
    const [numOfPeople, setNumOfPeople] = useState('')
    const [view, setView] = useState('enterValues')

    function reset(){
        setBill('0')
        setTipPercentage(0)
        setNumOfPeople(0)
        setView('enterValues')
    }

    if (view === 'enterValues') {
    return (
    <>
        <div>
        <p>Total Bill</p>
        <input
            name="bill"
                value={bill}
                onChange={e => setBill(e.target.value)}
            />
        <p>Tip percentage</p>
        <button onClick={() => setTipPercentage(5)}>5%</button>
        <button onClick={() => setTipPercentage(10)}>10%</button>
        <button onClick={() => setTipPercentage(15)}>15%</button>
        <button onClick={() => setTipPercentage(25)}>25%</button>
        <button onClick={() => setTipPercentage(50)}>50%</button>
        <input
            name="tipPercent"
                value={tipPercentage}
                onChange={e => setTipPercentage(e.target.value)}
            />
        <p>Number of People</p>
        <input name="numOfPeople" value={numOfPeople} onChange={e => setNumOfPeople(e.target.value)}/>
    </div>
        <div>
        <button onClick={() => setView('showCalculation')}>Calculate!</button>
    </div>
    </>
    )} else if (view === "showCalculation")
    {
    return (
        <>
            <div>
                <p>Tip per Person £{numOfPeople > 0 ? (((bill * tipPercentage)*100)/(numOfPeople * 10000)).toFixed(2) : '0'}</p>
                <p>Total per Person £{numOfPeople > 0 ? ((bill * 100 * (100+(tipPercentage)))/(numOfPeople * 10000)).toFixed(2) : '0'}</p>
                <button onClick={() => reset()}>Reset</button>
            </div>
        </>
    )}
    {
        return (
            <>
                <div>
                    <p>Something has gone wrong!</p>
                    <button onClick={() => reset()}>Reset</button>
                </div>
            </>
        )
    }
}

export default BillSplitter