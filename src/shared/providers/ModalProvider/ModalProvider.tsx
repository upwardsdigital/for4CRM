import { ReactNode, useState } from 'react'
import { createPortal } from 'react-dom'
import { ModalContext } from './ModalContext'
import { Modal } from '@/shared/ui/Modal'

type ModalType = {
    id: string
    Component: ReactNode
    title?: string
}
type ModalOptions = {
    title?: string
}

export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [modals, setModals] = useState<ModalType[]>([])

    const openModal = (
        id: string,
        Component: ReactNode,
        options?: ModalOptions,
    ) => {
        setModals((prev) => [...prev, { id, Component, title: options?.title }])
    }

    const closeModal = (id: string) => {
        setModals((prev) => prev.filter((modal) => modal.id !== id))
    }

    return (
        <ModalContext.Provider value={{ openModal, closeModal }}>
            {children}
            {createPortal(
                <div id="modal-root">
                    {modals.map(({ id, Component, title }) => (
                        <Modal
                            key={id}
                            isOpen
                            title={title}
                            onClose={() => closeModal(id)}
                        >
                            {Component}
                        </Modal>
                    ))}
                </div>,
                document.body,
            )}
        </ModalContext.Provider>
    )
}
