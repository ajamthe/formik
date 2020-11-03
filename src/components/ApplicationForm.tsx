import * as React from 'react';
import { useFormik } from 'formik';

const AppForm: React.FunctionComponent = () => {
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            occupation: ''
        },
        onSubmit: (values) => {
            console.log('Formik Submit:', values);
        }
    });

  return (
      <div>
        <form onSubmit={formik.handleSubmit}>
            <label htmlFor="name">Name</label>
            <input id="name" name="name" type="text" onChange={formik.handleChange} value={formik.values.name}></input>
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" onChange={formik.handleChange} value={formik.values.email}/>
            <label htmlFor="email">Occupation</label>
            <input id="occupation" name="occupation" type="text" onChange={formik.handleChange} value={formik.values.occupation}/>
            <input type="submit"/>
        </form> 
      </div>
  );
};

export default AppForm;

