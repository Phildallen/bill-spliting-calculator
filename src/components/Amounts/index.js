import {useState} from "react";
import {NumericFormat} from 'react-number-format';


const BillSplitter = () => {
    const [bill, setBill] = useState('')
    const [tipPercentage, setTipPercentage] = useState(0)
    const [numOfPeople, setNumOfPeople] = useState(2)
    const [view, setView] = useState('enterValues')

    function reset() {
        setBill('')
        setTipPercentage(0)
        setNumOfPeople(2)
        setView('enterValues')
    }

    const handleChange = (e) => {
        const {value} = e.target;
        if (+value > 0) {
            if (value.match(/\./g)) {
                const [, decimal] = value.split('.');
                if (decimal?.length > 2) {
                    return;
                }
            }
            setBill(value);
        } else {
            setBill(0)
        }
    }


    if (view === 'enterValues') {
        return (
            <>
                <div className="content">
                    <p>Bill Splitter</p>

                    <div className="billTotal">
                        <p>Bill Total</p>
                        <p onChange={handleChange} className="bill">
                            <NumericFormat value={bill} decimalScale={2} fixedDecimalScale allowNegative={false}/>
                        </p>
                    </div>
                    <p>Tip</p>
                    <div>
                        <button className="tipButton" onClick={() => setTipPercentage(0)}>0%</button>
                        <button className="tipButton" onClick={() => setTipPercentage(5)}>5%</button>
                        <button className="tipButton" onClick={() => setTipPercentage(10)}>10%</button>
                        <button className="tipButton" onClick={() => setTipPercentage(15)}>15%</button>
                        <button className="tipButton" onClick={() => setTipPercentage(20)}>20%</button>
                        <button className="tipButton" onClick={() => setTipPercentage(25)}>25%</button>
                    </div>
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
                <div>
                    <button onClick={() => reset()}>Reset</button>
                </div>
            </>
        )
    } else if (view === "showCalculation") {
        return (
            <>
                <div>
                    <p>Tip per Person
                        £{numOfPeople > 0 ? (((bill * tipPercentage) * 100) / (numOfPeople * 10000)).toFixed(2) : '0'}</p>
                    <p>Total per Person
                        £{numOfPeople > 0 ? ((bill * 100 * (100 + (tipPercentage))) / (numOfPeople * 10000)).toFixed(2) : '0'}</p>
                    <button onClick={() => reset()}>Reset</button>
                </div>
            </>
        )
    }
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