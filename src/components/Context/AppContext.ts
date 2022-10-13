import React from 'react';

export type ContextTypes = {
    searchValue: string
    setSearchValue: (s: string) => void
}

export const AppContext = React.createContext<Partial<ContextTypes>>({})