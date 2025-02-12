import { ChevronDown, ChevronUp } from '@/shared/ui/icons'
import styles from './TextField.module.sass'

interface TextFieldNumberArrows {
    max?: number
    min?: number
    value: any
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const TextFieldNumberArrows: React.FC<TextFieldNumberArrows> = ({
    max,
    min,
    value,
    onChange,
}) => {
    return (
        <div className={styles.arrows}>
            <button
                disabled={value === min || false}
                onClick={() =>
                    onChange &&
                    onChange({ target: { value: (value + 1).toString() } })
                }
            >
                <ChevronUp />
            </button>
            <button
                disabled={value === max}
                onClick={() =>
                    onChange &&
                    onChange({ target: { value: (value - 1).toString() } })
                }
            >
                <ChevronDown />
            </button>
        </div>
    )
}
