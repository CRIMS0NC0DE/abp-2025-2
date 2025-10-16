import styles from './Footer.module.css';

// Footer melhorado: responsivo, acessível e com links externos.
export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.brandCol}>
                    <h3 className={styles.title}>INPE</h3>
                    <nav aria-label="INPE links" className={styles.links}>
                        <a href="https://www.instagram.com/inpe.oficial/">Instagram</a>
                        <a href="https://www.gov.br/inpe/pt-br">Site</a>
                    </nav>
                </div>

                <div className={styles.brandCol}>
                    <h3 className={styles.title}>FURNAS</h3>
                    <nav aria-label="FURNAS links" className={styles.links}>
                        <a href="https://www.instagram.com/eletrobrasoficial/">Instagram</a>
                        <a href="https://www.furnas.com.br">Site</a>
                    </nav>
                </div>

                <div className={styles.brandCol}>
                    <h3 className={styles.title}>CRIMS0NC0DE</h3>
                    <nav aria-label="Crimsoncode links" className={styles.links}>
                        <a href="https://github.com/CRIMS0NC0DE/abp-2025-2" >GitHub</a>
                        <a href="mailto:contato@example.com">Fale Conosco</a>
                    </nav>
                </div>
            </div>

            <div className={styles.bottomBar}>
                <small>© {new Date().getFullYear()} CRIMS0NCODE — Todos os direitos reservados.</small>
            </div>
        </footer>
    );
}