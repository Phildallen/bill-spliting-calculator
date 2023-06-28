import {useState} from "react";
import {NumericFormat} from 'react-number-format';

const BillSplitter = () => {
    const [bill, setBill] = useState('')
    const [tipPercentage, setTipPercentage] = useState(0)
    const [numOfPeople, setNumOfPeople] = useState(2)
    const [currency, setCurrency] = useState("£")
    const [view, setView] = useState('enterValues')

    function reset() {
        setBill('')
        setTipPercentage(0)
        setNumOfPeople(2)
        setView('enterValues')
    }

    const handleBillChange = (e) => {
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

    const handleTipDeduction = (e) => {
        if (tipPercentage > 0) {
            setTipPercentage(tipPercentage -1)
        }
        if (tipPercentage <= 0) {
            setTipPercentage(0)
        }
    }

    const handlePeopleDeduction = (e) => {
        if (numOfPeople > 2) {
            setNumOfPeople(numOfPeople -1)
        }
        if (numOfPeople <= 2) {
            setNumOfPeople(2)
        }
    }


    if (view === 'enterValues') {
        return (
            <>
                <div className="content">
                    <p>Bill Splitter</p>

                    <div className="billTotal">
                        <p>Bill Total</p>
                        <div className="bill">
                        <select onChange={e => setCurrency(e.target.value) } name="currency" className="currency">
                            <option value="" selected disabled hidden>{currency}</option>
                            <option value="£">£</option>
                            <option value="€">€</option>
                            <option value="$">$</option>
                            <option value="CHF">F</option>
                            <option value="Kč ">Kč</option>
                            <option value="kr.">kr.</option>
                            <option value="zł.">zł.</option>
                        </select>
                        <p onChange={handleBillChange}>
                            <NumericFormat value={bill} decimalScale={2} fixedDecimalScale allowNegative={false}/>
                        </p>
                    </div>
                    </div>
                    <p>Tip</p>
                    <div className="tipButtons">
                        <button className="tipButton" onClick={() => setTipPercentage(0)}>0%</button>
                        <button className="tipButton" onClick={() => setTipPercentage(5)}>5%</button>
                        <button className="tipButton" onClick={() => setTipPercentage(10)}>10%</button>
                    </div>
                    <div className="tipButtons">
                        <button className="tipButton" onClick={() => setTipPercentage(15)}>15%</button>
                        <button className="tipButton" onClick={() => setTipPercentage(20)}>20%</button>
                        <button className="tipButton" onClick={() => setTipPercentage(25)}>25%</button>
                    </div>
                    <div className="adjNumber">
                    <button className="plusMinusButton" onClick={handleTipDeduction}> - </button>
                    <span className="displayNumber"><span>{tipPercentage}%</span></span>
                    <button className="plusMinusButton" onClick={() => setTipPercentage(tipPercentage+1)}> + </button>
                </div>

                    <div>
                    <p>People</p>
                    <div className="adjNumber">
                    <button className="plusMinusButton" onClick={handlePeopleDeduction}> - </button>
                    <span className="displayNumber"><span>{numOfPeople}</span></span>
                    <button className="plusMinusButton" onClick={() => setNumOfPeople(numOfPeople+1)}> + </button>
                    </div>
                    </div>

                <div className="bottomButtons">
                    <button className="calculate" onClick={() => setView('showCalculation')}>Calculate!</button>
                                    <button className="reset" onClick={() => reset()}>Reset</button>
                </div>

            </div>
            </>
        )
    } else if (view === "showCalculation") {
        return (
            <>
                <div>
                    <p>Per Person</p>
<p>{currency}{numOfPeople > 0 ? ((bill * 100 * (100 + (tipPercentage))) / (numOfPeople * 10000)).toFixed(2) : '0'}</p>
                    <p>Tip per Person
                        £{numOfPeople > 0 ? (((bill * tipPercentage) * 100) / (numOfPeople * 10000)).toFixed(2) : '0'}</p>
                    <button className="reset" onClick={() => reset()}>Reset</button>
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