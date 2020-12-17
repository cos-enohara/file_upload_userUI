import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardMedia,
  CardContent,
  Chip,
  Container,
  Divider,
  Link,
  Tooltip,
  Typography,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Logo from 'src/components/Logo';
import useAuth from 'src/hooks/useAuth';
import Auth0Login from './Auth0Login';
import FirebaseAuthLogin from './FirebaseAuthLogin';
import JWTLogin from './JWTLogin';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    display: 'flex',
    flexDirection: 'column',
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
    height: 200,
  },
}));

const LoginView = () => {
  const classes = useStyles();
  const { method } = useAuth();

  return (
    <Page
      className={classes.root}
      title="Login"
    >
      <Container
        className={classes.cardContainer}
        maxWidth="sm"
      >
        <Box
          mb={8}
          display="flex"
          justifyContent="center"
        >
        </Box>
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
                align="center"
              >
                ○○学会（イベント名）
              </Typography>
            </Box>
            <Card>
              <CardMedia
                className={classes.media}
                image="/static/images/event/corona.jpg"
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
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
              </CardContent>
            </Card>
            <Box
              flexGrow={1}
              mt={3}
            >
              {method === 'Auth0' && <Auth0Login /> }
              {method === 'FirebaseAuth' && <FirebaseAuthLogin /> }
              {method === 'JWT' && <JWTLogin /> }
            </Box>
            <Box my={3}>
              <Divider />
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Page>
  );
};

export default LoginView;
