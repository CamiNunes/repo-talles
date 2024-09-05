/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {useEffect, useState} from 'react';
import {DataGrid, Modal} from 'src/components/Complex';
import {Button, Input, WidthBox, Wrapper, Select, IconButton} from 'src/components/UI';
import {UfList} from 'src/helpers/select-data/ufList';
import axios from 'axios';
import {faSearch, faEye} from '@fortawesome/free-solid-svg-icons';
import {IAddress} from '../..';
import {IOption} from 'src/@types/app';

type Props = {
	isOpen: boolean;
	onClose: () => void;
	inputType?: 'default' | 'undeline' | 'light';
	setAddress: (data: IAddress) => void;
};

const FindModal = ({isOpen, onClose, inputType, setAddress}: Props) => {
	const [state, setState] = useState('');
	const [city, setCity] = useState('');
	const [district, setDistrict] = useState('');
	const [listCities, setListCities] = useState<IOption[]>([]);
	const [gridData, setGridData] = useState([]);

	useEffect(() => {
		findCities();
	}, [state]);

	const findCities = async () => {
		const result = await axios.get(
			`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state}/municipios`,
		);

		if (result.status === 200) {
			setListCities(
				result.data.map((x: any) => {
					return {
						value: x.nome,
						label: x.nome,
					};
				}),
			);
		}
	};

	const findCep = async () => {
		const result = await axios.get(
			`http://viacep.com.br/ws/${state}/${city}/${district}/json/`,
		);

		setGridData(result.data);
	};

	const setSelectPostalCode = (data: any) => {
		setAddress({
			postalCode: data.cep,
			publicPlace: data.logradouro,
			district: data.bairro,
			state: data.uf,
			city: data.localidade,
		});
		clear();
	};

	const clear = () => {
		setState('');
		setCity('');
		setDistrict('');
		setListCities([]);
		setGridData([]);
		onClose();
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose} width="80%" maxWidth="1100px">
			<>
				<Wrapper margin="0 0 8px 0" alignItems="end">
					<WidthBox width="20%">
						<Select
							value={UfList.find(x => x.value === state)}
							options={UfList}
							onChange={value => {
								setState(value.value);
							}}
							label="UF"
							placeholder="Selecione a UF"
							inputType={inputType as any}
						/>
					</WidthBox>
					<WidthBox width="40%">
						<Select
							value={listCities.find(x => x.value === city)}
							options={listCities}
							onChange={value => {
								setCity(value.value);
							}}
							label="Localidade"
							placeholder="Selecione a Localidade"
							inputType={inputType as any}
							disabled={listCities.length === 0}
						/>
					</WidthBox>
					<WidthBox width="35%">
						<Input
							value={district}
							onChange={setDistrict}
							inputType={inputType}
							label="Local"
							onPressEnter={findCep}
						/>
					</WidthBox>
					<Button
						onClick={findCep}
						icon={faSearch}
						themeStyle="success"
						fill="auto"
						format="circle"
						disabled={
							!state ||
							state == '' ||
							!district ||
							district == '' ||
							!city ||
							city == ''
						}
					/>
				</Wrapper>

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
								<IconButton
									color="blue"
									icon={faEye}
									onClick={() => setSelectPostalCode(row)}
								/>
							),
						},
						{
							flex: 0.7,
							type: 'string',
							filterable: true,
							headerAlign: 'left',
							align: 'left',
							sortable: true,
							field: 'cep',
							headerName: 'Cep',
							renderCell: ({row}: any) => row.cep,
						},
						{
							flex: 0.3,
							type: 'string',
							filterable: true,
							headerAlign: 'left',
							align: 'left',
							sortable: true,
							field: 'bairro',
							headerName: 'Bairro',
							renderCell: ({row}: any) => row.bairro,
						},
						{
							flex: 0.3,
							type: 'string',
							filterable: true,
							headerAlign: 'left',
							align: 'left',
							sortable: true,
							field: 'logradouro',
							headerName: 'Logradouro',
							renderCell: ({row}: any) => row.logradouro,
						},
					]}
					rowsData={gridData ?? []}
				/>
			</>
		</Modal>
	);
};

export default FindModal;
