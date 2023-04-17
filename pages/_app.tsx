import '@/styles/globals.css'
import '@/public/fontawesome/css/all.css'
import type { AppProps } from 'next/app'
import { createContext, useState } from 'react'
import { DishPreview, SearchContextType } from '@/components/types'

export const SearchContext = createContext<SearchContextType>({
  searchData: [],
  setSearchData: () => {},
})

export default function App({ Component, pageProps }: AppProps) {

  const [searchData, setSearchData] = useState<DishPreview[]>([])

  return (
    <SearchContext.Provider value={{searchData: searchData, setSearchData: setSearchData}}>
      <Component {...pageProps} />
    </SearchContext.Provider>
  )
}
