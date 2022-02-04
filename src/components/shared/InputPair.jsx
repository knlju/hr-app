import React from "react"
import PropTypes from "prop-types"

// factory
function InputPair({labelText, inputValue, setInputValue, type, selectOptions}) {

	if (type === "text") {
		return <TextInput labelText={labelText} inputValue={inputValue} setInputValue={setInputValue}/>
	}

	if (type === "longtext") {
		return <LongTextInput labelText={labelText} inputValue={inputValue} setInputValue={setInputValue}/>
	}

	if (type === "image") {
		return <ImageQAInput labelText={labelText} image={inputValue} setImage={setInputValue}/>
	}

	if (type === "select") {
		return <SelectInput labelText={labelText} inputValue={inputValue} setInputValue={setInputValue} options={selectOptions}/>
	}

	return null
}

//TODO: dodati validaciju

InputPair.propTypes = {
	labelText: PropTypes.string,
	inputValue: PropTypes.any,
	setInputValue: PropTypes.func,
	type: PropTypes.any,
	selectOptions: PropTypes.array,
}

const ImageQAInput = ({labelText, image, setImage}) => (
	<div>
		<label htmlFor="formFile"
			className="form-label mb-0 text-sm font-medium text-gray-900 block dark:text-gray-300">
			{labelText}
		</label>
		<input
			className="relative bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white file:bg-gray-900 file:text-white file:border-0 file:rounded-md file:px-2 file:py-1 file:absolute file:top-1.5 file:right-1"
			type="file" id="formFile" accept="image/*"
			onChange={setImage}
		/>
		{image && (<div>
			<img src={image} alt=""/>
		</div>)}
	</div>
)

ImageQAInput.propTypes = {
	labelText: PropTypes.string,
	image: PropTypes.any,
	setImage: PropTypes.func,
}

const TextInput = ({labelText, inputValue, setInputValue}) => (
	<div>
		<label htmlFor="userName"
			className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">
			{labelText}
		</label>
		<input type="text" name="username" id="name"
			className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
			placeholder={"userName"} value={inputValue} required=""
			onChange={setInputValue}/>
	</div>
)

TextInput.propTypes = {
	labelText: PropTypes.string,
	inputValue: PropTypes.any,
	setInputValue: PropTypes.func,
}

const LongTextInput = ({labelText, inputValue, setInputValue}) => (
	<div>
		<label htmlFor="userName"
			className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">
			{labelText}
		</label>
		<textarea
			className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding
                border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
			id="exampleFormControlTextarea1"
			rows="3"
			placeholder="userName"
			value={inputValue} required
			onChange={setInputValue}
		/>
	</div>
)

LongTextInput.propTypes = {
	labelText: PropTypes.string,
	inputValue: PropTypes.any,
	setInputValue: PropTypes.func,
}

const SelectInput = ({labelText, inputValue, setInputValue, options}) => (
	<div>
		<label htmlFor="userName"
			className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">
			{labelText}
		</label>
		<select
			className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
			value={inputValue} onChange={setInputValue} id="formCompanies">
			{options.map(option => (
				<option key={option.id} value={option.id}>{option.attributes.name}</option>
			))}
		</select>
	</div>
)

SelectInput.propTypes = {
	labelText: PropTypes.string,
	inputValue: PropTypes.any,
	setInputValue: PropTypes.func,
	options: PropTypes.array,
}

export default InputPair