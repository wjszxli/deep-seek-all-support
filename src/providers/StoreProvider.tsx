import { createContext, useContext, PropsWithChildren } from 'react';
import { stores, TStores } from '@/stores/index';

const StoreContext = createContext<TStores | null>(null);

export const StoreProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <StoreContext.Provider value={stores}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStores = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStores must be used within StoreProvider');
  }
  return context;
}; 