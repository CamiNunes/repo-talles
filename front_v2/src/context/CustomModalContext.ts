/* eslint-disable @typescript-eslint/no-explicit-any */
import {createContext} from 'react';
import {ICustomModal} from 'src/components/Global/CustomModal';

const CustomModalContext = createContext<
	[ICustomModal, React.Dispatch<React.SetStateAction<ICustomModal>>]
>([] as any);

export default CustomModalContext;
