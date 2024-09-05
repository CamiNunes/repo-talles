import React, {useContext, useEffect} from 'react';
import {Modal} from 'src/components/Complex';
import {Button, Wrapper} from 'src/components/UI';
import CustomModalContext from 'src/context/CustomModalContext';
import * as S from './styles';

export interface ICustomModal {
	title?: string;
	description?: string;
	onConfirm?: () => void;
	isShow?: boolean;
}

const CustomModal = () => {
	const [customModal, setCustomModal] = useContext(CustomModalContext);

	useEffect(() => {
		setCustomModal({
			isShow: false,
			title: 'Titulo',
			description: 'Descrição',
		});
	}, []);

	return (
		<Modal
			isOpen={customModal.isShow ?? false}
			onClose={() => setCustomModal({...customModal, isShow: !customModal.isShow})}
			width="25%"
			maxWidth="450px"
			style={{
				padding: 0,
				background: 'transparent',
			}}>
			<>
				<S.Container>
					<S.Header>{customModal.title}</S.Header>
					<S.Body>
						{customModal.description}
						<Wrapper margin="22px 0 0 0" justifyContent="end">
							<Button
								text="Fechar"
								themeStyle="light"
								fill="auto"
								onClick={() => setCustomModal({...customModal, isShow: false})}
							/>
							{customModal?.onConfirm ? (
								<Button
									text="OK"
									themeStyle="success"
									fill="auto"
									onClick={() => {
										customModal?.onConfirm ? customModal.onConfirm() : null;
										setCustomModal({...customModal, isShow: false});
									}}
								/>
							) : (
								<></>
							)}
						</Wrapper>
					</S.Body>
				</S.Container>
			</>
		</Modal>
	);
};

export default CustomModal;
