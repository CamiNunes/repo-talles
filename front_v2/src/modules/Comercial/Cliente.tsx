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
import {Wrapper, Button, WidthBox, InputDate, Input, Autocomplete} from 'src/components/UI';
import {} from '@fortawesome/free-solid-svg-icons';
import {dbgraficacomercialRepository} from 'src/shared/repositories/dbgraficacomercial-repository';
import {dbgraficasistemaRepository} from 'src/shared/repositories/dbgraficasistema-repository';
import LoadingContext from 'src/context/LoadingContext';
import CustomModalContext from 'src/context/CustomModalContext';
import SearchModalContext from 'src/context/SearchModalContext';
import UserContext from 'src/context/UserContext';

type FormData = {
	Id?: any;
	DtInclusaoCliente?: Date;
	DtAlteracaoCliente?: Date;
	CnpjCliente?: string;
	IeCliente?: string;
	ImCliente?: string;
	NmRazaoSocialCliente?: string;
	NmFantasiaCliente?: string;
	CepCliente?: string;
	UfCliente?: string;
	CidCliente?: string;
	BrCliente?: string;
	EndCliente?: string;
	NrCliente?: string;
	CompCliente?: string;
	CodCondicaoPagamento?: string;
	NmContatoCliente?: string;
	TelContatoCliente?: string;
	EmailContatoCliente?: string;
};

type FormDataError = {
	DtInclusaoCliente?: string;
	DtAlteracaoCliente?: string;
	CnpjCliente?: string;
	IeCliente?: string;
	ImCliente?: string;
	NmRazaoSocialCliente?: string;
	NmFantasiaCliente?: string;
	CepCliente?: string;
	UfCliente?: string;
	CidCliente?: string;
	BrCliente?: string;
	EndCliente?: string;
	NrCliente?: string;
	CompCliente?: string;
	CodCondicaoPagamento?: string;
	NmContatoCliente?: string;
	TelContatoCliente?: string;
	EmailContatoCliente?: string;
};

const Cliente = () => {
	const [authUser, setUser] = useContext(UserContext);
	const [, setIsLoading] = useContext(LoadingContext);
	const [, setCustomModal] = useContext(CustomModalContext);
	const [, setSearchModal] = useContext(SearchModalContext);

	const [formData, setFormData] = useState<FormData>();
	const [formError, setFormError] = useState<FormDataError>();
	const [hideFields, setHideFields] = useState<any>({});
	const [disableFields, setDisableFields] = useState<any>({});

	const _dbgraficacomercialRepository = new dbgraficacomercialRepository();
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
		<TemplateData pageName="Cliente">
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
										await _dbgraficacomercialRepository.IncluirCliente({
											CnpjCliente: formData!.CnpjCliente?.replace(
												/\D/g,
												'',
											) as any,
											IeCliente: formData!.IeCliente!,
											ImCliente: formData!.ImCliente!,
											NmRazaoSocialCliente: formData!.NmRazaoSocialCliente!,
											NmFantasiaCliente: formData!.NmFantasiaCliente!,
											CepCliente: formData!.CepCliente?.replace(
												/\D/g,
												'',
											) as any,
											UfCliente: formData!.UfCliente!,
											CidCliente: formData!.CidCliente!,
											BrCliente: formData!.BrCliente!,
											EndCliente: formData!.EndCliente!,
											NrCliente: formData!.NrCliente!,
											CompCliente: formData!.CompCliente!,
											DtInclusaoCliente: new Date(),
											CodCondicaoPagamento: formData!.CodCondicaoPagamento!,
											NmContatoCliente: formData!.NmContatoCliente!,
											TelContatoCliente: formData!.TelContatoCliente?.replace(
												/\D/g,
												'',
											) as any,
											EmailContatoCliente: formData!.EmailContatoCliente!,
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
										await _dbgraficacomercialRepository.AlterarCliente({
											CodCliente: formData!.Id!,
											CnpjCliente: formData!.CnpjCliente?.replace(
												/\D/g,
												'',
											) as any,
											IeCliente: formData!.IeCliente!,
											ImCliente: formData!.ImCliente!,
											NmRazaoSocialCliente: formData!.NmRazaoSocialCliente!,
											NmFantasiaCliente: formData!.NmFantasiaCliente!,
											CepCliente: formData!.CepCliente?.replace(
												/\D/g,
												'',
											) as any,
											UfCliente: formData!.UfCliente!,
											CidCliente: formData!.CidCliente!,
											BrCliente: formData!.BrCliente!,
											EndCliente: formData!.EndCliente!,
											NrCliente: formData!.NrCliente!,
											CompCliente: formData!.CompCliente!,
											DtInclusaoCliente: new Date(),
											CodCondicaoPagamento: formData!.CodCondicaoPagamento!,
											NmContatoCliente: formData!.NmContatoCliente!,
											TelContatoCliente: formData!.TelContatoCliente?.replace(
												/\D/g,
												'',
											) as any,
											EmailContatoCliente: formData!.EmailContatoCliente!,
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
										await _dbgraficacomercialRepository.RemoverCliente(
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
							properties: [
								'Id',
								'CNPJ/CPF',
								'Inscrição estadual',
								'Inscrição municipal',
								'Razão social',
								'Nome fantasia',
								'CEP',
								'UF',
								'Cidade',
								'Bairro',
								'Endereço',
								'Número',
								'Complemento',
								'Condição de pagamento',
								'Nome contato',
								'Telefone contato',
								'E-mail contato',
							],
							propertiesMap: [
								{prop: 'Id', destiny: 'Id'},
								{prop: 'CNPJ/CPF', destiny: 'CnpjCliente'},
								{prop: 'Inscrição estadual', destiny: 'IeCliente'},
								{prop: 'Inscrição municipal', destiny: 'ImCliente'},
								{prop: 'Razão social', destiny: 'NmRazaoSocialCliente'},
								{prop: 'Nome fantasia', destiny: 'NmFantasiaCliente'},
								{prop: 'CEP', destiny: 'CepCliente'},
								{prop: 'UF', destiny: 'UfCliente'},
								{prop: 'Cidade', destiny: 'CidCliente'},
								{prop: 'Bairro', destiny: 'BrCliente'},
								{prop: 'Endereço', destiny: 'EndCliente'},
								{prop: 'Número', destiny: 'NrCliente'},
								{prop: 'Complemento', destiny: 'CompCliente'},
								{prop: 'Condição de pagamento', destiny: 'IdentCondicaoPagamento'},
								{prop: 'Nome contato', destiny: 'NmContatoCliente'},
								{prop: 'Telefone contato', destiny: 'TelContatoCliente'},
								{prop: 'E-mail contato', destiny: 'EmailContatoCliente'},
							],
							onSearch: async (data: any) => {
								try {
									setIsLoading(true);
									const resultData =
										await _dbgraficacomercialRepository.ODataCliente(data);

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
									tableName: 'CondicaoPagamento',
									refId: 'CodCondicaoPagamento',
									refName: 'IdentCondicaoPagamento',
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
						value={formData?.CnpjCliente}
						onChange={val => setFormData({...formData, CnpjCliente: val})}
						inputType="light"
						mask="CPF/CNPJ"
						maxLength={14}
						label="CNPJ/CPF"
						errorMessage={formError?.CnpjCliente}
						required={true}
					/>
				</WidthBox>

				<WidthBox>
					<Input
						value={formData?.IeCliente}
						onChange={val => setFormData({...formData, IeCliente: val})}
						inputType="light"
						maxLength={40}
						label="Inscrição estadual"
						errorMessage={formError?.IeCliente}
						required={true}
					/>
				</WidthBox>

				<WidthBox>
					<Input
						value={formData?.ImCliente}
						onChange={val => setFormData({...formData, ImCliente: val})}
						inputType="light"
						maxLength={20}
						label="Inscrição municipal"
						errorMessage={formError?.ImCliente}
						required={true}
					/>
				</WidthBox>
			</Wrapper>

			<Wrapper margin="0 0 12px 0">
				<WidthBox>
					<Input
						value={formData?.NmRazaoSocialCliente}
						onChange={val => setFormData({...formData, NmRazaoSocialCliente: val})}
						inputType="light"
						maxLength={40}
						label="Razão social"
						errorMessage={formError?.NmRazaoSocialCliente}
						required={true}
					/>
				</WidthBox>

				<WidthBox>
					<Input
						value={formData?.NmFantasiaCliente}
						onChange={val => setFormData({...formData, NmFantasiaCliente: val})}
						inputType="light"
						maxLength={20}
						label="Nome fantasia"
						errorMessage={formError?.NmFantasiaCliente}
						required={true}
					/>
				</WidthBox>
			</Wrapper>

			<Wrapper margin="0 0 12px 0">
				<WidthBox>
					<Input
						value={formData?.CepCliente}
						onChange={val => setFormData({...formData, CepCliente: val})}
						inputType="light"
						mask="CEP"
						maxLength={8}
						label="CEP"
						errorMessage={formError?.CepCliente}
						required={true}
					/>
				</WidthBox>

				<WidthBox>
					<Input
						value={formData?.UfCliente}
						onChange={val => setFormData({...formData, UfCliente: val})}
						inputType="light"
						maxLength={2}
						label="UF"
						errorMessage={formError?.UfCliente}
						required={true}
					/>
				</WidthBox>

				<WidthBox>
					<Input
						value={formData?.CidCliente}
						onChange={val => setFormData({...formData, CidCliente: val})}
						inputType="light"
						maxLength={70}
						label="Cidade"
						errorMessage={formError?.CidCliente}
						required={true}
					/>
				</WidthBox>
			</Wrapper>

			<Wrapper margin="0 0 12px 0">
				<WidthBox>
					<Input
						value={formData?.BrCliente}
						onChange={val => setFormData({...formData, BrCliente: val})}
						inputType="light"
						maxLength={40}
						label="Bairro"
						errorMessage={formError?.BrCliente}
						required={true}
					/>
				</WidthBox>

				<WidthBox>
					<Input
						value={formData?.EndCliente}
						onChange={val => setFormData({...formData, EndCliente: val})}
						inputType="light"
						maxLength={70}
						label="Endereço"
						errorMessage={formError?.EndCliente}
						required={true}
					/>
				</WidthBox>
			</Wrapper>

			<Wrapper>
				<WidthBox width="30">
					<Input
						value={formData?.NrCliente}
						onChange={val => setFormData({...formData, NrCliente: val})}
						inputType="light"
						mask="Numero"
						label="Número"
					/>
				</WidthBox>

				<WidthBox>
					<Input
						value={formData?.CompCliente}
						onChange={val => setFormData({...formData, CompCliente: val})}
						inputType="light"
						maxLength={40}
						label="Complemento"
					/>
				</WidthBox>
			</Wrapper>

			<Wrapper margin="0 0 12px 0">
				<WidthBox>
					<Autocomplete
						onChange={val => setFormData({...formData, CodCondicaoPagamento: val})}
						inputType="light"
						label="Condição de pagamento"
						options={[]}
						finderFunction={() =>
							_dbgraficasistemaRepository.ODataCondicaoPagamento(
								`?$select=Id,DsCondicaoPagamento`,
							)
						}
						value={formData?.CodCondicaoPagamento}
						errorMessage={formError?.CodCondicaoPagamento}
						required={true}
					/>
				</WidthBox>
			</Wrapper>

			<Wrapper margin="0 0 12px 0">
				<WidthBox>
					<Input
						value={formData?.NmContatoCliente}
						onChange={val => setFormData({...formData, NmContatoCliente: val})}
						inputType="light"
						maxLength={40}
						label="Nome contato"
					/>
				</WidthBox>

				<WidthBox>
					<Input
						value={formData?.TelContatoCliente}
						onChange={val => setFormData({...formData, TelContatoCliente: val})}
						inputType="light"
						mask="Telefone"
						label="Telefone contato"
					/>
				</WidthBox>

				<WidthBox>
					<Input
						value={formData?.EmailContatoCliente}
						onChange={val => setFormData({...formData, EmailContatoCliente: val})}
						inputType="light"
						maxLength={100}
						label="E-mail contato"
					/>
				</WidthBox>
			</Wrapper>
		</TemplateData>
	);
};

const formValidation = (formData?: FormData): [boolean, FormDataError] => {
	const formErros: FormDataError = {};
	if (!validateRequired(formData?.CnpjCliente))
		formErros.CnpjCliente = 'Este campo é obrigatório';
	if (!validateRequired(formData?.IeCliente)) formErros.IeCliente = 'Este campo é obrigatório';
	if (!validateRequired(formData?.ImCliente)) formErros.ImCliente = 'Este campo é obrigatório';
	if (!validateRequired(formData?.NmRazaoSocialCliente))
		formErros.NmRazaoSocialCliente = 'Este campo é obrigatório';
	if (!validateRequired(formData?.NmFantasiaCliente))
		formErros.NmFantasiaCliente = 'Este campo é obrigatório';
	if (!validateRequired(formData?.CepCliente)) formErros.CepCliente = 'Este campo é obrigatório';
	if (!validateRequired(formData?.UfCliente)) formErros.UfCliente = 'Este campo é obrigatório';
	if (!validateRequired(formData?.CidCliente)) formErros.CidCliente = 'Este campo é obrigatório';
	if (!validateRequired(formData?.BrCliente)) formErros.BrCliente = 'Este campo é obrigatório';
	if (!validateRequired(formData?.EndCliente)) formErros.EndCliente = 'Este campo é obrigatório';
	if (!validateRequired(formData?.CodCondicaoPagamento))
		formErros.CodCondicaoPagamento = 'Este campo é obrigatório';

	return [checkFormIsValid(formErros), formErros];
};

export default Cliente;
