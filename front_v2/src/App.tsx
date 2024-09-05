import React, {useState} from 'react';
import Routing from 'src/router';
import {ThemeProvider} from 'styled-components';
import theme from 'src/theme';
import CustomModal, {ICustomModal} from './components/Global/CustomModal';
import Loading, {ILoadingBar} from './components/Global/Loading';
import SearchModal, {ISearchModal} from './components/Global/SearchModal';
import {
	LoadingContext,
	CustomModalContext,
	SearchModalContext,
	UserContext,
	LoadingBarContext,
} from './context';
import {IUser} from 'src/@types/app';

const App = () => {
	const [customModal, setCustomModal] = useState<ICustomModal>({});
	const [isLoading, setIsLoading] = useState(false);
	const [seachModal, setSearchModal] = useState<ISearchModal>({});
	const [user, setUser] = useState<IUser>({});
	const [loadingBar, setLoadingBar] = useState<ILoadingBar>({});

	return (
		<UserContext.Provider value={[user, setUser]}>
			<CustomModalContext.Provider value={[customModal, setCustomModal]}>
				<LoadingContext.Provider value={[isLoading, setIsLoading]}>
					<SearchModalContext.Provider value={[seachModal, setSearchModal]}>
						<LoadingBarContext.Provider value={[loadingBar, setLoadingBar]}>
							<ThemeProvider theme={theme}>
								<Routing />
								<CustomModal />
								<SearchModal />
								<Loading />
							</ThemeProvider>
						</LoadingBarContext.Provider>
					</SearchModalContext.Provider>
				</LoadingContext.Provider>
			</CustomModalContext.Provider>
		</UserContext.Provider>
	);
};

export default App;
