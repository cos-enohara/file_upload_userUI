import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormControlLabel,
  FormHelperText,
  Grid,
  Paper,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import QuillEditor from 'src/components/QuillEditor';
import FilesDropzone from 'src/components/FilesDropzone';

const useStyles = makeStyles(() => ({
  root: {},
  editor: {
    '& .ql-editor': {
      height: 400
    }
  },
  form: {
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  button: {
    minWidth: 150,
    margin: 5
  },
  buttonGroup: {
    marginTop: 100,
    marginBottom: 50
  },
  key: {
    display: 'inline-block',
    padding: 20,
    paddingBottom: 0,
    textAlign: 'right',
    width: '30%',
    color: 'gray',
    verticalAlign: 'middle',
    height: '60px'
  },
  value: {
    display: 'inline-block',
    padding: 20,
    paddingLeft: 30,
    paddingBottom: 0,
    width: '70%',
    fontWeight: 'bold',
    verticalAlign: 'top',
    height: '60px'
  }

}));

const ProductCreateForm = ({ className, ...rest }) => {
  const classes = useStyles();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  return (
    <Formik 
      initialValues={{
        category: '',
        description: '',
        images: [],
        includesTaxes: false,
        isTaxable: false,
        name: '',
        price: '',
        productCode: '',
        productSku: '',
        salePrice: '',
        submit: null
      }}
      validationSchema={Yup.object().shape({
        category: Yup.string().max(255),
        description: Yup.string().max(5000),
        images: Yup.array(),
        includesTaxes: Yup.bool().required(),
        isTaxable: Yup.bool().required(),
        name: Yup.string().max(255).required(),
        price: Yup.number().min(0).required(),
        productCode: Yup.string().max(255),
        productSku: Yup.string().max(255),
        salePrice: Yup.number().min(0)
      })}
      onSubmit={async (values, {
        setErrors,
        setStatus,
        setSubmitting
      }) => {
        try {
          // NOTE: Make API request
          setStatus({ success: true });
          setSubmitting(false);
          enqueueSnackbar('Product Created', {
            variant: 'success'
          });
          history.push('/app/products');
        } catch (err) {
          console.error(err);
          setStatus({ success: false });
          setErrors({ submit: err.message });
          setSubmitting(false);
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        setFieldValue,
        touched,
        values
      }) => (
        <form
          onSubmit={handleSubmit}
          className={clsx(classes.root, className)}
          {...rest}
        >
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              xs={12}
              lg={8}
              className={classes.form}
            >
              <Card>
                <CardContent>
                  <div style={{paddingBottom: '100px'}}>
                    <Box>
                      <p className={classes.key}>イベント名</p>
                      <p className={classes.value}>○×学会</p>
                    </Box>
                    <Box>
                      <p className={classes.key}>演者名</p>
                      <p className={classes.value}>梶間　剛</p>
                    </Box>
                    <Box>
                      <p className={classes.key}>タイトル</p>
                      <p className={classes.value}>ABCについて</p>
                    </Box>
                    <Box>
                      <p className={classes.key}>ファイル説明</p>
                      <p className={classes.value} style={{fontWeight: 'normal'}}>
                        アップロード可能なサイズは○×です。xxxまでに提出をおねがいします
                      </p>
                    </Box>
                  </div>

                  <Divider />

                  <FilesDropzone />
                  <Box
                    className={classes.buttonGroup}
                    align="center"
                    >
                    <Button
                      color="default"
                      size="large"
                      type="submit"
                      variant="outlined"
                      className={classes.button}
                    >
                      戻る
                    </Button>
                    <Button
                      color="secondary"
                      size="large"
                      type="submit"
                      variant="contained"
                      className={classes.button}
                    >
                      登録
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          {errors.submit && (
            <Box mt={3}>
              <FormHelperText error>
                {errors.submit}
              </FormHelperText>
            </Box>
          )}
        </form>
      )}
    </Formik>
  );
};

ProductCreateForm.propTypes = {
  className: PropTypes.string
};

export default ProductCreateForm;
