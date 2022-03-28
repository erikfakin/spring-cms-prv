import Select from 'react-select'
import styles from './SelectInput.module.scss'

const SelectInput = ({options, value, onChange, label}) => {
    return <label className={styles.selectInput}>
        {label}
        <Select
            options={options}
            value={value}
            onChange={onChange}
            className={styles.selectInput__select}
        />
    </label>
}

export default SelectInput