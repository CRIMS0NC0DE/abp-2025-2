// Dentro de front/src/App.tsx

import { ExportCSV } from './pages/ExportCSV/ExportCSV'; // 1. IMPORTE A PÁGINA

function App() {
  return (
    <>
      {/* Aqui você pode ter seu Header e outras coisas */}
      {/* Por exemplo: <Header /> */}
      
      <main>
        <ExportCSV /> {/* 2. RENDERIZE O COMPONENTE DA PÁGINA */}
      </main>
      
      {/* Aqui você pode ter seu Footer */}
    </>
  );
}

export default App;