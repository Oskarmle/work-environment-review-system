import { Box, Button, Modal, TextField } from '@mui/material';
import styles from './create-section-modal.module.css';
import { Form, Formik, type FormikHelpers } from 'formik';
import { useCreateSection } from '../../hooks/useCreateSection';

type CreateSectionModalProps = {
  open: boolean;
  handleClose: () => void;
};

const CreateSectionModal = ({ open, handleClose }: CreateSectionModalProps) => {
    interface Values {
    title: string;
  }
  const createSection = useCreateSection();

  const handleSubmit = (values: Values) => {
    createSection.mutate(values.title);
    alert('Egenindsats punkt oprettet');
    handleClose();
  };

  return (
    <div className={styles.createSectionModal}>
      <Modal open={open} onClose={handleClose}>
        <Box className={styles.box}>
          <h3>Opret ny sektion</h3>
          <Formik
            initialValues={{
              title: '',
            }}
            validate={(values) => {
              const errors: Partial<Values> = {};
              if (!values.title) {
                errors.title = 'Skal udfyldes';
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
                  <label htmlFor="title"></label>
                  <TextField
                    id="title"
                    name="title"
                    color="primary"
                    type="text"
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.title && Boolean(errors.title)}
                    helperText={touched.title && errors.title}
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

export default CreateSectionModal;
