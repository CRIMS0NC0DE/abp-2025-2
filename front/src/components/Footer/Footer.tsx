import styles from './Footer.module.css';

// Footer simples com informações de direitos autorais.
export default function Footer() {
    return (
        <footer className={styles.footerContainer}>

            <div className='footer-container'>
                <div className='footer-crimsoncode'>
                    <h3>CRIMSONCODE</h3>
                    <p>© 2025 LimnoVis. Desenvolvido por <a href="https://github.com" target="_blank" rel="noopener noreferrer">CrimsonCode</a></p>
                </div>
                <div className='footer-contatos'>
                    <h3>Contatos</h3>
                </div>
            </div>
        </footer>
    );
}