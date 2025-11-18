import { Field, Form, Formik, type FormikHelpers } from 'formik';
import styles from './login-form.module.css';

const LoginForm = () => {
  interface Values {
    email: string;
    password: string;
  }

  return (
    <>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={(
          values: Values,
          { setSubmitting }: FormikHelpers<Values>,
        ) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 500);
        }}
      >
        <Form className={styles.form}>
          <div className={styles['field-box']}>
            <label htmlFor="email">
              <h3>Email</h3>
            </label>
            <Field
              id="email"
              name="email"
              placeholder="john@acme.com"
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

          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </>
  );
};

export default LoginForm;
