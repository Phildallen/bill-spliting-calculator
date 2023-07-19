import {useState} from "react"
import {NumericFormat} from 'react-number-format'

const BillSplitter = () => {
    const [bill, setBill] = useState(null)
    const [tip, setTip] = useState({"baseTip": 0, "currentTip": 0, "adjTip1": 0, "adjTip2": 0, "adjTip3": 0})
    const [tipPercentage, setTipPercentage] = useState(0)
    const [numOfPeople, setNumOfPeople] = useState(2)
    const [currency, setCurrency] = useState("£")
    const [view, setView] = useState('enterValues')
    const [roundCount, setRoundCount] = useState(0)

    function reset() {
        setBill(null)
        setTip({"baseTip": 0, "currentTip": 0, "adjTip1": 0, "adjTip2": 0, "adjTip3": 0})
        setTipPercentage(0)
        setNumOfPeople(2)
        setView('enterValues')
    }

    const calculate = () => {
        if (bill > 0) {
            setView('showCalculation')
            setRoundCount(0)
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
        const value = (bill * 100 * tipPercentage) / 10000
        const updatedTip = {...tip}
        updatedTip.baseTip = value.toFixed(2)
        updatedTip.currentTip = value.toFixed(2)
        setTip(updatedTip)
    };

    const handleTipDeduction = (e) => {
        if (tipPercentage > 0) {
            setTipPercentage(tipPercentage - 1)
        }
        if (tipPercentage <= 0) {
            setTipPercentage(0)
        }
    }

    const handlePeopleDeduction = (e) => {
        if (numOfPeople > 2) {
            setNumOfPeople(numOfPeople - 1)
        }
        if (numOfPeople <= 2) {
            setNumOfPeople(2)
        }
    }

    const roundUpCalc = (total) => {
        if (total % 10 === 0) {
            return parseFloat(tip.currentTip) + 5;
        }
        if (total % 1 === 0) {
            let tipIncrease = (Math.ceil(total / 10)) * 10
            if (tipIncrease - total > 5) {
                return ((tipIncrease - total - 5) + parseFloat(tip.currentTip)).toFixed(2);
            } else {
                return ((tipIncrease - total) + parseFloat(tip.currentTip)).toFixed(2);
            }
        }
        if (total % 1 !== 0) {
            return ((Math.ceil(total) - total) + parseFloat(tip.currentTip)).toFixed(2);
        }
    }

    const roundUp = (totalOrTip) => {
        let adjTipUpdate = "adjTip" + (roundCount + 1)
        let total = 0
        if (roundCount < 3) {
            if (totalOrTip === "total") {
                total = (parseFloat(bill) + parseFloat(tip.currentTip)).toFixed(2)
            }
            if (totalOrTip === "tip") {
                total = parseFloat(tip.currentTip).toFixed(2)
            }
            let value = roundUpCalc(total)
            const updatedTip = {...tip}
            updatedTip[adjTipUpdate] = parseFloat(value).toFixed(2)
            updatedTip.currentTip = parseFloat(value).toFixed(2)
            setTip(updatedTip)
            setRoundCount(roundCount + 1)
        }
    }

    const undoRoundUp = () => {
        let adjTipUpdate = ""
        if (roundCount < 1) {
            return
        }
        if (roundCount === 1) {
            adjTipUpdate = "baseTip"
        }
        if (roundCount > 1) {
            adjTipUpdate = "adjTip" + (roundCount - 1)
        }
        const updatedTip = {...tip}
        updatedTip.currentTip = tip[adjTipUpdate]
        setTip(updatedTip)
        setRoundCount(roundCount - 1)

    }

    const resetRoundUp = () => {
        if (roundCount > 1) {
            const updatedTip = {...tip}
            updatedTip.currentTip = tip.baseTip
            setTip(updatedTip)
            setRoundCount(0)
        }
    }

    if (view === 'enterValues') {
        return (
            <>
                <div className="content">
                    <h2>Bill Splitter</h2>
                    <div className="item">
                        <p className="flexboxHeading2">Bill Total</p>
                        <div className="bill">

                            <div className="currencyBox">
                                <select defaultValue="" onChange={e => setCurrency(e.target.value)} name="currency"
                                        className={currency === 'CHF' ? "currency chf" : "currency"}>
                                    <option value="" disabled hidden>{currency}</option>
                                    <option value="£">£</option>
                                    <option value="€">€</option>
                                    <option value="$">$</option>
                                    <option value="CHF">CHF</option>
                                    <option value="Kč ">Kč</option>
                                    <option value="kr.">kr.</option>
                                    <option value="zł.">zł.</option>
                                </select>
                            </div>
                            <p className="billAmount" onChange={handleBillChange}>
                                <NumericFormat className="numericFormat" pattern="[0-9]*" inputMode="decimal"
                                               value={bill} decimalScale={2} fixedDecimalScale allowNegative={false}/>
                            </p>
                        </div>
                    </div>
                    <div className="item">
                        <p>Tip</p>
                        <div className="tipButtons">
                            <button className={tipPercentage === 0 ? "tipSelected" : "tipButton"}
                                    onClick={() => setTipPercentage(0)}>0%
                            </button>
                            <button className={tipPercentage === 5 ? "tipSelected" : "tipButton"}
                                    onClick={() => setTipPercentage(5)}>5%
                            </button>
                            <button className={tipPercentage === 10 ? "tipSelected" : "tipButton"}
                                    onClick={() => setTipPercentage(10)}>10%
                            </button>
                        </div>
                        <div className="tipButtons">
                            <button className={tipPercentage === 15 ? "tipSelected" : "tipButton"}
                                    onClick={() => setTipPercentage(15)}>15%
                            </button>
                            <button className={tipPercentage === 20 ? "tipSelected" : "tipButton"}
                                    onClick={() => setTipPercentage(20)}>20%
                            </button>
                            <button className={tipPercentage === 25 ? "tipSelected" : "tipButton"}
                                    onClick={() => setTipPercentage(25)}>25%
                            </button>
                        </div>
                        <div className="adjNumber">
                            <button className="plusMinusButton" onClick={handleTipDeduction}> -</button>
                            <span className="displayNumber"><span>{tipPercentage}%</span></span>
                            <button className="plusMinusButton" onClick={() => setTipPercentage(tipPercentage + 1)}> +
                            </button>
                        </div>
                    </div>
                    <div className="item">
                        <p className="flexboxHeadingHalf">People</p>
                        <div className="adjNumber">
                            <button className="plusMinusButton" onClick={handlePeopleDeduction}> -</button>
                            <span className="displayNumber"><span>{numOfPeople}</span></span>
                            <button className="plusMinusButton" onClick={() => setNumOfPeople(numOfPeople + 1)}> +
                            </button>
                        </div>
                    </div>

                    <div className="bottomButtons">
                        <button className={bill > 0 ? "calculate" : "inactiveLargeButton"} onClick={() => {
                            calculate();
                            calculateTip()
                        }}>Calculate!
                        </button>
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
                        <p className="calculation">{currency} {((parseFloat(bill) + parseFloat(tip.currentTip)) / numOfPeople).toFixed(2)}</p>
                        {tip.currentTip > 0 ? <p>Bill/Tip Total</p> : <p>Bill Total</p>}
                        {tip.currentTip > 0 ?
                            <p className="calculation">{currency} {(parseFloat(bill) + parseFloat(tip.currentTip)).toFixed(2)} / {currency} {tip.currentTip}</p>
                            :
                            <p className="calculation">{currency} {(parseFloat(bill) + parseFloat(tip.currentTip)).toFixed(2)}</p>}
                        {tip.currentTip > 0 ? <p>Bill/Tip Per Person</p> : null}
                        {tip.currentTip > 0 ?
                            <p className="calculation">{currency} {((bill * 10000) / (numOfPeople * 10000)).toFixed(2)} /
                                {currency} {((tip.currentTip * 10000) / (numOfPeople * 10000)).toFixed(2)}</p> : null}
                    </div>
                    <div className="bottomButtons">
                        <button
                            className={roundCount < 3 ? "roundUpLarge" : "roundUpLarge inactiveLargeButton"}
                            onClick={() => roundUp("total")}>Round Up Total
                        </button>
                        <button
                            className={roundCount < 3 ? "roundUpLarge" : "roundUpLarge inactiveLargeButton"}
                            onClick={() => roundUp("tip")}>Round Up Tip
                        </button>
                        <button className={roundCount > 0 ? "roundUpLarge" : "roundUpLarge inactiveLargeButton"}
                                onClick={() => undoRoundUp()}>Undo Round Up
                        </button>
                        <button
                            className={roundCount > 1 ? "roundUpLarge" : "roundUpLarge inactiveLargeButton"}
                            onClick={() => resetRoundUp()}>Reset Round Up
                        </button>
                        <button className="goBack" onClick={() => setView('enterValues')}>Go Back</button>
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