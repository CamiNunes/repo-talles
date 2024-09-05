import React, {useState} from 'react';
import Input from '../Input';
import WidthBox from '../WidthBox';
import Wrapper from '../Wrapper';
import axios from 'axios';
import FindModal from './components/FindModal';

export interface IAddress {
	postalCode?: string;
	publicPlace?: string;
	localNumber?: string;
	complement?: string;
	district?: string;
	state?: string;
	city?: string;
}

type Props = {
	inputType?: 'default' | 'undeline' | 'light';
};

const Address = ({inputType = 'light'}: Props) => {
	const [address, setAddress] = useState<IAddress>({});
	const [disabledPublicPlace, setDisabledPublicPlace] = useState(true);
	const [disabledDistrict, setDisabledDistrict] = useState(true);
	const [isOpen, setIsOpen] = useState(false);

	const find = async () => {
		if (address.postalCode?.length != 9) return;
		const cep = address.postalCode.replace(/[^\w\s]/gi, '');
		const result = await axios.get(`http://viacep.com.br/ws/${cep}/json/`);

		if (result.data.erro) {
			setIsOpen(true);
			return;
		}

		const data = result.data;
		setAddress({
			...address,
			publicPlace: data.logradouro,
			district: data.bairro,
			state: data.uf,
			city: data.localidade,
		});

		if (!data.logradouro || data.logradouro == '') setDisabledPublicPlace(false);
		else setDisabledPublicPlace(true);

		if (!data.bairro || data.bairro == '') setDisabledDistrict(false);
		else setDisabledDistrict(true);
	};

	return (
		<>
			<Wrapper margin="0 0 8px 0">
				<WidthBox width="15%">
					<Input
						value={address?.postalCode}
						onChange={val => setAddress({...address, postalCode: val})}
						inputType={inputType}
						label="Cep"
						mask="CEP"
						onPressEnter={find}
					/>
				</WidthBox>
				<WidthBox width="45%">
					<Input
						value={address?.publicPlace}
						onChange={val => setAddress({...address, publicPlace: val})}
						inputType={inputType}
						label="Logradouro"
						disabled={disabledPublicPlace}
					/>
				</WidthBox>
				<WidthBox width="10%">
					<Input
						value={address?.localNumber}
						onChange={val => setAddress({...address, localNumber: val})}
						inputType={inputType}
						label="Número"
						mask="Numero"
					/>
				</WidthBox>
				<WidthBox width="30%">
					<Input
						value={address?.complement}
						onChange={val => setAddress({...address, complement: val})}
						inputType={inputType}
						label="Complemento"
					/>
				</WidthBox>
			</Wrapper>
			<Wrapper margin="0 0 8px 0">
				<WidthBox width="45%">
					<Input
						value={address?.district}
						onChange={val => setAddress({...address, district: val})}
						inputType={inputType}
						label="Bairro"
						disabled={disabledDistrict}
					/>
				</WidthBox>
				<WidthBox width="10%">
					<Input
						value={address?.state}
						onChange={val => setAddress({...address, state: val})}
						inputType={inputType}
						label="UF"
						maxLength={2}
						disabled={true}
					/>
				</WidthBox>
				<WidthBox width="45%">
					<Input
						value={address?.city}
						onChange={val => setAddress({...address, city: val})}
						inputType={inputType}
						label="Localidade"
						disabled={true}
					/>
				</WidthBox>
			</Wrapper>

			<FindModal
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
				inputType={inputType}
				setAddress={setAddress}
			/>
		</>
	);
};

export default Address;

export const addressProperties = {
	inputType: 'default,undeline,light',
};
