import {useState} from "react";
import {NumericFormat} from 'react-number-format';

const BillSplitter = () => {
    const [bill, setBill] = useState(null)
    const [tip, setTip] = useState(0)
    const [tipPercentage, setTipPercentage] = useState(0)
    const [numOfPeople, setNumOfPeople] = useState(2)
    const [currency, setCurrency] = useState("£")
    const [view, setView] = useState('enterValues')

    function reset() {
        setBill(null)
        setTip(0)
        setTipPercentage(0)
        setNumOfPeople(2)
        setView('enterValues')
    }

    function calculate() {
        if (bill > 0) {
            setView('showCalculation')
        }
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

    const calculateTip = () => {
        const value = (bill*100*tipPercentage)/10000
        setTip(value.toFixed(2))
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
                        <select onChange={e => setCurrency(e.target.value) } name="currency" className={currency === 'CHF' ? "currency chf" : "currency"}>
                            <option value="" selected disabled hidden>{currency}</option>
                            <option value="£">£</option>
                            <option value="€">€</option>
                            <option value="$">$</option>
                            <option value="CHF">CHF</option>
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
                        <button className={tipPercentage === 0 ? "tipSelected" : "tipButton"} onClick={() => setTipPercentage(0)}>0%</button>
                        <button className={tipPercentage === 5 ? "tipSelected" : "tipButton"} onClick={() => setTipPercentage(5)}>5%</button>
                        <button className={tipPercentage === 10 ? "tipSelected" : "tipButton"} onClick={() => setTipPercentage(10)}>10%</button>
                    </div>
                    <div className="tipButtons">
                        <button className={tipPercentage === 15 ? "tipSelected" : "tipButton"} onClick={() => setTipPercentage(15)}>15%</button>
                        <button className={tipPercentage === 20 ? "tipSelected" : "tipButton"} onClick={() => setTipPercentage(20)}>20%</button>
                        <button className={tipPercentage === 25 ? "tipSelected" : "tipButton"} onClick={() => setTipPercentage(25)}>25%</button>
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
                    <button className={bill > 0 ? "calculate" : "inactiveCalc"} onClick={() => {calculate(); calculateTip()}}>Calculate!</button>
                                    <button className="reset" onClick={() => reset()}>Reset</button>
                </div>

            </div>
            </>
        )
    } else if (view === "showCalculation") {
        return (
            <>
                <div className="content">
                <div>
                    <p>Total Per Person</p>
                    <p className="calculation">{currency} {((parseFloat(bill) + parseFloat(tip))/numOfPeople).toFixed(2)}</p>
                    {tipPercentage >0 ?<p>Bill/Tip Total</p> : <p>Bill Total</p>}
                    {tipPercentage >0 ?<p className="calculation">{currency} {(parseFloat(bill) + parseFloat(tip)).toFixed(2)} / {currency} {tip}</p>
                        : <p className="calculation">{currency} {(parseFloat(bill) + parseFloat(tip)).toFixed(2)}</p>}
                    {tipPercentage >0 ?<p>Bill/Tip Per Person</p> : null}
                    {tipPercentage >0 ?<p className="calculation">{currency} {((bill * 10000) / (numOfPeople * 10000)).toFixed(2)} /
                        {currency} {((tip * 10000) / (numOfPeople * 10000)).toFixed(2)}</p> : null}



                    <button className="reset" onClick={() => reset()}>Reset</button>
                </div>
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