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
import {Wrapper, Button, WidthBox, InputDate, Input} from 'src/components/UI';
import {} from '@fortawesome/free-solid-svg-icons';
import {dbgraficacomercialRepository} from 'src/shared/repositories/dbgraficacomercial-repository';
import LoadingContext from 'src/context/LoadingContext';
import CustomModalContext from 'src/context/CustomModalContext';
import SearchModalContext from 'src/context/SearchModalContext';
import UserContext from 'src/context/UserContext';

type FormData = {
	Id?: any;
	DtInclusaoVendedor?: Date;
	IdentVendedor?: string;
	NmVendedor?: string;
	DtAlteracaoVendedor?: Date;
};

type FormDataError = {
	DtInclusaoVendedor?: string;
	IdentVendedor?: string;
	NmVendedor?: string;
	DtAlteracaoVendedor?: string;
};

const Vendedor = () => {
	const [authUser, setUser] = useContext(UserContext);
	const [, setIsLoading] = useContext(LoadingContext);
	const [, setCustomModal] = useContext(CustomModalContext);
	const [, setSearchModal] = useContext(SearchModalContext);

	const [formData, setFormData] = useState<FormData>();
	const [formError, setFormError] = useState<FormDataError>();
	const [hideFields, setHideFields] = useState<any>({});
	const [disableFields, setDisableFields] = useState<any>({});

	const _dbgraficacomercialRepository = new dbgraficacomercialRepository();

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
		<TemplateData pageName="Vendedor">
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
										await _dbgraficacomercialRepository.IncluirVendedor({
											IdentVendedor: formData!.IdentVendedor!,
											NmVendedor: formData!.NmVendedor!,
											DtInclusaoVendedor: new Date(),
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
										await _dbgraficacomercialRepository.AlterarVendedor({
											CodVendedor: formData!.Id!,
											IdentVendedor: formData!.IdentVendedor!,
											NmVendedor: formData!.NmVendedor!,
											DtInclusaoVendedor: new Date(),
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
										await _dbgraficacomercialRepository.RemoverVendedor(
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
							properties: ['Id', 'Identificação', 'Nome'],
							propertiesMap: [
								{prop: 'Id', destiny: 'Id'},
								{prop: 'Identificação', destiny: 'IdentVendedor'},
								{prop: 'Nome', destiny: 'NmVendedor'},
							],
							onSearch: async (data: any) => {
								try {
									setIsLoading(true);
									const resultData =
										await _dbgraficacomercialRepository.ODataVendedor(data);

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
						value={formData?.IdentVendedor}
						onChange={val => setFormData({...formData, IdentVendedor: val})}
						inputType="light"
						mask="Nenhuma"
						maxLength={4}
						label="Identificação"
						errorMessage={formError?.IdentVendedor}
						required={true}
					/>
				</WidthBox>

				<WidthBox>
					<Input
						value={formData?.NmVendedor}
						onChange={val => setFormData({...formData, NmVendedor: val})}
						inputType="light"
						mask="Nenhuma"
						maxLength={40}
						label="Nome"
						errorMessage={formError?.NmVendedor}
						required={true}
					/>
				</WidthBox>
			</Wrapper>
		</TemplateData>
	);
};

const formValidation = (formData?: FormData): [boolean, FormDataError] => {
	const formErros: FormDataError = {};
	if (!validateRequired(formData?.IdentVendedor))
		formErros.IdentVendedor = 'Este campo é obrigatório';
	if (!validateRequired(formData?.NmVendedor)) formErros.NmVendedor = 'Este campo é obrigatório';

	return [checkFormIsValid(formErros), formErros];
};

export default Vendedor;
