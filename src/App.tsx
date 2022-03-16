/* 
What formik does for us-->

    * Getting values in and out of form state
    * Validation and error messages
    * Handling form submission

*/

import { useFormik, FormikErrors } from "formik";

interface myForm {
	name: string;
	email: string;
}

const validate = (values: myForm) => {
	/* always have an error obejct */
	let errors: FormikErrors<myForm> = {};
	if (values.name.length === 0) {
		errors.name = "Required";
	} else if (values.name.length < 6) {
		errors.name = "Length must be greater than 6";
	}

	/* validating email */
	if (values.email.length === 0) {
		errors.email = "Required";
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
		errors.email = "Invalid email address";
	}

	return errors;
};

const App = () => {
	/* adding validation--> we need to return error object */

	const formik = useFormik({
		initialValues: {
			name: "",
			email: "",
		},
		validate,
		onSubmit: (values) => {
			alert(JSON.stringify(values, null, 2));
			console.log(JSON.stringify(values, null, 2));
		},
	});
	return (
		<div>
			<form onSubmit={formik.handleSubmit}>
				<label htmlFor="name">Name</label>
				<input
					id="name"
					name="name"
					type="text"
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.name}
				/>
				{formik.touched.name && formik.errors.name ? (
					<div>{formik.errors.name}</div>
				) : null}
				<br />
				<label htmlFor="email">Email</label>
				<input
					id="email"
					name="email"
					type="text"
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.email}
				/>
				{formik.touched.email && formik.errors.email ? (
					<div>{formik.errors.email}</div>
				) : null}
				<br />
				<button type="submit">Submit</button>
			</form>
		</div>
	);
};

export default App;
