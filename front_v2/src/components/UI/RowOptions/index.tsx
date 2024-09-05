/* eslint-disable @typescript-eslint/no-explicit-any */
import {IconButton, Menu} from '@mui/material';
import FeatherIcon from 'feather-icons-react';
import React, {useState, MouseEvent, useEffect} from 'react';

interface Props {
	childrens: any;
}

const RowOptions = ({childrens}: Props) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const rowOptionsOpen = Boolean(anchorEl);
	const [test, setTest] = useState(false);

	useEffect(() => {
		if (test) {
			setAnchorEl(null);
			setTest(false);
		}
	}, [childrens]);

	const handleRowOptionsClick = (event: MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
		setTimeout(() => {
			setTest(true);
		}, 300);
	};

	const handleRowOptionsClose = () => {
		setAnchorEl(null);
	};

	return (
		<>
			<IconButton size="small" onClick={handleRowOptionsClick}>
				<FeatherIcon icon="more-vertical" />
			</IconButton>
			<Menu
				keepMounted
				anchorEl={anchorEl}
				open={rowOptionsOpen}
				onClose={handleRowOptionsClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'right',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				sx={{zIndex: 1000000000}}>
				{childrens}
			</Menu>
		</>
	);
};

export default RowOptions;
