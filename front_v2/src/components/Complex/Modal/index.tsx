/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import * as S from './styles';

type ModalProps = {
	children: JSX.Element;
	isOpen: boolean;
	showOverlay?: boolean;
	onClose: () => void;
	width?: string;
	maxWidth?: string;
	style?: any;
	borderRadius?: string;
	maxHeight?: string;
	height?: string;
};

const Modal = ({
	children,
	isOpen,
	style,
	showOverlay = true,
	onClose,
	width = '100%',
	maxWidth = '650px',
	borderRadius,
	maxHeight = '90vh',
	height,
}: ModalProps) => {
	return (
		<>
			<S.Content>
				<S.Wrapper
					background="#ddd"
					borderRadius={borderRadius}
					className={`modal ${isOpen ? 'active' : 'none'}`}
					id="modal"
					maxHeight={maxHeight}
					height={height}
					style={{width: width, maxWidth: maxWidth, ...style}}>
					<S.Body>{children}</S.Body>
				</S.Wrapper>
				{showOverlay && (
					<div
						id={isOpen ? 'overlay' : 'none'}
						onClick={() => onClose()}
						style={{opacity: isOpen ? 1 : 0}}></div>
				)}
			</S.Content>
		</>
	);
};

export default Modal;
