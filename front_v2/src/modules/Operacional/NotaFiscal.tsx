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
import {
	Wrapper,
	Button,
	WidthBox,
	InputDate,
	RowOptions,
	Text,
	Autocomplete,
	Input,
} from 'src/components/UI';
import {DataGrid} from 'src/components/Complex';
import {} from '@fortawesome/free-solid-svg-icons';
import {dbgraficaoperacionalRepository} from 'src/shared/repositories/dbgraficaoperacional-repository';
import {dbgraficacomercialRepository} from 'src/shared/repositories/dbgraficacomercial-repository';
import {dbgraficasistemaRepository} from 'src/shared/repositories/dbgraficasistema-repository';
import LoadingContext from 'src/context/LoadingContext';
import CustomModalContext from 'src/context/CustomModalContext';
import SearchModalContext from 'src/context/SearchModalContext';
import {MenuItem} from '@mui/material';
import FeatherIcon from 'feather-icons-react';
import UserContext from 'src/context/UserContext';

type FormData = {
	Id?: any;
	DtInclusaoNotaFiscal?: Date;
	DtAlteracaoNotaFiscal?: Date;
	Itens?: any[];
	DtNotaFiscal?: Date;
	CodCliente?: string;
	CodCondicaoPagamento?: string;
	CodVendedor?: string;
	CodLoja?: string;
	NrNotaFiscal?: string;
	CodServico?: string;
	ServicoDescricao?: string;
	QtItemNotaFiscal?: string;
	VlServicoItemNotaFiscal?: string;
	VlItemNotaFiscal?: string;
	DtAlteracaoItemNotaFiscal?: Date;
};

type FormDataError = {
	DtInclusaoNotaFiscal?: string;
	DtAlteracaoNotaFiscal?: string;
	Itens?: string;
	DtNotaFiscal?: string;
	CodCliente?: string;
	CodCondicaoPagamento?: string;
	CodVendedor?: string;
	CodLoja?: string;
	NrNotaFiscal?: string;
	CodServico?: string;
	ServicoDescricao?: string;
	QtItemNotaFiscal?: string;
	VlServicoItemNotaFiscal?: string;
	VlItemNotaFiscal?: string;
	DtAlteracaoItemNotaFiscal?: string;
};

const NotaFiscal = () => {
	const [authUser, setUser] = useContext(UserContext);
	const [, setIsLoading] = useContext(LoadingContext);
	const [, setCustomModal] = useContext(CustomModalContext);
	const [, setSearchModal] = useContext(SearchModalContext);
	const [itensEdit, setItensEdit] = useState<any>();
	const [formData, setFormData] = useState<FormData>();
	const [formError, setFormError] = useState<FormDataError>();
	const [hideFields, setHideFields] = useState<any>({});
	const [disableFields, setDisableFields] = useState<any>({});
	const [vlServicoItem, setVlServicoItem] = useState<any>();

	const _dbgraficaoperacionalRepository = new dbgraficaoperacionalRepository();
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

	const handleServiceSelect = async (selectedService: any) => {
		const servico = await _dbgraficasistemaRepository.ODataServico(
			`?$filter=Id eq ${selectedService}&$select=vlServico`,
		);

		const vlServico = servico.length > 0 ? servico[0].VlServico : 0;

		setFormData({
			...formData,
			CodServico: selectedService,
			VlServicoItemNotaFiscal: vlServico.toFixed(2),
		});

		setVlServicoItem(vlServico);
	};

	const handleCalculateVlTotal = (val: number) => {
		const vlTotalItem = vlServicoItem * val;
		setFormData({
			...formData,
			QtItemNotaFiscal: val.toString(), // Atualiza a quantidade como string no formData
			VlItemNotaFiscal: vlTotalItem.toFixed(2), // Converte o valor total para string com 2 casas decimais
		});
	};
	return (
		<TemplateData pageName="Ordem de Serviço">
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
										await _dbgraficaoperacionalRepository.IncluirNotaFiscal({
											DtNotaFiscal: formData!.DtNotaFiscal!,
											CodCliente: formData!.CodCliente!,
											CodCondicaoPagamento: formData!.CodCondicaoPagamento!,
											DtInclusaoNotaFiscal: new Date(),
											CodVendedor: formData!.CodVendedor!,
											CodLoja: formData!.CodLoja!,
											NrNotaFiscal: formData!.NrNotaFiscal!,
											Itens: formData!.Itens!,
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
										await _dbgraficaoperacionalRepository.AlterarNotaFiscal({
											CodNotaFiscal: formData!.Id!,
											DtNotaFiscal: formData!.DtNotaFiscal!,
											CodCliente: formData!.CodCliente!,
											CodCondicaoPagamento: formData!.CodCondicaoPagamento!,
											DtInclusaoNotaFiscal: new Date(),
											CodVendedor: formData!.CodVendedor!,
											CodLoja: formData!.CodLoja!,
											NrNotaFiscal: formData!.NrNotaFiscal!,
											Itens: formData!.Itens!,
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
										await _dbgraficaoperacionalRepository.RemoverNotaFiscal(
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
								'Emissão',
								'Cliente',
								'Condição de pagamento',
								'Vendedor',
								'Loja',
								'Número',
								'Serviço',
								'Quantidade',
								'Valor unitário',
								'Valor total',
							],
							propertiesMap: [
								{prop: 'Id', destiny: 'Id'},
								{prop: 'Emissão', destiny: 'DtNotaFiscal'},
								{prop: 'Cliente', destiny: 'CnpjCliente'},
								{prop: 'Condição de pagamento', destiny: 'IdentCondicaoPagamento'},
								{prop: 'Vendedor', destiny: 'IdentVendedor'},
								{prop: 'Loja', destiny: 'IdentLoja'},
								{prop: 'Número', destiny: 'NrNotaFiscal'},
								{prop: 'Serviço', destiny: 'DsServico'},
								{prop: 'Quantidade', destiny: 'QtItemNotaFiscal'},
								{prop: 'Valor unitário', destiny: 'VlServicoItemNotaFiscal'},
								{prop: 'Valor total', destiny: 'VlItemNotaFiscal'},
							],
							onSearch: async (data: any) => {
								try {
									setIsLoading(true);
									// Carregar dados da nota fiscal
									const notaFiscalData =
										await _dbgraficaoperacionalRepository.ODataNotaFiscal(data);
									// Mapear os itens de cada nota fiscal
									const notaFiscalDataComItens = await Promise.all(
										notaFiscalData.map(async (nota: any) => {
											try {
												// Construir o filtro para carregar os itens
												const filter = `?$expand=Servico($select=Id,DsServico),NotaFiscal($select=Id)&$filter=NotaFiscal/Id eq ${nota.Id}`;
												const itemNotaFiscalData =
													await _dbgraficaoperacionalRepository.ODataItemNotaFiscal(
														filter,
													);
												// Mapear os itens para incluir o Id do serviço
												const itemsComServico = itemNotaFiscalData.map(
													(item: any) => ({
														...item,
														CodServico: item.Servico?.Id, // Adicionar o Id do serviço
														ServicoDescricao: item.Servico?.DsServico, // Adicionar a descrição do serviço se necessário
													}),
												);
												return {
													...nota,
													items: itemsComServico,
												};
											} catch (e) {
												console.error(
													`Erro ao carregar itens para a nota fiscal ${nota.Id}:`,
													e,
												);
												return {
													...nota,
													items: [],
												};
											}
										}),
									);
									return notaFiscalDataComItens;
								} catch (e) {
									console.error('Erro ao carregar dados da nota fiscal:', e);
									return [];
								} finally {
									setIsLoading(false);
								}
							},

							onSelect: async (item: any) => {
								try {
									setIsLoading(true);
									// Construir o filtro para carregar itens da nota fiscal selecionada
									const filter = `?$expand=Servico($select=Id,DsServico)&$filter=NotaFiscal/Id eq ${item.Id}`;
									const itemNotaFiscalData =
										await _dbgraficaoperacionalRepository.ODataItemNotaFiscal(
											filter,
										);
									// Mapear os itens para incluir o Id do serviço
									const itemsWithId = itemNotaFiscalData.map(
										(item: any, index: number) => ({
											...item,
											CodServico: item.Servico?.Id, // Adicionar o Id do serviço
											ServicoDescricao: item.Servico?.DsServico, // Adicionar a descrição do serviço se necessário
											id: item.Id || index,
										}),
									);
									setFormData({
										...item,
										Itens: itemsWithId,
										CodServico: itemsWithId[0]?.CodServico, // Armazenar o código do serviço no formData
										ServicoDescricao: itemsWithId[0]?.ServicoDescricao, // Armazenar a descrição do serviço no formData
									});
									setItensEdit(itemsWithId);
									setSearchModal({
										isShow: false,
									});
								} catch (e) {
									console.error(
										'Erro ao carregar itens da nota fiscal selecionada:',
										e,
									);
								} finally {
									setIsLoading(false);
								}
							},
							expand: [
								{
									tableName: 'Cliente',
									refId: 'CodCliente',
									refName: 'CnpjCliente',
									dependencies: [],
								},
								{
									tableName: 'CondicaoPagamento',
									refId: 'CodCondicaoPagamento',
									refName: 'IdentCondicaoPagamento',
									dependencies: [],
								},
								{
									tableName: 'Vendedor',
									refId: 'CodVendedor',
									refName: 'IdentVendedor',
									dependencies: [],
								},
								{
									tableName: 'Loja',
									refId: 'CodLoja',
									refName: 'IdentLoja',
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
					<InputDate
						value={formData?.DtNotaFiscal}
						onChange={val => setFormData({...formData, DtNotaFiscal: val})}
						inputType="light"
						iconPosition="right"
						label="Emissão"
						errorMessage={formError?.DtNotaFiscal}
						required={true}
					/>
				</WidthBox>

				<WidthBox>
					<Input
						value={formData?.NrNotaFiscal}
						onChange={val => setFormData({...formData, NrNotaFiscal: val})}
						inputType="light"
						mask="Numero"
						label="Número"
						errorMessage={formError?.NrNotaFiscal}
						required={true}
					/>
				</WidthBox>

				<WidthBox>
					<Autocomplete
						onChange={val => setFormData({...formData, CodCliente: val})}
						inputType="light"
						label="Cliente"
						options={[]}
						finderFunction={() =>
							_dbgraficacomercialRepository.ODataCliente(
								`?$select=Id,NmRazaoSocialCliente`,
							)
						}
						value={formData?.CodCliente}
						errorMessage={formError?.CodCliente}
						required={true}
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

				<WidthBox>
					<Autocomplete
						onChange={val => setFormData({...formData, CodLoja: val})}
						inputType="light"
						label="Loja"
						options={[]}
						finderFunction={() =>
							_dbgraficasistemaRepository.ODataLoja(`?$select=Id,NmLoja`)
						}
						value={formData?.CodLoja}
						errorMessage={formError?.CodLoja}
						required={true}
					/>
				</WidthBox>

				<WidthBox>
					<Autocomplete
						onChange={val => setFormData({...formData, CodVendedor: val})}
						inputType="light"
						label="Vendedor"
						options={[]}
						finderFunction={() =>
							_dbgraficacomercialRepository.ODataVendedor(`?$select=Id,NmVendedor`)
						}
						value={formData?.CodVendedor}
						errorMessage={formError?.CodVendedor}
						required={true}
					/>
				</WidthBox>
			</Wrapper>

			<Wrapper margin="0 0 12px 0">
				<WidthBox>
					<Autocomplete
						onChange={val => handleServiceSelect(val)}
						inputType="light"
						label="Serviço"
						options={[]}
						finderFunction={() =>
							_dbgraficasistemaRepository.ODataServico(`?$select=Id,DsServico`)
						}
						value={formData?.CodServico}
						errorMessage={formError?.CodServico}
						required={true}
					/>
				</WidthBox>

				<WidthBox>
					<Input
						value={formData?.VlServicoItemNotaFiscal}
						onChange={val => setFormData({...formData, VlServicoItemNotaFiscal: val})}
						inputType="light"
						mask="Monetario"
						label="Valor unitário"
						disabled={true}
						errorMessage={formError?.VlServicoItemNotaFiscal}
						required={true}
					/>
				</WidthBox>

				<WidthBox>
					<Input
						value={formData?.QtItemNotaFiscal}
						onChange={val => handleCalculateVlTotal(Number(val))}
						inputType="light"
						mask="Numero"
						label="Quantidade"
						errorMessage={formError?.QtItemNotaFiscal}
						required={true}
					/>
				</WidthBox>

				<WidthBox>
					<Input
						value={formData?.VlItemNotaFiscal}
						onChange={val => setFormData({...formData, VlItemNotaFiscal: val})}
						inputType="light"
						mask="Monetario"
						label="Valor total"
						disabled={true}
						errorMessage={formError?.VlItemNotaFiscal}
						required={true}
					/>
				</WidthBox>

				<WidthBox width="10">
					<Button
						textColor="#fff"
						background="#555151"
						text="+"
						onClick={async () => {
							if (!validForm()) return;

							// Copia os itens existentes ou inicia com uma lista vazia
							const gridData = formData?.Itens ? [...formData.Itens] : [];

							// Cria um novo item com um identificador único
							const gridDataItem = {
								id: crypto.randomUUID(), // Garante que o `id` é único
								CodServico: formData?.CodServico,
								ServicoDescricao: formData?.ServicoDescricao,
								VlServicoItemNotaFiscal: formData?.VlServicoItemNotaFiscal,
								QtItemNotaFiscal: formData?.QtItemNotaFiscal,
								VlItemNotaFiscal: formData?.VlItemNotaFiscal,
							};

							// Adiciona o novo item à lista
							gridData.push(gridDataItem);

							// Atualiza o estado com a lista modificada
							setFormData(prevFormData => ({
								...prevFormData,
								Itens: gridData,
								CodServico: undefined,
								ServicoDescricao: undefined,
								VlServicoItemNotaFiscal: undefined,
								QtItemNotaFiscal: undefined,
								VlItemNotaFiscal: undefined,
							}));

							// Limpa o item de edição
							setItensEdit(undefined);
						}}
					/>
				</WidthBox>
			</Wrapper>

			<Wrapper margin="0 0 12px 0">
				<DataGrid
					columns={[
						{
							flex: 0.1,
							minWidth: 70,
							type: 'actions',
							filterable: false,
							hideable: false,
							headerAlign: 'left',
							align: 'left',
							sortable: false,
							field: 'actions',
							headerName: '',
							renderCell: ({row}: any) => (
								<RowOptions
									childrens={
										<>
											<MenuItem
												onClick={() =>
													setFormData({
														...formData,
														Itens: [...(formData?.Itens ?? [])].filter(
															item => item._ref != row._ref,
														),
													})
												}
												sx={{'& svg': {mr: 2}}}>
												<FeatherIcon icon="trash-2" size={16} />
												<Text text="Remover" />
											</MenuItem>
										</>
									}
								/>
							),
						},
						{
							flex: 0.2,
							type: 'string',
							filterable: true,
							headerAlign: 'left',
							align: 'left',
							sortable: true,
							field: 'ServicoDescricao',
							headerName: 'Serviço',
							renderCell: ({row}: any) => row.ServicoDescricao,
						},
						{
							flex: 0.2,
							type: 'string',
							filterable: true,
							headerAlign: 'left',
							align: 'left',
							sortable: true,
							field: 'VlServicoItemNotaFiscal',
							headerName: 'Vl. Uni.',
							renderCell: ({row}: any) => row.VlServicoItemNotaFiscal,
						},
						{
							flex: 0.2,
							type: 'string',
							filterable: true,
							headerAlign: 'left',
							align: 'left',
							sortable: true,
							field: 'QtItemNotaFiscal',
							headerName: 'Qtd.',
							renderCell: ({row}: any) => row.QtItemNotaFiscal,
						},
						{
							flex: 0.2,
							type: 'string',
							filterable: true,
							headerAlign: 'left',
							align: 'left',
							sortable: true,
							field: 'VlItemNotaFiscal',
							headerName: 'Vl. Total',
							renderCell: ({row}: any) => row.VlItemNotaFiscal,
						},
					]}
					rowsData={formData?.Itens ?? []}
				/>
			</Wrapper>
		</TemplateData>
	);
};

const formValidation = (formData?: FormData): [boolean, FormDataError] => {
	const formErros: FormDataError = {};
	if (!validateRequired(formData?.DtNotaFiscal))
		formErros.DtNotaFiscal = 'Este campo é obrigatório';
	if (!validateRequired(formData?.CodCliente)) formErros.CodCliente = 'Este campo é obrigatório';
	if (!validateRequired(formData?.CodCondicaoPagamento))
		formErros.CodCondicaoPagamento = 'Este campo é obrigatório';
	if (!validateRequired(formData?.CodVendedor))
		formErros.CodVendedor = 'Este campo é obrigatório';
	if (!validateRequired(formData?.CodLoja)) formErros.CodLoja = 'Este campo é obrigatório';
	if (!validateRequired(formData?.NrNotaFiscal))
		formErros.NrNotaFiscal = 'Este campo é obrigatório';

	return [checkFormIsValid(formErros), formErros];
};

export default NotaFiscal;
