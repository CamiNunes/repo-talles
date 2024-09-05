import React, {useEffect, useState} from 'react';
import {ReactSVG} from 'react-svg';
import * as S from './styles';

interface ImpotFileItemProps {
	fileName: string;
	index: number;
	textColor?: string;
	onRemove: (index: number) => void;
	onNoteWhenFinish?: () => void;
}

const ImpotFileItem = ({
	fileName,
	index,
	onRemove,
	onNoteWhenFinish,
	textColor,
}: ImpotFileItemProps) => {
	const [progress, setProgress] = useState(0);
	const [completed, setCompleted] = useState(false);

	useEffect(() => {
		loadFile();
	}, []);

	useEffect(() => {
		if (progress < 100) {
			loadFile();
		} else {
			setCompleted(true);
			if (onNoteWhenFinish) onNoteWhenFinish();
		}
	}, [progress]);

	const loadFile = () => {
		setTimeout(() => {
			setProgress(progress + 20);
		}, 50);
	};

	return (
		<>
			<S.File progress={progress}>
				<div className="content">
					{completed ? (
						<ReactSVG src="/icons/check-circle.svg" />
					) : (
						<ReactSVG src="/icons/file.svg" />
					)}
					<div className="detail">
						<span style={{color: textColor}}>{fileName}</span>
						<div className="progress-bar">
							<div className="bar"></div>
						</div>
					</div>
				</div>
				<div className="btn">
					<a style={{color: textColor}} onClick={() => onRemove(index)}>
						{completed ? 'Remove' : 'Cancelar'}
					</a>
				</div>
			</S.File>
		</>
	);
};

export default ImpotFileItem;
