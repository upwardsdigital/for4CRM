import React from 'react'
import styles from './Modal.module.sass'
import { IoClose } from 'react-icons/io5'
import clsx from 'clsx'

interface ModalProps {
    isOpen?: boolean
    title?: string
    children: React.ReactNode
    onClose?: () => void
}

export const Modal: React.FC<ModalProps> = ({
    isOpen,
    title,
    children,
    onClose,
}) => {
    return (
        <div className={clsx(styles.modal, isOpen && styles.active)}>
            <div className={styles.modal_inner}>
                <div className={styles.modal_header}>
                    <h4 className={styles.title}>{title ? title : ''}</h4>
                    <button className={styles.close_btn} onClick={onClose}>
                        <IoClose />
                    </button>
                </div>

                <div className={styles.modal_content}>{children}</div>
            </div>
        </div>
    )
}
