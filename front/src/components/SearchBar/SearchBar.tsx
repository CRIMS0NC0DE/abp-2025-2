import styles from './SearchBar.module.css';

interface SearchBarProps {
  placeholder?: string; // Prop opcional para customizar o texto
}

// Componente de busca reutilizável
const SearchBar: React.FC<SearchBarProps> = ({ placeholder = "Buscar..." }) => {
  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        placeholder={placeholder}
        className={styles.searchInput}
      />
      <button className={styles.searchButton} aria-label="Buscar">
        <span role="img" aria-hidden="true">🔍</span>
      </button>
    </div>
  );
};

export default SearchBar;