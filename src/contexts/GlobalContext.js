import React, { createContext, useState } from 'react';
import { API_KEY } from '@env';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [idioma, setIdioma] = useState('pt-BR');
    const [isSeries, setIsSeries] = useState(false); 
    const [usuario, setUsuario] = useState(null);
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_KEY}`
        }
    };
    const [db, setDb] = useState(null);

  return (
    <GlobalContext.Provider value={{ idioma, setIdioma, isSeries, setIsSeries, options, usuario, setUsuario, db, setDb}}>
      {children}
    </GlobalContext.Provider>
  );
};
