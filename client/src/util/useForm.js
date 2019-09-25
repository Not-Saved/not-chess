import { useState, useEffect, useCallback } from "react";
import _ from "lodash";

const useForm = ({
	initialValues = {},
	defaultValues = {},
	validate = () => {}
}) => {
	validate = useCallback(validate, []);
	const [values, setValues] = useState(
		_.defaults(initialValues, defaultValues)
	);
	const [errors, setErrors] = useState({});
	const [dirty, setDirty] = useState(false);

	const validateValues = useCallback(
		values => {
			values = _.pickBy(values, e => e);
			setErrors(validate(values));
		},
		[validate]
	);

	const onChange = useCallback(
		e => {
			let value = e.target.value || e.target.getAttribute("value");
			if (e.target.name) {
				if (values[e.target.name] === value) value = "";
				if (!dirty) setDirty(true);
				setValues({ ...values, [e.target.name]: value });
			}
		},
		[values, setValues, dirty, setDirty]
	);

	useEffect(() => {
		validateValues(values);
	}, [values, validateValues]);

	return { values, errors, onChange, dirty };
};

export default useForm;
