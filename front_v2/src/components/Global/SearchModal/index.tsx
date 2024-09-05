/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {faAdd, faEye, faRemove, faSearch} from '@fortawesome/free-solid-svg-icons';
import React, {useContext, useEffect, useState} from 'react';
import {IOption} from 'src/@types/app';
import {DataGrid, Modal} from 'src/components/Complex';
import {Button, IconButton, Input, Select, SizedBox, WidthBox, Wrapper} from 'src/components/UI';
import {SearchModalContext} from 'src/context';

const filterOptions: any[] = [
	{value: undefined, label: 'Selecione...'},
	{value: 'eq', label: 'Igual'},
	{value: 'ne', label: 'Diferente'},
	{value: 'contains', label: 'Contém'},
	{value: 'lt', label: 'Menor'},
	{value: 'le', label: 'Menor ou igual'},
	{value: 'gt', label: 'Maior'},
	{value: 'ge', label: 'Maior ou igual'},
	{value: 'ne null', label: 'Não nulo'},
];

const defaultData = {
	fieldName: '',
	operator: undefined,
	value: undefined,
	index: 0,
};

export interface IExpandSearch {
	tableName: string;
	refId: string;
	refName: string;
	dependencies?: any[];
}

export interface ISearchModal {
	properties?: string[];
	onSelect?: (item: any) => void;
	onSearch?: (data: any) => Promise<any>;
	isShow?: boolean;
	expand?: IExpandSearch[];
	propertiesMap?: {prop: string; destiny: string}[];
}

const SearchModal = () => {
	const [searchModal, setSearchModal] = useContext(SearchModalContext);

	const [filterData, setFilterData] = useState<any[]>();
	const [listComponents, setListComponents] = useState<any[]>([]);
	const [resultData, setResultData] = useState<any[]>([]);
	const [columns, setColumns] = useState<any>([]);

	useEffect(() => {
		if (!searchModal.isShow) {
			setFilterData([]);
			setResultData([]);
		}
	}, [searchModal.isShow]);

	useEffect(() => {
		setFilterData([{...defaultData}]);

		if (
			!searchModal.properties ||
			searchModal.properties.length == 0 ||
			!searchModal.propertiesMap ||
			searchModal.propertiesMap.length == 0
		)
			return;
		const options: IOption[] = searchModal.properties.map(item => {
			return {
				value: searchModal.propertiesMap!.find(x => x.prop == item)?.destiny ?? '',
				label: item,
			};
		});
		options.unshift({
			value: '',
			label: 'Selecione...',
		});
		setListComponents(options);
	}, [searchModal]);

	const setValue = (index: number, prop: string, value: any) => {
		const data = [...(filterData ?? [])].map((x, i) => {
			if (i === index) x[prop] = value;
			return x;
		});

		setFilterData(data);
	};

	const search = async () => {
		if (!searchModal.onSearch) return;
		const filter = getFilterQuery();
		const result = await searchModal.onSearch(filter);
		const validResultData: any[] = [];
		let validKeys: any[] = [...(searchModal.properties ?? [])];
		let expandValidKeys: string[] = [];
		const validPropertiesMap: string[] = (searchModal.properties ?? []).map(item => {
			const propItem = searchModal.propertiesMap?.find(x => x.prop === item);
			return propItem?.destiny ?? '';
		});

		result?.forEach((item: any) => {
			const validObject: any = {};

			validPropertiesMap.forEach(prop => {
				Object.keys(item).forEach(key => {
					if (key.toLocaleLowerCase() === prop.toLocaleLowerCase()) {
						validObject[prop] = item[key];
					} else {
						searchModal.expand?.forEach(exp => {
							if (key.toLocaleLowerCase() === exp.tableName.toLocaleLowerCase()) {
								Object.keys(item[key]).forEach(subKey => {
									if (
										subKey.toLocaleLowerCase() ===
											exp.refName.toLocaleLowerCase() &&
										!expandValidKeys
											.map(x => x.toLocaleLowerCase())
											.includes(subKey.toLocaleLowerCase())
									) {
										validObject[subKey] = item[key][subKey];
										validObject[exp.refId] = item[key]['Id'];
										expandValidKeys.push(subKey);
									}
								});
							}
						});
					}
				});
			});

			expandValidKeys = [];
			validResultData.push({...validObject, _ref: crypto.randomUUID()});
		});

		expandValidKeys.forEach(item => validKeys.push(item));
		validKeys = [...Array.from(new Set(validKeys))];

		const mColumns: any[] = [];

		searchModal.properties?.forEach((prop, idx) => {
			const field = validPropertiesMap[idx];
			mColumns.push({
				flex: 0.1,
				type: 'string',
				filterable: true,
				headerAlign: 'left',
				align: 'left',
				sortable: true,
				field,
				headerName: prop,
				renderCell: ({row}: any) => row[field],
			});
		});

		setColumns(mColumns);
		setResultData([...validResultData]);
	};

	const getFilterQuery = () => {
		let filterResult = '';
		let filter = '';
		let expandFilter = '';

		filterData?.forEach((item, index) => {
			const isNumber = Number(item.value);
			const valueItem = isNumber ? item.value : `'${item.value}'`;
			let fieldName = item.fieldName;
			if (
				searchModal.expand &&
				searchModal.expand.length > 0 &&
				searchModal.expand.find(x => x.refName === fieldName)
			) {
				const expandItem = searchModal.expand.find(x => x.refName === fieldName);
				fieldName = `${expandItem?.tableName}/${fieldName}`;
			}

			if (item.operator === 'contains') filter += `contains(${fieldName}, ${valueItem})`;
			else if (item.operator === 'ne null') filter += `${fieldName} ${item.operator}`;
			else filter += `${fieldName} ${item.operator} ${valueItem}`;
			if (index + 1 != filterData.length) filter += ' and ';
		});

		searchModal.expand?.forEach(item => {
			expandFilter += `${item.tableName}($select=Id,${item.refName}),`;
		});

		if (expandFilter.slice(-1) === ',') {
			expandFilter = expandFilter.substring(0, expandFilter.length - 1);
		}

		if (searchModal.expand && searchModal.expand.length > 0) {
			filterResult = `?$expand=${expandFilter}&$filter=${filter}`;
		} else {
			filterResult = `?$filter=${filter}`;
		}

		return filterResult;
	};

	const isValid = (): boolean => {
		let valid = true;
		filterData
			?.filter(item => item.operator != 'ne null')
			?.forEach(item => {
				if (!item.fieldName || !item.operator || !item.value) valid = false;
			});

		return valid;
	};

	return (
		<Modal
			isOpen={searchModal.isShow ?? false}
			onClose={() =>
				setSearchModal({
					...searchModal,
					isShow: false,
				})
			}
			width="75%"
			maxWidth="1300px">
			<>
				<SizedBox height="15px" />

				{filterData?.map((item, index) => (
					<Wrapper key={index} margin="0 0 8px 0">
						<WidthBox width="33%">
							<Select
								value={listComponents.find(x => x.value == item['fieldName'])}
								onChange={(val: any) => setValue(index, 'fieldName', val.value)}
								options={listComponents}
								border="1px solid #333"
							/>
						</WidthBox>
						<WidthBox width="33%">
							<Select
								value={filterOptions.find(x => x.value == item['operator'])}
								onChange={(val: any) => setValue(index, 'operator', val.value)}
								options={filterOptions}
								border="1px solid #333"
							/>
						</WidthBox>
						<WidthBox width="33%">
							<Input
								value={item['value']}
								onChange={(val: any) => setValue(index, 'value', val)}
								border="1px solid #333"
								disabled={item['operator'] == 'ne null'}
							/>
						</WidthBox>
						<WidthBox width="5%">
							<Button
								fill="auto"
								icon={faAdd}
								onClick={() => {
									const data = [...(filterData ?? [])];
									data.push({
										...defaultData,
										index: filterData.length - 1,
									});
									setFilterData(data);
								}}
								themeStyle="success"
							/>
						</WidthBox>
						<WidthBox width="5%">
							{filterData.length > 1 ? (
								<Button
									fill="auto"
									icon={faRemove}
									onClick={() => {
										setFilterData(
											[...(filterData ?? [])].filter((x, i) => i != index),
										);
									}}
									themeStyle="danger"
								/>
							) : (
								<></>
							)}
						</WidthBox>
					</Wrapper>
				))}

				<Button
					onClick={search}
					text="Buscar"
					leftIcon={faSearch}
					themeStyle="primary"
					fill="auto"
					type="ghost"
					disabled={!isValid()}
				/>

				<SizedBox height="10px" />

				{resultData.length > 0 ? (
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
										color="rgb(80,50,255)"
										icon={faEye}
										onClick={() =>
											searchModal.onSelect
												? searchModal.onSelect(row)
												: undefined
										}
									/>
								),
							},
							...columns,
						]}
						rowsData={resultData ?? []}
					/>
				) : (
					<></>
				)}
			</>
		</Modal>
	);
};

export default SearchModal;
