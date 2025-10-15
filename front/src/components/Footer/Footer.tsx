import styles from './Footer.module.css';

// Footer simples com informações de direitos autorais.
export default function Footer() {
    return (
        <footer>
            <div className={styles.inpe__container}>
                <h3>INPE</h3>
                <a href="">Instagram</a>
                <a href="">Site</a>
            </div>
            <div className={styles.furnas__container}>
                <h3>FURNAS</h3>
                <a href="">Site</a>
            </div>
            <div className={styles.crimson__container}>
                <h3>CRIMS0NC0DE</h3>
                <a href="">GitHub</a>
                <a href="">Fale Conosco</a>
            </div>
        </footer>
    );
}