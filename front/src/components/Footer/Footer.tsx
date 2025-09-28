import styles from './Footer.module.css';

// Footer simples com informações de direitos autorais.
export default function Footer() {
    return (
        <footer className={styles.footerContainer}>
            <p>
                © 2025 LimnoVis. Desenvolvido por <a href="https://github.com" target="_blank" rel="noopener noreferrer">CrimsonCode</a>.
            </p>
        </footer>
    );
}