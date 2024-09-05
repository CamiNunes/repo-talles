/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {faAdd} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {FileUploader} from 'react-drag-drop-files';
import ImpotFileItem from './components/ImpotFileItem';
import * as S from './styles';

export type UploadFileType = {
	name: string;
	contentBase64: string;
};

interface Props {
	qtyFile?: number;
	files: UploadFileType[];
	setFiles: (files: UploadFileType[]) => void;
	fileTypes?: string[];
	textAcceptTypes?: string;
	textColor?: string;
	onNoteUploadFinish?: () => void;
	onNoteFileEnter?: () => void;
	isHide?: boolean;
	onNoteRemoveFile?: (indexRemoved: number) => void;
	border?: string;
	height?: string;
	icon?: any;
	backgroundColor?: string;
	spanTextColor?: string;
	importTextColor?: string;
}

const UploadFile = ({
	qtyFile = 1,
	files,
	setFiles,
	fileTypes = ['JPG', 'JPEG', 'PDF', 'PNG', 'TIFF'],
	textAcceptTypes,
	textColor,
	isHide = false,
	onNoteUploadFinish,
	onNoteFileEnter,
	onNoteRemoveFile,
	border,
	height,
	icon,
	backgroundColor,
	spanTextColor,
	importTextColor,
}: Props) => {
	const handleChange = async (file: any) => {
		if (files.length >= qtyFile) return;
		if (onNoteFileEnter) onNoteFileEnter();
		const fileBase64 = await convertToBase64(file);
		const fileData: UploadFileType = {
			name: file.name,
			contentBase64: fileBase64,
		};

		const data = [...files];
		data.push(fileData);
		setFiles(data);
	};

	const convertToBase64 = (file: any): Promise<string> =>
		new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result as string);
		});

	const onRemoveFile = (index: number) => {
		const data = [...files];
		data.splice(index, 1);
		setFiles(data);
		if (onNoteRemoveFile) onNoteRemoveFile(index);
	};

	return (
		<>
			{files?.reverse()?.map((item, index) => {
				return (
					<ImpotFileItem
						key={index}
						fileName={item.name}
						index={index}
						onRemove={onRemoveFile}
						onNoteWhenFinish={onNoteUploadFinish}
						textColor={textColor}
					/>
				);
			})}

			{(function () {
				if (isHide) return <></>;

				return (
					<>
						<FileUploader handleChange={handleChange} name="file" types={fileTypes}>
							<S.ContentImportFile
								border={border}
								height={height}
								background={backgroundColor}>
								<S.Icon>
									<FontAwesomeIcon icon={icon?.icon ?? faAdd} />
								</S.Icon>
								<S.Import spanColor={spanTextColor} textColor={importTextColor}>
									Clique para adicionar{' '}
									<span>ou arraste e solte um arquivo aqui</span>
								</S.Import>
							</S.ContentImportFile>
						</FileUploader>
						<S.ImportInfo textColor={textColor}>
							{textAcceptTypes && textAcceptTypes != ''
								? textAcceptTypes
								: `Arquivos nos formatos ${fileTypes.join(
										', ',
								  )} com tamanho máximo de 00MB`}
						</S.ImportInfo>
					</>
				);
			})()}
		</>
	);
};

export default UploadFile;
