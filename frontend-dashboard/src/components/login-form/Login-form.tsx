import { Form, Formik, type FormikHelpers } from 'formik';
import styles from './login-form.module.css';
import { Button, TextField } from '@mui/material';

const LoginForm = () => {
  interface Values {
    email: string;
    password: string;
  }

  const handleSubmit = (values: Values) => {
    // FIXME: Implement actual submission logic here
    console.log('Form values submitted:', values);
  };

  // FIXME: Fix colors in the form fields to match the theme

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
        {({
          isSubmitting,
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
        }) => (
          <Form className={styles.form}>
            <div className={styles['field-box']}>
              <label htmlFor="email">
                <h3>Email</h3>
              </label>
              <TextField
                id="email"
                name="email"
                color='primary'
                // placeholder="person@hbr.com"
                type="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'background.default',
                    },
                    '&:hover fieldset': {
                      borderColor: 'background.default',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'background.default',
                    },
                  },
                  '& label.Mui-focused': {
                    color: 'background.default',
                  },
                  '& .MuiInputBase-input::placeholder': {
                    color: 'background.default',
                    opacity: 0.5,
                  },
                }}
              />
            </div>

            <div className={styles['field-box']}>
              <label htmlFor="password">
                <h3>Adgangskode</h3>
              </label>
              <TextField
                id="password"
                name="password"
                // placeholder="Adgangskode"
                type="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'background.default',
                    },
                    '&:hover fieldset': {
                      borderColor: 'background.default',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'background.default',
                    },
                  },
                  '& label.Mui-focused': {
                    color: 'background.default',
                  },
                  '& .MuiInputBase-input::placeholder': {
                    color: 'background.default',
                    opacity: 0.5,
                  },
                }}
              />
            </div>

            <div className={styles['button-box']}>
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                className={styles.button}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Logger ind...' : 'Log ind'}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default LoginForm;
