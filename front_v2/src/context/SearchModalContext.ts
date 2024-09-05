/* eslint-disable @typescript-eslint/no-explicit-any */
import {createContext} from 'react';
import {ISearchModal} from 'src/components/Global/SearchModal';

const SearchModalContext = createContext<
	[ISearchModal, React.Dispatch<React.SetStateAction<ISearchModal>>]
>([] as any);

export default SearchModalContext;
