import styles from './Footer.module.css';

// Footer simples com informações de direitos autorais.
export default function Footer() {
    return (
        <footer className={styles.footerContainer}>
            <div className='inpe__container'>
                <h3>INPE</h3>
                <ul>
                    <li>
                        <a href="">Site</a>
                    </li>
                    <li>
                        <a href="">Instagram</a>
                    </li>
                </ul>
            </div>
            <div className='furnas__container'>
                <h3>Furnas</h3>
                <ul>
                    <li>
                        <a href="" className='furnas__container__links'>Site</a>
                    </li>
                </ul>
            </div>
            <div className='crimsoncode__container'>
                <h3>Crimson Code</h3>
                <ul>
                    <li>
                        <a href="">GitHub</a>
                        <a href="">Fale Conosco</a>
                        <a href="">Instagram</a>
                    </li>
                </ul>
            </div>
        </footer>
    );
}