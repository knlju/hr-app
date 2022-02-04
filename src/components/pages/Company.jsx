import jwtDecode from "jwt-decode"
import React, {useState, useEffect} from "react"
import {useMutation, useQuery} from "react-query"
import {useSelector} from "react-redux"
import api from "../../api"
import InfoForm from "../shared/InfoForm"
import Loader from "../shared/Loader"
import {useGetMyProfile} from "../../hooks"
import SpinnerLoader from "../shared/SpinnerLoader"
import Alert from "../shared/Alert"

export const Company = () => {
	// const isLoggedIn = useSelector(defaultState => defaultState.user.isLoggedIn)
	const [companyName, setCompanyName] = useState("")
	const [companyLogo, setCompanyLogo] = useState(null)

	const [image, setImage] = useState(null)

	const [companyID, setCompanyID] = useState(null)

	const {data: userProfile, isError} = useGetMyProfile()
	useEffect(() => {
		if (userProfile) {
			setCompanyID(userProfile.data.data[0].attributes?.company?.data?.id)
		}
	}, [userProfile])

	const {data:company, isLoading} = useQuery(["getOurCompany",companyID],
		()=>api.getOurCompany(companyID),{
			enabled: !!companyID,
			onSuccess: company => {
				setCompanyName(company.data.data.attributes.name)
				try {
					setImage(company.data.data.attributes.logo.data.attributes.url)
				} catch (error) {
					console.log(error)
				}
			}
		})

	const {
		mutate,
		isLoading: editLoading,
		isError: editError
	} = useMutation((payload) => {
		api.editOurCompany(payload)
	})
	const [alert, setAlert] = useState({ show: false })
	const handleAlert = ({ type, text }) => {
		setAlert({ show: true, type, text })
		setTimeout(() => {
			setAlert({ show: false })
		}, 4000)
	}
	const handleSubmit = (e) => {
		e.preventDefault()
		const payload = {
			id: companyID,
			name: companyName,
			imageToSend: companyLogo
		}
		mutate(payload)
		setTimeout(() => {
			handleAlert({ type: "success", text: "Company info successfully changed!" })
		}, 1000)
	}

	if (isLoading) {
		return <SpinnerLoader/>
	}

	if (isError) {
		return <p>Loading error...</p>
	}

	// TODO sredi company
	return (
		<>
			{alert.show && <Alert type={alert.type} text={alert.text} />}
			<div className="flex justify-between align-top mx-auto max-w-screen-lg py-10">
				{editLoading && <Loader />}
				{editError && <p>Update error... Try again</p>}
				<InfoForm
					isCompany={true}
					name={companyName}
					setName={setCompanyName}
					action={handleSubmit}
					photo={company?.data?.data?.attributes?.logo?.data?.attributes.url}
					newPhoto={companyLogo}
					setNewPhoto={setCompanyLogo}
					disabled={editLoading}
				/>
			</div>
		</>
	)
}