import React, {useContext} from 'react';
import {MoonLoader} from 'react-spinners';
import {LoadingBarContext, LoadingContext} from 'src/context';
import * as S from './styles';

export interface ILoadingBar {
	show?: boolean;
	total?: number;
	progress?: number;
}

const Loading = () => {
	const [isLoading] = useContext(LoadingContext);
	const [loadingBar] = useContext(LoadingBarContext);

	if (!isLoading) return <></>;

	const getProgress = (): string => {
		if (!loadingBar || !loadingBar.total || !loadingBar.progress) return '0px';

		const result = (loadingBar.progress * 100) / loadingBar.total;
		const progress = (result * 250) / 100;
		return `${progress}px`;
	};

	return (
		<S.Container>
			<MoonLoader color="#008AD2" />

			{loadingBar && loadingBar.show ? (
				<>
					<S.ProgressIndicator>
						<S.ProgressIndicatorLoad progress={getProgress()} />
					</S.ProgressIndicator>
					<S.ProgressContent>
						{loadingBar.progress ?? ''} / {loadingBar?.total ?? ''}
					</S.ProgressContent>
				</>
			) : (
				<></>
			)}
		</S.Container>
	);
};

export default Loading;
