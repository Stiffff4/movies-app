import { useQuery } from '@tanstack/react-query';
import {
  Grid,
  Header,
  Icon,
  Image,
  Label,
  List,
  Loader,
  Segment,
} from 'semantic-ui-react';
import { movie } from './query';
import { useParams } from 'react-router-dom';
import { EnvironmentHelper } from '../../helpers/environment.helper';
import { MovieType } from '../../types/content.types';
import { ContentHelper } from '../../helpers/content.helper';
import { Helmet } from 'react-helmet';
import './styles.css';

export const Movie = () => {
  const { id } = useParams<string>();

  const { data, isLoading } = useQuery({
    queryKey: ['movie'],
    queryFn: () => movie(id!),
  });

  if (!data) {
    return <div>Unable to retrieve movie details</div>;
  }

  const {
    title,
    overview,
    budget,
    genres,
    popularity,
    vote_average,
    release_date,
    poster_path,
    adult,
    runtime,
    original_language,
    status,
    revenue,
  }: MovieType = data;

  if (isLoading) return <Loader active />;

  const ratingIconName = adult ? 'exclamation' : 'check circle outline';
  const statusIconName =
    status == 'Released' ? 'calendar check outline' : 'calendar minus outline';

  const image = `${EnvironmentHelper.getVariableValue(
    'VITE_MOVIE_DB_POSTER_PATH',
  )}${poster_path}`;

  return (
    <div style={{ marginTop: 50 }}>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {
        <Segment>
          <Header size="huge">{title}</Header>
          <Grid columns={2} divided textAlign="left" style={{ marginTop: 10 }}>
            <Grid.Row>
              <Grid.Column width={6}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                  }}
                >
                  <Image size="big" centered src={image} />
                </div>
              </Grid.Column>
              <Grid.Column width={'10'}>
                <List relaxed divided>
                  <List.Item className="list-item">
                    Release Date
                    <List.Header>
                      <Icon name="calendar outline"></Icon>
                      {release_date}
                    </List.Header>
                  </List.Item>
                  <List.Item className="list-item">
                    Genre(s)
                    <List.Header>
                      <Icon name="question circle outline"></Icon>
                      {genres.map((genre) => genre.name).join(', ')}
                    </List.Header>
                  </List.Item>
                  <List.Item className="list-item">
                    Language
                    <List.Header>
                      <Icon name="globe"></Icon>
                      {ContentHelper.getLanguageName(original_language)}
                    </List.Header>
                  </List.Item>
                  <List.Item className="list-item">
                    Reviews
                    <List.Header>
                      <Icon name="users"></Icon>
                      {Number(vote_average).toFixed(1)}/10
                    </List.Header>
                  </List.Item>
                  <List.Item className="list-item">
                    Popularity
                    <List.Header>
                      <Icon name="star outline"></Icon>
                      {Number(popularity).toFixed(2)}
                    </List.Header>
                  </List.Item>
                  <List.Item className="list-item">
                    Budget
                    <List.Header>
                      <Icon name="money bill alternate outline"></Icon>
                      {'$' +
                        budget
                          .toFixed(2)
                          .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                    </List.Header>
                  </List.Item>
                  <List.Item className="list-item">
                    Revenue
                    <List.Header>
                      <Icon name="money bill alternate outline"></Icon>
                      {'$' +
                        Number(revenue)
                          .toFixed(2)
                          .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                    </List.Header>
                  </List.Item>
                  <List.Item className="list-item">
                    Playtime
                    <List.Header>
                      <Icon name="clock outline"></Icon>
                      {runtime} minutes
                    </List.Header>
                  </List.Item>
                  <List.Item className="list-item">
                    Status
                    <List.Header>
                      <Icon name={statusIconName}></Icon>
                      {status}
                    </List.Header>
                  </List.Item>
                  <List.Item className="list-item">
                    Rating
                    <List.Header>
                      <Icon name={ratingIconName}></Icon>
                      {adult ? 'For adults only' : 'For everyone'}
                    </List.Header>
                  </List.Item>
                  <List.Item className="list-item">
                    <Header>Description</Header>
                    <Label
                      basic
                      size="large"
                      style={{ marginTop: 10, textAlign: 'justify' }}
                    >
                      {overview}
                    </Label>
                  </List.Item>
                </List>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      }
    </div>
  );
};
