import * as React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const initialValues = {
    name: '',
    email: '',
    occupation: ''
}

const onSubmit = (values:any) => {
    console.log('Formik Submit:', values);
}

const validationSchema = Yup.object({
    name: Yup.string().required('Required!'),
    email: Yup.string().email('Invalid Email Format').required('Required!'),
    occupation: Yup.string().required('Required!')
})

const AppForm: React.FunctionComponent = () => {

  return (
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        <Form>
            <div className='form-control'>
            <label htmlFor="name">Name</label>
            <Field id="name" name="name" type="text" />
            <ErrorMessage name="name"/>
            </div>
            <div className='form-control'>
           <label htmlFor="email">Email</label>
            <Field id="email" name="email" type="email"/>
            <ErrorMessage name="email"/>
            </div>
            <div className='form-control'>
            <label htmlFor="occupation">Occupation</label>
            <Field id="occupation" name="occupation" type="text"/>
            <ErrorMessage name="occupation"/>
            </div>
            <input type="submit"/>

        </Form> 
      </Formik>
  );
};

export default AppForm;

