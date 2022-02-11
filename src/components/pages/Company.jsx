import React, {useState, useEffect} from "react"
import {useMutation, useQuery} from "react-query"
import api from "../../api"
import InfoForm from "../shared/InfoForm"
import Loader from "../shared/Loader"
import {useGetMyProfile, usePostImageMutation} from "../../hooks"
import SpinnerLoader from "../shared/SpinnerLoader"
import Alert from "../shared/Alert"
import {useToast} from "../../contexts/ToastProvider"

export const Company = () => {
	// const isLoggedIn = useSelector(defaultState => defaultState.user.isLoggedIn)
	const [companyName, setCompanyName] = useState("")
	const [companyLogo, setCompanyLogo] = useState(null)
	const addToast = useToast()

	const [image, setImage] = useState(null)

	const [companyID, setCompanyID] = useState(null)

	const {data: userProfile, isError} = useGetMyProfile()
	useEffect(() => {
		if (userProfile) {
			setCompanyID(userProfile.data.data[0].attributes?.company?.data?.id)
		}
	}, [userProfile])

	const {data: company, isLoading} = useQuery(["getOurCompany", companyID],
		() => api.getOurCompany(companyID), {
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
		mutateAsync: uploadImageAsyncMutation,
		isLoading: uploadImageLoading,
		isError: uploadImageError
	} = usePostImageMutation({
		onSuccess: data => {
			const payload = {
				id: companyID,
				name: companyName,
				imageToSend: data?.data[0]?.id
			}
			mutate(payload)
		}
	})

	const {
		mutate,
		isLoading: editLoading,
		isError: editError
	} = useMutation(async (payload) => {
		await api.editOurCompany(payload)
	},{
		onSuccess: () => addToast({type: "success", text: "Company info successfully changed!"}),
		onError: () => addToast({type: "danger", text: "Error while changing company info!"})
	})
	const handleSubmit = async (e) => {
		e.preventDefault()
		const payload = {
			id: companyID,
			name: companyName,
		}
		if (companyLogo) {
			await uploadImageAsyncMutation(companyLogo)
			payload.imageToSend = companyLogo
		} else {
			mutate(payload)
		}
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
			<div className="flex justify-center items-top mx-auto max-w-screen-lg py-10">
				{editLoading && <Loader/>}
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