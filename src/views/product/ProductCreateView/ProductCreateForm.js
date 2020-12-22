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
  makeStyles,
  FormControl,
  FormLabel,
  FormGroup,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow
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
    marginBottom: 30
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
  },
  table: {
    minWidth: 650,
  }
}));

function createData(fileFromat, eventName, title, status, fileName, size, registerDt, updateDt) {
  return { fileFromat, eventName, title, status, fileName, size, registerDt, updateDt };
}

const rows = [
  createData('MP4', 'AAAA学会', '○×について', '登録済み', 'xxxxxxx.mp4', '209KB', '2020.11.23 23:59:13', '2020.11.23 23:59:13'),
];

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
                    <Box>
                      <p className={classes.key}>アップロードするファイル</p>
                      <p className={classes.value} style={{fontWeight: 'bold', fontSize: '0.9em'}}>
                        アップロードファイル確認
                      </p>
                      <Box style={{paddingLeft: '250px'}}>
                        <FormGroup aria-label="position" column>
                          <FormControlLabel
                            value="top"
                            control={<Checkbox color="primary" />}
                            label="ファイルにパスワードは掛かっていません"
                            labelPlacement="end"
                          />
                          <FormControlLabel
                            value="start"
                            control={<Checkbox color="primary" />}
                            label="ファイル名に半角スペースが入っていない"
                            labelPlacement="end"
                          />
                          <FormControlLabel
                            value="bottom"
                            control={<Checkbox color="primary" />}
                            label="ファイル名が2GB以下"
                            labelPlacement="end"
                          />
                        </FormGroup>
                      </Box>
                    </Box>
                  </div>
                  <FilesDropzone />
                  <Box
                    className={classes.buttonGroup}
                    align="center"
                    >
                    <Button
                      color="default"
                      size="large"
                      variant="outlined"
                      className={classes.button}
                      onClick={() => history.goBack()}
                    >
                      戻る
                    </Button>
                    <Button
                      color="secondary"
                      size="large"
                      variant="contained"
                      className={classes.button}
                    >
                      登録
                    </Button>
                  </Box>
                  <Divider />
                  <Table className={classes.table} size="small" aria-label="a dense table" style={{padding: '10px 10px'}}>
                    <TableHead>
                      <TableRow>
                        <TableCell style={{fontSize: '0.5em',padding: '10px 10px'}}>ファイル名</TableCell>
                        <TableCell style={{fontSize: '0.5em',padding: '10px 10px'}}>イベント名</TableCell>
                        <TableCell style={{fontSize: '0.5em',padding: '10px 10px'}}>タイトル</TableCell>
                        <TableCell style={{fontSize: '0.5em',padding: '10px 10px'}}>ステータス</TableCell>
                        <TableCell style={{fontSize: '0.5em',padding: '10px 10px'}}>ファイル名</TableCell>
                        <TableCell style={{fontSize: '0.5em',padding: '10px 10px'}}>Size</TableCell>
                        <TableCell style={{fontSize: '0.5em',padding: '10px 10px'}}>登録日時</TableCell>
                        <TableCell style={{fontSize: '0.5em',padding: '10px 10px'}}>更新日時</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row) => (
                        <TableRow key={row.fileFromat}>
                          <TableCell style={{fontSize: '0.5em',padding: '10px 10px'}}>{row.fileFromat}</TableCell>
                          <TableCell style={{fontSize: '0.5em',padding: '10px 10px'}}><a href="#">{row.eventName}</a></TableCell>
                          <TableCell style={{fontSize: '0.5em',padding: '10px 10px'}}>{row.title}</TableCell>
                          <TableCell style={{fontSize: '0.5em',padding: '10px 10px'}}>{row.status}</TableCell>
                          <TableCell style={{fontSize: '0.5em',padding: '10px 10px'}}><a href="#">{row.fileName}</a></TableCell>
                          <TableCell style={{fontSize: '0.5em',padding: '10px 10px'}}>{row.size}</TableCell>
                          <TableCell style={{fontSize: '0.5em',padding: '10px 10px'}}>{row.registerDt}</TableCell>
                          <TableCell style={{fontSize: '0.5em',padding: '10px 10px'}}>{row.updateDt}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
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
