import { Grid, Header, Form, Segment, Button } from 'semantic-ui-react';
import { useMutation } from '@tanstack/react-query';
import { mutationLogin } from './mutation';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const Auth = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationKey: ['login'],
    mutationFn: mutationLogin,
  });

  const handleLogin = async () => {
    const { guest_session_id } = await mutation.mutateAsync();
    localStorage.setItem('guest_session_id', guest_session_id);
    navigate('/');
  };

  return (
    <Grid textAlign="center" verticalAlign="middle" style={{ height: '100vh' }}>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="violet" textAlign="center">
          Welcome
        </Header>
        <Form size="large">
          <Segment stacked>
            <Button color="violet" size="big" fluid onClick={handleLogin}>
              Login as guest
            </Button>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  );
};

export default Auth;
