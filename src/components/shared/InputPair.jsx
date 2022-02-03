import React from "react"
import PropTypes from "prop-types"
import {INPUT_TYPES} from "../../constants"

// factory
function InputPair({question, answer, setAnswer, type, selectOptions}) {

	if (type === INPUT_TYPES.text) {
		return <TextInput question={question} answer={answer} setAnswer={setAnswer}/>
	}

	if (type === INPUT_TYPES.longtext) {
		return <LongTextInput question={question} answer={answer} setAnswer={setAnswer}/>
	}

	if (type === INPUT_TYPES.image) {
		return <ImageQAInput question={question} image={answer} setImage={setAnswer}/>
	}

	if (type === INPUT_TYPES.select) {
		return <SelectInput question={question} answer={answer} setAnswer={setAnswer} options={selectOptions}/>
	}

	return null
}

//TODO: dodati validaciju

InputPair.propTypes = {
	question: PropTypes.string,
	answer: PropTypes.any,
	setAnswer: PropTypes.func,
	type: PropTypes.any,
	selectOptions: PropTypes.array,
}

const ImageQAInput = ({question, image, setImage}) => (
	<div>
		<label htmlFor="formFile"
			className="form-label text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">
			{question}
		</label>
		<input
			className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
			type="file" id="formFile" accept="image/*"
			onChange={setImage}
		/>
		{image && (<div>
			<img src={image} alt=""/>
		</div>)}
	</div>
)

ImageQAInput.propTypes = {
	question: PropTypes.string,
	image: PropTypes.any,
	setImage: PropTypes.func,
}

const TextInput = ({question, answer, setAnswer}) => (
	<div>
		<label htmlFor="userName"
			className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">
			{question}
		</label>
		<input type="text" name="username" id="name"
			className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
			placeholder={"userName"} value={answer} required=""
			onChange={setAnswer}/>
	</div>
)

TextInput.propTypes = {
	question: PropTypes.string,
	answer: PropTypes.any,
	setAnswer: PropTypes.func,
}

const LongTextInput = ({question, answer, setAnswer}) => (
	<div>
		<label htmlFor="userName"
			className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">
			{question}
		</label>
		<textarea
			className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding
                border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
			id="exampleFormControlTextarea1"
			rows="3"
			placeholder="userName"
			value={answer} required
			onChange={setAnswer}
		/>
	</div>
)

LongTextInput.propTypes = {
	question: PropTypes.string,
	answer: PropTypes.any,
	setAnswer: PropTypes.func,
}

const SelectInput = ({question, answer, setAnswer, options}) => (
	<div>
		<label htmlFor="userName"
			className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">
			{question}
		</label>
		<select
			className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
			value={answer} onChange={setAnswer} id="formCompanies">
			{options?.map(option => (
				<option key={option.id} value={option.id}>{option.attributes.name}</option>
			))}
		</select>
	</div>
)

SelectInput.propTypes = {
	question: PropTypes.string,
	answer: PropTypes.any,
	setAnswer: PropTypes.func,
	options: PropTypes.array,
}

export default InputPair