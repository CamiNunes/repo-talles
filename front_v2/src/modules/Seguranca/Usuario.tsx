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
import {Wrapper, Button, WidthBox, Input, InputDate, Autocomplete} from 'src/components/UI';
import {} from '@fortawesome/free-solid-svg-icons';
import {dbgraficasegurancaRepository} from 'src/shared/repositories/dbgraficaseguranca-repository';
import {dbgraficasistemaRepository} from 'src/shared/repositories/dbgraficasistema-repository';
import LoadingContext from 'src/context/LoadingContext';
import CustomModalContext from 'src/context/CustomModalContext';
import SearchModalContext from 'src/context/SearchModalContext';
import UserContext from 'src/context/UserContext';

type FormData = {
	Id?: any;
	LoginUsuario?: string;
	SenhaUsuario?: string;
	DtInclusaoUsuario?: Date;
	DtAlteracaoUsuario?: Date;
	CodEmpresa?: string;
};

type FormDataError = {
	LoginUsuario?: string;
	SenhaUsuario?: string;
	DtInclusaoUsuario?: string;
	DtAlteracaoUsuario?: string;
	CodEmpresa?: string;
};

const Usuario = () => {
	const [authUser, setUser] = useContext(UserContext);
	const [, setIsLoading] = useContext(LoadingContext);
	const [, setCustomModal] = useContext(CustomModalContext);
	const [, setSearchModal] = useContext(SearchModalContext);

	const [formData, setFormData] = useState<FormData>();
	const [formError, setFormError] = useState<FormDataError>();
	const [hideFields, setHideFields] = useState<any>({});
	const [disableFields, setDisableFields] = useState<any>({});

	const _dbgraficasegurancaRepository = new dbgraficasegurancaRepository();
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
		<TemplateData pageName="Usuario">
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
										await _dbgraficasegurancaRepository.IncluirUsuario({
											LoginUsuario: formData!.LoginUsuario!,
											SenhaUsuario: formData!.SenhaUsuario!,
											CodEmpresa: formData!.CodEmpresa!,
											DtInclusaoUsuario: new Date(),
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
										await _dbgraficasegurancaRepository.AlterarUsuario({
											CodUsuario: formData!.Id!,
											LoginUsuario: formData!.LoginUsuario!,
											SenhaUsuario: formData!.SenhaUsuario!,
											CodEmpresa: formData!.CodEmpresa!,
											DtInclusaoUsuario: new Date(),
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
										await _dbgraficasegurancaRepository.RemoverUsuario(
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
							properties: ['Id', 'Login', 'Senha', 'Empresa'],
							propertiesMap: [
								{prop: 'Id', destiny: 'Id'},
								{prop: 'Login', destiny: 'LoginUsuario'},
								{prop: 'Senha', destiny: 'SenhaUsuario'},
								{prop: 'Empresa', destiny: 'CnpjEmpresa'},
							],
							onSearch: async (data: any) => {
								try {
									setIsLoading(true);
									const resultData =
										await _dbgraficasegurancaRepository.ODataUsuario(data);

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
							expand: [
								{
									tableName: 'Empresa',
									refId: 'CodEmpresa',
									refName: 'CnpjEmpresa',
									dependencies: [],
								},
							],
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
				<WidthBox>
					<Input
						value={formData?.LoginUsuario}
						onChange={val => setFormData({...formData, LoginUsuario: val})}
						inputType="light"
						maxLength={50}
						label="Login"
						errorMessage={formError?.LoginUsuario}
						required={true}
					/>
				</WidthBox>

				<WidthBox>
					<Input
						value={formData?.SenhaUsuario}
						onChange={val => setFormData({...formData, SenhaUsuario: val})}
						inputType="light"
						maxLength={40}
						label="Senha"
						errorMessage={formError?.SenhaUsuario}
						required={true}
					/>
				</WidthBox>

				<WidthBox>
					<Autocomplete
						onChange={val => setFormData({...formData, CodEmpresa: val})}
						inputType="light"
						label="Empresa"
						options={[]}
						finderFunction={() =>
							_dbgraficasistemaRepository.ODataEmpresa(
								`?$select=Id,NmRazaoSocialEmpresa`,
							)
						}
						value={formData?.CodEmpresa}
						errorMessage={formError?.CodEmpresa}
						required={true}
					/>
				</WidthBox>
			</Wrapper>
		</TemplateData>
	);
};

const formValidation = (formData?: FormData): [boolean, FormDataError] => {
	const formErros: FormDataError = {};
	if (!validateRequired(formData?.LoginUsuario))
		formErros.LoginUsuario = 'Este campo é obrigatório';
	if (!validateRequired(formData?.SenhaUsuario))
		formErros.SenhaUsuario = 'Este campo é obrigatório';
	if (!validateRequired(formData?.DtInclusaoUsuario))
		formErros.DtInclusaoUsuario = 'Este campo é obrigatório';
	if (!validateRequired(formData?.CodEmpresa)) formErros.CodEmpresa = 'Este campo é obrigatório';

	return [checkFormIsValid(formErros), formErros];
};

export default Usuario;
