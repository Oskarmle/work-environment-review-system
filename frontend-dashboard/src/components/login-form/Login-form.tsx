import { Field, Form, Formik, type FormikHelpers } from 'formik';
import styles from './login-form.module.css';
import Button from '../button/Button';

const LoginForm = () => {
  interface Values {
    email: string;
    password: string;
  }

  const handleSubmit = (values: Values) => {
    // FIXME: Implement actual submission logic here
    console.log('Form values submitted:', values);
  };

  return (
    <>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validate={(values) => {
          const errors: Partial<Values> = {};
          if (!values.email) {
            errors.email = 'Skal udfyldes';
          } else if (
            // FIXME: Set email validation to only accept hbr.dk mails
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Ugyldig email adresse';
          }
          if (!values.password) {
            errors.password = 'Skal udfyldes';
          }
          return errors;
        }}
        onSubmit={(
          values: Values,
          { setSubmitting }: FormikHelpers<Values>,
        ) => {
          setTimeout(() => {
            setSubmitting(false);
            handleSubmit(values);
          }, 1500);
        }}
      >
        {({ isSubmitting }) => (
          <Form className={styles.form}>
            <div className={styles['field-box']}>
              <label htmlFor="email">
                <h3>Email</h3>
              </label>
              <Field
                id="email"
                name="email"
                placeholder="person@hbr.com"
                type="email"
                className={styles.input}
              />
            </div>

            <div className={styles['field-box']}>
              <label htmlFor="password">
                <h3>Adgangskode</h3>
              </label>
              <Field
                id="password"
                name="password"
                placeholder="Adgangskode"
                type="password"
                className={styles.input}
              />
            </div>

            <div className={styles['button-box']}>
              <Button
                text="Log Ind"
                type="submit"
                onClick={() => {}}
                size="lg"
                disabled={isSubmitting}
              />
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default LoginForm;
