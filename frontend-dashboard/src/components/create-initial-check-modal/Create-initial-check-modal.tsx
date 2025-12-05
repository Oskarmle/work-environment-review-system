import { Box, Button, Modal, TextField } from '@mui/material';
import styles from './create-initial-check-modal.module.css';
import { Form, Formik, type FormikHelpers } from 'formik';
import { useCreateInitialCheck } from '../../hooks/useCreateInitialCheck';

type CreateInitialCheckModalProps = {
  open: boolean;
  handleClose: () => void;
};

const CreateInitialCheckModal = ({
  open,
  handleClose,
}: CreateInitialCheckModalProps) => {
  interface Values {
    checkName: string;
  }

  const createInitialCheck = useCreateInitialCheck();

  const handleSubmit = (values: Values) => {
    createInitialCheck.mutate(values.checkName);
    alert('Egenindsats punkt oprettet');
    handleClose();
  };

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box className={styles.box}>
          <h3>Opret nyt egenindsats punkt</h3>
          <Formik
            initialValues={{
              checkName: '',
            }}
            validate={(values) => {
              const errors: Partial<Values> = {};
              if (!values.checkName) {
                errors.checkName = 'Skal udfyldes';
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
                  <label htmlFor="checkName"></label>
                  <TextField
                    id="checkName"
                    name="checkName"
                    color="primary"
                    type="text"
                    value={values.checkName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.checkName && Boolean(errors.checkName)}
                    helperText={touched.checkName && errors.checkName}
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
                    {isSubmitting ? 'Opretter...' : 'Opret'}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>
    </div>
  );
};

export default CreateInitialCheckModal;
