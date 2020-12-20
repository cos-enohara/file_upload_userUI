import React, {
  useState,
  useEffect,
  useCallback
} from 'react';
import {
  Box,
  Container,
  makeStyles,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button
} from '@material-ui/core';
import axios from 'src/utils/axios';
import Page from 'src/components/Page';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import Header from './Header';
import Results from './Results';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: 100,
    maxWidth: '60%',
    display: 'flex',
    flexDirection: 'column',
    marginRight: 'auto',
    marginLeft: 'auto'

  },
  cardContainer: {
    paddingBottom: 80,
    paddingTop: 80,
  },
  cardContent: {
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    minHeight: 400
  },
  currentMethodIcon: {
    height: 40,
    '& > img': {
      width: 'auto',
      maxHeight: '100%'
    }
  },
  media: {
    height: 400,
  },
  button: {
    minWidth: 150,
    margin: 5
  },
  buttonGroup: {
    marginTop: 100,
    marginBottom: 50
  }

}));

const ProductListView = () => {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [products, setProducts] = useState([]);

  const getProducts = useCallback(async () => {
    try {
      const response = await axios.get('/api/products');

      if (isMountedRef.current) {
        setProducts(response.data.products);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <Page
      className={classes.root}
      title="Product List"
    >
      <Card>
        <CardContent className={classes.cardContent}>
          <Box
            alignItems="center"
            justifyContent="space-between"
            mb={3}
          >
            <Typography
              color="textPrimary"
              gutterBottom
              variant="h2"
              align="left"
            >
              ○○学会（イベント名）
            </Typography>
          </Box>
          
          <CardMedia
            className={classes.media}
            image="/static/images/event/corona.jpg"
            title="Contemplative Reptile"
          />
          <br></br>
          <Typography gutterBottom variant="h3" component="h2">
            演者への案内、注意事項等
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          大変お忙しいところをお集まりいただきまして
          有難うございます．日本感染症学会は新型コロナウイ
          ルス感染症（COVID-19）に対して提言を出したり，
          症例報告を公開したりということで活動を行ってきま
          した．何とか第 1 波を乗り越えることができましたが，
          今でも東京を中心にクラスターが報告されておりま
          す．
          </Typography>
          <br></br>
          <br></br>
          <Typography gutterBottom variant="h3" component="h2">
            ファイル提出について
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          ファイルは期限内に提出してください。ファイルは期限内に提出してください。
          ファイルは期限内に提出してください。ファイルは期限内に提出してください。
          ファイルは期限内に提出してください。ファイルは期限内に提出してください。
          ファイルは期限内に提出してください。ファイルは期限内に提出してください。
          ファイルは期限内に提出してください。ファイルは期限内に提出してください。
          </Typography>
          <br></br>
          <br></br>
          <Typography gutterBottom variant="h3" component="h2">
            備考
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          備考。備考。備考。備考。備考。備考。備考。備考。備考。備考。備考。備考。
          備考。備考。備考。備考。備考。備考。備考。備考。備考。備考。備考。備考。
          備考。備考。備考。備考。備考。備考。備考。備考。備考。備考。備考。備考。
          備考。備考。備考。備考。備考。備考。備考。備考。備考。備考。備考。備考。
          備考。備考。備考。備考。備考。備考。備考。備考。備考。備考。備考。備考。
          </Typography>
        </CardContent>
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
            ログアウト
          </Button>
          <Button
            color="secondary"
            size="large"
            type="submit"
            variant="contained"
            className={classes.button}
          >
            次へ
          </Button>
        </Box>
      </Card>
    </Page>

  );
};

export default ProductListView;
