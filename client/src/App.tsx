import { RecoveryProvider } from "./context/RecoveryProvider";
import AppRoutes from "./routes/Routes";


const App = () => {
  return (
    <RecoveryProvider>
      <div>
        <AppRoutes />
      </div>
    </RecoveryProvider>
  );
};

export default App;
