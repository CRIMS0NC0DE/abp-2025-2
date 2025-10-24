import React, { useRef, useState, useEffect } from 'react'
import styles from './Modal.module.css'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  onTransitionEnd?: () => void // Nova prop para gerenciar a animação
}

export default function Modal({
  isOpen,
  onClose,
  children,
  onTransitionEnd,
}: ModalProps) {
  const contentRef = useRef<HTMLDivElement>(null)
  const [showScrollTopButton, setShowScrollTopButton] = useState(false)

  const scrollToTop = () => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0
    }
  }

  const handleScroll = () => {
    if (contentRef.current) {
      setShowScrollTopButton(contentRef.current.scrollTop > 200)
    }
  }

  useEffect(() => {
    const contentElement = contentRef.current
    if (contentElement) {
      contentElement.addEventListener('scroll', handleScroll)
    }
    return () => {
      if (contentElement) {
        contentElement.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  // Removemos o 'if (!isOpen) return null;'
  // O componente pai (ClickableCard) agora controla a montagem/desmontagem

  return (
    <div
      // Adicionamos a classe 'isOpen' dinamicamente
      className={`${styles.modalOverlay} ${isOpen ? styles.isOpen : ''}`}
      onClick={onClose}
      // Escuta o fim da transição para avisar o ClickableCard
      onTransitionEnd={onTransitionEnd}
    >
      <div
        // Adicionamos a classe 'isOpen' dinamicamente
        className={`${styles.modalContent} ${isOpen ? styles.isOpen : ''}`}
        onClick={(e) => e.stopPropagation()}
        ref={contentRef}
      >
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        {children}
        {showScrollTopButton && (
          <button className={styles.scrollTopButton} onClick={scrollToTop}>
            Voltar ao Topo
          </button>
        )}
      </div>
    </div>
  )
}