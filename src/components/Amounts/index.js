import {useState} from "react"
import {NumericFormat} from 'react-number-format'

const BillSplitter = () => {
    const [bill, setBill] = useState(null)
    const [tip, setTip] = useState({"baseTip":0, "currentTip":0, "adjTip1":0, "adjTip2":0, "adjTip3":0})
    const [tipPercentage, setTipPercentage] = useState(0)
    const [numOfPeople, setNumOfPeople] = useState(2)
    const [currency, setCurrency] = useState("£")
    const [view, setView] = useState('enterValues')
    const [roundTotalCount, setRoundTotalCount] = useState(0)
    const [roundTipCount, setRoundTipCount] = useState(0)

    function reset() {
        setBill(null)
        setTip({"baseTip":0, "currentTip":0, "adjTip1":0, "adjTip2":0, "adjTip3":0})
        setTipPercentage(0)
        setNumOfPeople(2)
        setView('enterValues')
    }

    const calculate = () => {
        if (bill > 0) {
            setView('showCalculation')
            setRoundTotalCount(0)
            setRoundTipCount(0)
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

    const roundUpTotal = () => {
        let adjTipUpdate = "adjTip" + (roundTotalCount + roundTipCount +1)
        if (roundTotalCount + roundTipCount < 3) {
            const total = (parseFloat(bill) + parseFloat(tip.currentTip)).toFixed(2)
            console.log(total)
            if (total % 10 === 0) {
                let value = parseFloat(tip.currentTip) + 10
                const updatedTip = {...tip}
                updatedTip[adjTipUpdate] = parseFloat(value).toFixed(2)
                updatedTip.currentTip = parseFloat(value).toFixed(2)
                setTip(updatedTip)
                setRoundTotalCount(roundTotalCount + 1)
                return
            }
            if (total % 1 === 0) {
                let value = (Math.ceil(total / 10)) * 10
                if (value - total > 5) {
                    console.log("over5")
                    const updatedTip = {...tip}
                    updatedTip[adjTipUpdate] = ((value - total - 5) + parseFloat(tip.currentTip)).toFixed(2)
                    updatedTip.currentTip = ((value - total - 5) + parseFloat(tip.currentTip)).toFixed(2)
                    setTip(updatedTip)
                    setRoundTotalCount(roundTotalCount + 1)
                    return;
                } else {
                    console.log("under5")
                    const updatedTip = {...tip}
                    updatedTip[adjTipUpdate] = ((value - total) + parseFloat(tip.currentTip)).toFixed(2)
                    updatedTip.currentTip = ((value - total) + parseFloat(tip.currentTip)).toFixed(2)
                    setTip(updatedTip)
                    setRoundTotalCount(roundTotalCount + 1)
                    return;
                }
            }
            if (total % 1 !== 0) {
                let value = Math.ceil(total)
                console.log("not whole number")
                const updatedTip = {...tip}
                updatedTip[adjTipUpdate] = ((value - total) + parseFloat(tip.currentTip)).toFixed(2)
                updatedTip.currentTip = ((value - total) + parseFloat(tip.currentTip)).toFixed(2)
                setTip(updatedTip)
                setRoundTotalCount(roundTotalCount + 1)
            }
        }
    }

    // const roundUpTip = () => {
    //     if (roundTotalCount + roundTipCount < 3) {
    //         const total = parseFloat(tip).toFixed(2)
    //         if (total % 1 === 0) {
    //             let value = (Math.ceil(total / 10)) * 10
    //             if (value - total > 5) {
    //                 setTip((value - 5).toFixed(2))
    //                 setRoundTipCount(roundTipCount + 1)
    //             } else {
    //                 setTip(value.toFixed(2))
    //                 setRoundTipCount(roundTipCount + 1)
    //             }
    //         }
    //         if (total % 1 !== 0) {
    //             let value = Math.ceil(total)
    //             setTip(value.toFixed(2))
    //             setRoundTipCount(roundTipCount + 1)
    //         }
    //     }
    // }

    // const undoRoundUpTotal = () => {
    //     let count = roundTotalCount
    //     setRoundTotalCount(0)
    //     calculateTip()
    //     if (roundTotalCount === 3) {
    //         roundUpTotal
    //             .then(roundUpTotal)
    //         // count = 2
    //     }
    //     if (count === 2) {
    //         roundUpTotal()
    //     }
    // }

    if (view === 'enterValues') {
        return (
            <>
                <div className="content">
                    <p>Bill Splitter</p>

                    <div className="billTotal">
                        <p>Bill Total</p>
                        <div className="bill">
                            <select onChange={e => setCurrency(e.target.value)} name="currency"
                                    className={currency === 'CHF' ? "currency chf" : "currency"}>
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

                    <div>
                        <p>People</p>
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
                        <p>{roundTotalCount}</p>
                        <button
                            className={roundTotalCount + roundTipCount < 3 && roundTotalCount < 3 ? "roundUpLarge" : "roundUpLarge inactiveLargeButton"}
                            onClick={() => roundUpTotal()}>Round Up Total
                        </button>
                        {/*<button className={roundTotalCount > 0 ? "roundUpLarge" : "roundUpLarge inactiveLargeButton"}*/}
                        {/*        onClick={() => undoRoundUpTotal()}>Undo Rnd Up Total*/}
                        {/*</button>*/}

                        {/*<button*/}
                        {/*    className={roundTotalCount + roundTipCount < 3 && roundTipCount < 2 ? "roundUpLarge" : "roundUpLarge inactiveLargeButton"}*/}
                        {/*    onClick={() => roundUpTip()}>Round Up Tip*/}
                        {/*</button>*/}
                        <button
                            className={roundTotalCount + roundTipCount > 0 ? "roundUpLarge" : "roundUpLarge inactiveLargeButton"}
                            onClick={() => {
                                calculateTip();
                                setRoundTotalCount(0);
                                setRoundTipCount(0)
                            }}>Reset Round Up
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