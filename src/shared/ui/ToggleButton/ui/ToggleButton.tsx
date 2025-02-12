import styles from './ToggleButton.module.sass'

interface ToggleButtonProps {
    value: any
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const ToggleButton: React.FC<ToggleButtonProps> = ({
    value,
    onChange,
}) => {
    return (
        <label className={styles.toggle}>
            <input
                type="checkbox"
                name=""
                onChange={onChange}
                checked={value}
            />
            <span className={styles.slider}></span>
        </label>
    )
}
