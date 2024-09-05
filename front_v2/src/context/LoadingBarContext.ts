/* eslint-disable @typescript-eslint/no-explicit-any */
import {createContext} from 'react';
import {ILoadingBar} from 'src/components/Global/Loading';

const LoadingBarContext = createContext<
	[ILoadingBar, React.Dispatch<React.SetStateAction<ILoadingBar>>]
>([] as any);

export default LoadingBarContext;
