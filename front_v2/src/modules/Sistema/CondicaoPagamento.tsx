/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {useState, useContext} from 'react';
import {
	validateRequired,
	validateMinValue,
	validateMinLength,
	validateMaxValue,
	validateMaxLength,
	validateEmail,
	validateUrl,
	validateLessThan,
	validateGreatThan,
	validateCpfCnpj,
	validateBetween,
	checkFormIsValid,
} from 'src/helpers/validation/validation-methods';
import TemplateData from 'src/template';
import {Wrapper, Button, WidthBox, Input, InputDate} from 'src/components/UI';
import {} from '@fortawesome/free-solid-svg-icons';
import {dbgraficasistemaRepository} from 'src/shared/repositories/dbgraficasistema-repository';
import LoadingContext from 'src/context/LoadingContext';
import CustomModalContext from 'src/context/CustomModalContext';
import SearchModalContext from 'src/context/SearchModalContext';
import UserContext from 'src/context/UserContext';

type FormData = {
	Id?: any;
	IdentCondicaoPagamento?: string;
	DsCondicaoPagamento?: string;
	DtAlteracaoCondicaoPagamento?: Date;
};

type FormDataError = {
	IdentCondicaoPagamento?: string;
	DsCondicaoPagamento?: string;
	DtAlteracaoCondicaoPagamento?: string;
};

const CondicaoPagamento = () => {
	const [authUser, setUser] = useContext(UserContext);
	const [, setIsLoading] = useContext(LoadingContext);
	const [, setCustomModal] = useContext(CustomModalContext);
	const [, setSearchModal] = useContext(SearchModalContext);

	const [formData, setFormData] = useState<FormData>();
	const [formError, setFormError] = useState<FormDataError>();
	const [hideFields, setHideFields] = useState<any>({});
	const [disableFields, setDisableFields] = useState<any>({});

	const _dbgraficasistemaRepository = new dbgraficasistemaRepository();

	const clearPage = () => {
		setFormData(undefined);
		setFormError(undefined);
	};

	const validForm = (): boolean => {
		const [hasError, errors] = formValidation(formData);
		setFormError(errors);
		return hasError;
	};

	return (
		<TemplateData pageName="CondicaoPagamento">
			<Wrapper margin="0 0 16px 0">
				<Button
					textColor="#fff"
					background="#555151"
					fill="auto"
					text="Adicionar"
					onClick={async () => {
						if (!validForm()) return;
						try {
							setCustomModal({
								isShow: true,
								title: 'Atenção',
								description: 'Realmente deseja incluir?',
								onConfirm: async () => {
									try {
										setIsLoading(true);
										await _dbgraficasistemaRepository.IncluirCondicaoPagamento({
											IdentCondicaoPagamento:
												formData!.IdentCondicaoPagamento!,
											DsCondicaoPagamento: formData!.DsCondicaoPagamento!,
											DtInclusaoCondicaoPagamento: new Date(),
										});

										clearPage();
									} catch {
									} finally {
										setIsLoading(false);
									}
								},
							});
						} catch (e) {
						} finally {
							setIsLoading(false);
						}
					}}
				/>
				<Button
					textColor="#fff"
					background="#555151"
					fill="auto"
					text="Alterar"
					onClick={async () => {
						if (!validForm()) return;
						try {
							setCustomModal({
								isShow: true,
								title: 'Atenção',
								description: 'Realmente deseja alterar?',
								onConfirm: async () => {
									try {
										setIsLoading(true);
										await _dbgraficasistemaRepository.AlterarCondicaoPagamento({
											CodCondicaoPagamento: formData!.Id!,
											IdentCondicaoPagamento:
												formData!.IdentCondicaoPagamento!,
											DsCondicaoPagamento: formData!.DsCondicaoPagamento!,
											DtInclusaoCondicaoPagamento: new Date(),
										});

										clearPage();
									} catch {
									} finally {
										setIsLoading(false);
									}
								},
							});
						} catch (e) {
						} finally {
							setIsLoading(false);
						}
					}}
				/>
				<Button
					textColor="#fff"
					background="#555151"
					fill="auto"
					text="Remover"
					onClick={async () => {
						if (!validForm()) return;
						try {
							setCustomModal({
								isShow: true,
								title: 'Atenção',
								description: 'Realmente deseja remover?',
								onConfirm: async () => {
									try {
										setIsLoading(true);
										await _dbgraficasistemaRepository.RemoverCondicaoPagamento(
											formData!.Id,
										);

										clearPage();
									} catch {
									} finally {
										setIsLoading(false);
									}
								},
							});
						} catch (e) {
						} finally {
							setIsLoading(false);
						}
					}}
				/>
				<Button
					textColor="#fff"
					background="#555151"
					fill="auto"
					text="Consultar"
					onClick={async () => {
						setSearchModal({
							isShow: true,
							properties: ['Id', 'Identificação', 'Descrição'],
							propertiesMap: [
								{prop: 'Id', destiny: 'Id'},
								{prop: 'Identificação', destiny: 'IdentCondicaoPagamento'},
								{prop: 'Descrição', destiny: 'DsCondicaoPagamento'},
							],
							onSearch: async (data: any) => {
								try {
									setIsLoading(true);
									const resultData =
										await _dbgraficasistemaRepository.ODataCondicaoPagamento(
											data,
										);

									return resultData;
								} catch (e) {
								} finally {
									setIsLoading(false);
								}
							},
							onSelect: (item: any) => {
								setFormData(item);
								setSearchModal({
									isShow: false,
								});
							},
							expand: [],
						});
					}}
				/>
				<Button
					textColor="#fff"
					background="#555151"
					fill="auto"
					text="Limpar"
					onClick={clearPage}
				/>
			</Wrapper>

			<Wrapper margin="0 0 12px 0">
				<WidthBox width="30">
					<Input
						value={formData?.IdentCondicaoPagamento}
						onChange={val => setFormData({...formData, IdentCondicaoPagamento: val})}
						inputType="light"
						mask="Nenhuma"
						maxLength={4}
						label="Identificação"
						errorMessage={formError?.IdentCondicaoPagamento}
						required={true}
					/>
				</WidthBox>

				<WidthBox>
					<Input
						value={formData?.DsCondicaoPagamento}
						onChange={val => setFormData({...formData, DsCondicaoPagamento: val})}
						inputType="light"
						maxLength={40}
						label="Descrição"
						errorMessage={formError?.DsCondicaoPagamento}
						required={true}
					/>
				</WidthBox>
			</Wrapper>
		</TemplateData>
	);
};

const formValidation = (formData?: FormData): [boolean, FormDataError] => {
	const formErros: FormDataError = {};
	if (!validateRequired(formData?.IdentCondicaoPagamento))
		formErros.IdentCondicaoPagamento = 'Este campo é obrigatório';
	if (!validateRequired(formData?.DsCondicaoPagamento))
		formErros.DsCondicaoPagamento = 'Este campo é obrigatório';

	return [checkFormIsValid(formErros), formErros];
};

export default CondicaoPagamento;
