import SearchUser from "./components/SearchUser";
import ThemeProvider from "./context/ThemeProvider";

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-100 dark:bg-slate-900 text-black dark:text-white transition-colors">
        <SearchUser />
      </div>
    </ThemeProvider>
  );
}

export default App;
