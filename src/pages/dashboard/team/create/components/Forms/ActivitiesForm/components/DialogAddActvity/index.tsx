import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core/';

import LoadingButton from '@/components/LoadingButton/';
import TextFieldPassword from '@/components/TextFieldPassword';
import AppError from '@/shared/errors/AppError';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import { toast, TypeOptions } from 'react-toastify';
import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { PaperForm, DivBtnCreate } from './styles';

interface Props {
  open: boolean;
  handleClose: () => void;
}

export default function DialogAddActvity({ open, handleClose }: Props) {
  const isEditMode = false;
  if (!open) {
    return null;
  }

  const handleSubmit = (values: any) => {
    console.log('submit');
    handleClose();
  };

  return (
    <Formik
      initialValues={{ id: 0 }}
      // initialValues={initialValues}
      onSubmit={handleSubmit}
      // validationSchema={schema}
    >
      {function Render({ submitForm, isSubmitting, setFieldValue }) {
        return (
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Adicionar atividade</DialogTitle>
            <DialogContent>
              <Form>
                <Field
                  component={TextField}
                  label="Nome"
                  name="name"
                  fullWidth
                />
                <Field component={TextField} label="URL" name="url" fullWidth />
              </Form>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancelar
              </Button>
              <LoadingButton
                label={isEditMode ? 'Salvar' : 'Criar'}
                isLoading={isSubmitting}
                onClick={submitForm}
                size="medium"
                fullWidth={false}
              />
            </DialogActions>
          </Dialog>
        );
      }}
    </Formik>
  );
}
