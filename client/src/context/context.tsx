import React, { createContext, useState, useContext } from 'react';

interface BoundingBox {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

interface contextType {
  imageUrl: string;
  setImageUrl: React.Dispatch<React.SetStateAction<string>>;
  box: React.CSSProperties;
  setBox: React.Dispatch<React.SetStateAction<React.CSSProperties>>;
  boxDimensions: BoundingBox[];
  setBoxDimensions: React.Dispatch<React.SetStateAction<BoundingBox[]>>;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  imageLoaded: boolean;
  setImageLoaded: React.Dispatch<React.SetStateAction<boolean>>;
  handleImageError: () => void;
  handleImageLoad: () => void;
}

interface MyContextPropsType {
  children: React.ReactNode;
}

export const MyContext = createContext<contextType | null>(null);

export default function Provider({ children }: MyContextPropsType) {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [box, setBox] = useState<object>({});
  const [boxDimensions, setBoxDimensions] = useState<BoundingBox[]>([]);
  const [error, setError] = useState('');
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageError = () => {
    setImageLoaded(false);
    setError('Image could not be loaded. Please check the URL.');
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
    setError(''); // Clear any previous error messages
  };

  return (
    <MyContext.Provider
      value={{
        imageUrl,
        setImageUrl,
        box,
        setBox,
        boxDimensions,
        setBoxDimensions,
        error,
        setError,
        imageLoaded,
        setImageLoaded,
        handleImageError,
        handleImageLoad,
      }}
    >
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
