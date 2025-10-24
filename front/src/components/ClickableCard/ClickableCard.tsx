import React, { useState } from 'react'
import Modal from '../Modal/Modal'
import styles from './ClickableCard.module.css'

interface ClickableCardProps {
  title: string
  iconSrc: string
  modalContent: React.ReactNode
}

export default function ClickableCard({
  title,
  iconSrc,
  modalContent,
}: ClickableCardProps) {
  // Controla a animação (aberto/fechado)
  const [isModalOpen, setIsModalOpen] = useState(false)
  // Controla se o modal está montado (renderizado) na DOM
  const [isModalMounted, setIsModalMounted] = useState(false)

  const openModal = () => {
    setIsModalMounted(true)
    // Pequeno delay para permitir que o CSS monte antes da animação 'open'
    setTimeout(() => {
      setIsModalOpen(true)
    }, 10) // 10ms é suficiente
  }

  const closeModal = () => {
    // Inicia a animação de 'fechar' (fade-out)
    setIsModalOpen(false)
  }

  // Esta função é chamada pelo Modal.tsx quando a animação de saída termina
  const handleTransitionEnd = () => {
    // Se a animação de fechar terminou (!isModalOpen), desmonta o componente
    if (!isModalOpen) {
      setIsModalMounted(false)
    }
  }

  return (
    <>
      <div className={styles.cardContainer} onClick={openModal}>
        <img
          src={iconSrc}
          alt={`Ícone para ${title}`}
          className={styles.cardIcon}
        />
        <h3 className={styles.cardTitle}>{title}</h3>
      </div>

      {/* Renderiza o Modal apenas se 'isModalMounted' for true */}
      {isModalMounted && (
        <Modal
          isOpen={isModalOpen} // Passa o estado da animação
          onClose={closeModal}
          onTransitionEnd={handleTransitionEnd} // Prop para notificar o fim da animação
        >
          {modalContent}
        </Modal>
      )}
    </>
  )
}