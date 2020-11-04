import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray, FastField, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import TextError from "./TextError";

const initialValues = {
    name: 'Ash',
    email: '',
    occupation: '',
    comments: '',
    address: '',
    social: {
        facebook: '',
        twitter: ''
    },
    phoneNumbers: ['', ''],
    phNumbers: ['']
}

const savedValues = {
    name: 'Ash',
    email: 'a@bbc.com',
    occupation: 'Farmer',
    comments: 'Welcome',
    address: '42 Wallaby Way, Sydney',
    social: {
        facebook: '',
        twitter: ''
    },
    phoneNumbers: ['', ''],
    phNumbers: ['']
}

const onSubmit = (values:any, onSubmitProps: FormikHelpers<any>) => {
    console.log('Formik Submit:', values);
    console.log('On Submit Props', onSubmitProps);
    onSubmitProps.setSubmitting(false);
    onSubmitProps.resetForm();
}

const validationSchema = Yup.object({
    name: Yup.string().required('Required!'),
    email: Yup.string().email('Invalid Email Format').required('Required!'),
    occupation: Yup.string().required('Required!')
})

const validateComments = (value: string) => {
    let error;
    if (!value) {
        return error = "Required";
    }
    return error;
}

const AppForm: React.FunctionComponent = () => {
    const [formValues, setFormValues] = useState<any>(null);

  return (
      <Formik initialValues={formValues || initialValues} validationSchema={validationSchema} 
        onSubmit={onSubmit} 
        enableReinitialize
        // validateOnMount
        >
          {
              formik => {
                  console.log("Formik prop", formik);
                  return (<Form>
                  <div className='form-control'>
                  <label htmlFor="name">Name</label>
                  <Field id="name" name="name" type="text" />
                  <ErrorMessage name="name" component={TextError} />
                  </div>
                  <div className='form-control'>
                 <label htmlFor="email">Email</label>
                  <Field id="email" name="email" type="email"/>
                  <ErrorMessage name="email" component={TextError} />
                  </div>
                  <div className='form-control'>
                  <label htmlFor="occupation">Occupation</label>
                  <Field id="occupation" name="occupation" type="text"/>
                  <ErrorMessage name="occupation" component={TextError} />
                  </div>
                  <div className='form-control'>
                  <label htmlFor="comments">Comments</label>
                  <Field as="textarea" id="comments" name="comments" type="text" validate={validateComments}/>
                  <ErrorMessage name="comments" component={TextError} />
                  </div>
                  <div className='form-control'>
                  <label htmlFor="address">Address</label>
                  <FastField name="address">
                      {(props: any) => {
                          console.log('Render props', props);
                          const {field, form, meta } = props;
                          return (
                              <div>
                                  <input type="text" id="address" {...field} />
                                  {meta.touched && meta.error ? <div>{meta.error}</div> : null}
                              </div>
                          )
                      }
      
                      }
                  </FastField>
                  <ErrorMessage name="address"/>
                  </div>
                  <div className='form-control'>
                      <label htmlFor="facebook">Facebook Profile</label>
                      <Field id="facebook" name="social.facebook" type="text"/>
                      <ErrorMessage name="social.facebook" component={TextError} />
                  </div>
                  <div className='form-control'>
                      <label htmlFor="primaryPh">Primary Phone</label>
                      <Field id="primaryPh" name="phoneNumbers[0]" type="text"/>
                      <ErrorMessage name="primaryPh" component={TextError} />
                  </div>
                  <div className='form-control'>
                      <label htmlFor="secondaryPh">Secondary Phone</label>
                      <Field id="secondaryPh" name="phoneNumbers[1]" type="text"/>
                      <ErrorMessage name="secondaryPh" component={TextError} />
                  </div>
                  <div className='form-control'>
                      <label>List of phone numbers</label>
                      <FieldArray name="phNumbers">
                          {
                              (fieldArrayProps) => {
                                  const {push, remove, form} = fieldArrayProps;
                                  const { values } = form;
                                  const { phNumbers } = values;
                                  return <div>
                                      {
                                      phNumbers.map((phNumber: string, index: number, phNumbers: string[]) => (
                                          <div key={index}>
                                              <Field name={`phNumbers[${index}]`} />
                                              {phNumbers.length > 1 ? <button type='button' onClick={() => remove(index)}>-</button>: null}
                                              <button type='button' onClick={() => push('')}>+</button>
                                          </div>
                                      ))
      
                                      }
                                  </div>;
                              }
                          }
                      </FieldArray>
                  </div>
                  {/* <button type="button" onClick={() => formik.validateField('comments')}>Validate Comments</button>
                  <button type="button" onClick={() => formik.validateForm()}>Validate All</button>
                  <button type="button" onClick={() => formik.setFieldTouched('comments')}>Visit Comments</button>
                  <button type="button" onClick={() => formik.setTouched({
                      name: true,
                      email: true,
                      occupation: true,
                      comments: true
                  })}>Visit All</button> */}
                  <button type="button" onClick={() => setFormValues(savedValues)}>Load Saved data</button>
                  <button type="reset">Reset</button>
                  <input type="submit" disabled={!formik.isValid || formik.isSubmitting}/>
                  {/* <input type="submit" disabled={!(formik.dirty && formik.isValid)}/> */}
              </Form> )
              }
          }
      </Formik>
  );
};

export default AppForm;

