import React, { createContext, useState, useContext } from 'react';

interface contextType {
  imageUrl: string;
  setImageUrl: React.Dispatch<React.SetStateAction<string>>;
  box: React.CSSProperties;
  setBox: React.Dispatch<React.SetStateAction<React.CSSProperties>>;
}
interface MyContextPropsType {
  children: React.ReactNode;
}

export const MyContext = createContext<contextType | null>(null);

export default function Provider({ children }: MyContextPropsType) {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [box, setBox] = useState<object>({});

  return (
    <MyContext.Provider value={{ imageUrl, setImageUrl, box, setBox }}>
      {children}
    </MyContext.Provider>
  );
}

// Create a custom hook for easier consumption of the context
export const useMyContext = (): contextType => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error('useMyContext must be used within a MyProvider');
  }
  return context;
};
