import React, { useRef, useState, useEffect } from 'react';
import debounce from 'lodash.debounce';
import { Field } from 'formik';
import styled from 'styled-components';

import { Item, Menu, Field as DropdownField, Dropdown, Autocomplete } from '@zendeskgarden/react-dropdowns';
import { InputGroup, Input } from '@zendeskgarden/react-forms';

import { Label } from './';

const StyledInputGroup = styled(InputGroup)`
	/* stylelint-disable-next-line */
	& > input[aria-autocomplete='list'] {
		position: absolute;
	}

	[data-garden-id='forms.faux_input'] {
		min-width: auto;
	}
`;

const TelephoneComponent = ({ name, label, codes, icon, ...props }) => {
	const [selectedItem, setSelectedItem] = useState(codes[0]);
	const [inputValue, setInputValue] = useState('');
	const [matchingOptions, setMatchingOptions] = useState(codes);

	/**
	 * Debounce filtering
	 */
	const filterMatchingOptionsRef = useRef(
		debounce((value) => {
			const matchedOptions = codes.filter(
				(option) => option.trim().toLowerCase().indexOf(value.trim().toLowerCase()) !== -1
			);

			setMatchingOptions(matchedOptions);
		}, 300)
	);

	useEffect(() => {
		filterMatchingOptionsRef.current(inputValue);
	}, [inputValue]);

	return (
		<>
			<Label label={label} name={name} />
			<Field name={name}>
				{({ field }) => (
					<StyledInputGroup>
						<div>
							<Dropdown
								inputValue={inputValue}
								selectedItem={selectedItem}
								onSelect={(item) => setSelectedItem(item)}
								onInputValueChange={(value) => setInputValue(value)}
								downshiftProps={{ defaultHighlightedIndex: 0 }}
							>
								<DropdownField>
									<Autocomplete>
										<div className="flex items-center justify-between">
											<span className="mr-1">{icon}</span>
											{selectedItem}
										</div>
									</Autocomplete>
								</DropdownField>
								<Menu>
									{matchingOptions.length ? (
										matchingOptions.map((option) => (
											<Item key={option} value={option}>
												<span>{option}</span>
											</Item>
										))
									) : (
										<Item disabled>No matches found</Item>
									)}
								</Menu>
							</Dropdown>
						</div>
						<Input {...field} id={name} {...props} />
					</StyledInputGroup>
				)}
			</Field>
		</>
	);
};

TelephoneComponent.propTypes = {};
TelephoneComponent.defaultProps = {
	type: 'text',
};

export default TelephoneComponent;
