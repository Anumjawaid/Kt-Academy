type PlusMinusProps = {
    value: number,
    setValue: (value: number) => void,
    step: number,
    min: number,
    title: string
    unit: string
};

export function PlusMinusPicker({value, setValue, step, min, unit, title}: PlusMinusProps) {
    const onPlusClicked = () => {
        setValue(value + step);
    }
    const onMinusClicked = () => {
        if (value - step >= min) setValue(value - step)
    };
    const onValueChange = (event) => {
        setValue(parseInt(event.target.value));
    }

    return <div className="plusminus-wrapper">
        <div>{title}</div>
        <div className="plusminus">
            <button className="minus" onClick={onMinusClicked}>-</button>
            <input type="number" name="productQty" value={value} onChange={onValueChange} min={min}/>
            <button className="plus" onClick={onPlusClicked}>+</button>
            <div className="plusminus-unit">{unit}</div>
        </div>
    </div>
}