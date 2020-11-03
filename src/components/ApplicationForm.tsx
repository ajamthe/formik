import * as React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface IForm {
    name?: string;
    email?: string;
    occupation?: string;
}

const initialValues = {
    name: '',
    email: '',
    occupation: ''
}

const onSubmit = (values:any) => {
    console.log('Formik Submit:', values);
}

const validate = (values: any): IForm => {
    //values.name , values.email, values.occupation
    //errors.name, errors.email, errors.occupation
    // errors.name = 'This field is required'
    let errors: IForm = {};
    if (!values.name) {
        errors.name = 'Required'
    }
    if (!values.email) {
        errors.email = 'Required'
    } else if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(values.email)))
    {
        errors.email = 'Email format invalid';
    }
    if (!values.occupation) {
        errors.occupation = 'Required'
    }
    console.log(errors);
    return errors;
}

const validationSchema = Yup.object({
    name: Yup.string().required('Required!'),
    email: Yup.string().email('Invalid Email Format').required('Required!'),
    occupation: Yup.string().required('Required!')
})

const AppForm: React.FunctionComponent = () => {
    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    });
    console.log("Form Touched", formik.touched);

  return (
      <div>
        <form onSubmit={formik.handleSubmit}>
            <div className='form-control'>
            <label htmlFor="name">Name</label>
            <input id="name" name="name" type="text" onChange={formik.handleChange} value={formik.values.name} onBlur={formik.handleBlur}></input>
            {(formik.touched.name && formik.errors.name) ? <div className='error'>{formik.errors.name}</div> : null}
            </div>
            <div className='form-control'>
           <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur}/>
            {(formik.touched.email &&formik.errors.email)?  <div className='error'>{formik.errors.email}</div> : null}
            </div>
            <div className='form-control'>
            <label htmlFor="occupation">Occupation</label>
            <input id="occupation" name="occupation" type="text" onChange={formik.handleChange} value={formik.values.occupation}  onBlur={formik.handleBlur}/>
            {(formik.touched.occupation && formik.errors.occupation)? <div className='error'>{formik.errors.occupation}</div> : null}
            </div>
            <input type="submit"/>

        </form> 
      </div>
  );
};

export default AppForm;

