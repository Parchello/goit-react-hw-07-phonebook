import { Formik, Field } from 'formik';
import { Wrapper, Error, LabelName, Button } from './PhoneBook.styled';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { addContacts } from 'Redux/contactsSlice';

const SignupSchema = Yup.object().shape({
  name: Yup.string().min(3, 'Too Short!').required('Required'),
  number: Yup.string()
    .matches(/^\d{7}$/, 'Exactly 7 numbers')
    .required('Required'),
});

export const PhoneBook = () => {
  const value = useSelector(getContacts);
  function getContacts(state) {
    return state.contacts.contacts;
  }
  const dispatch = useDispatch();
  return (
    <div>
      <Formik
        initialValues={{
          name: '',
          number: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={(values, actions) => {
          const existingContact = value.some(
            contact => contact.name.toLowerCase() === values.name.toLowerCase()
          );
          if (existingContact) {
            toast.error('Contact already exists');
          } else {
            toast.success('Contact added');
            dispatch(addContacts(values));
            actions.resetForm();
          }
        }}
      >
        <Wrapper>
          <LabelName>Name</LabelName>
          <Field id="firstName" name="name" placeholder="Place name here" />
          <Error name="name" component="span" />

          <LabelName>Number</LabelName>
          <Field id="number" name="number" placeholder="Phone number" />
          <Error name="number" component="span" />

          <Button type="submit">Add contact</Button>
        </Wrapper>
      </Formik>
    </div>
  );
};
