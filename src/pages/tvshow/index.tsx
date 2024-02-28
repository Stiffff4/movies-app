import {
  Segment,
  Header,
  Grid,
  List,
  Icon,
  Loader,
  Image,
  Accordion,
  Card,
} from 'semantic-ui-react';
import { ContentHelper } from '../../helpers/content.helper';
import { tvshow } from './query';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { TvShowType } from '../../types/content.types';
import { EnvironmentHelper } from '../../helpers/environment.helper';
import { Helmet } from 'react-helmet';
import { Status } from '../../enums/tvshow.enum';

export const TvShow = () => {
  const { id } = useParams<string>();

  const { data, isLoading } = useQuery({
    queryKey: ['tvshow'],
    queryFn: () => tvshow(id!),
  });

  if (!data) {
    return <div>Unable to retrieve movie details</div>;
  }

  const {
    name,
    genres,
    popularity,
    vote_average,
    first_air_date,
    poster_path,
    original_language,
    status,
    in_production,
    number_of_episodes,
    seasons,
    created_by,
    episode_run_time,
  }: TvShowType = data;

  if (isLoading) return <Loader active />;

  const productionIconName = in_production ? 'cog' : 'check square outline';

  const statusIconName =
    status == Status.Returning
      ? 'calendar plus outline'
      : status == Status.Ended
      ? 'calendar check outline'
      : status == Status.Canceled
      ? 'calendar minus outline'
      : 'calendar check outline';

  const seasonPanels = seasons.map((season) => ({
    key: season.id,
    title: season.name,
    content: {
      content: (
        <Card
          style={{ height: '70px' }}
          meta={season.air_date}
          description={`${season.episode_count} episodes`}
        />
      ),
    },
  }));

  const image = `${EnvironmentHelper.getVariableValue(
    'VITE_MOVIE_DB_POSTER_PATH',
  )}${poster_path}`;

  return (
    <div style={{ marginTop: 50 }}>
      <Helmet>
        <title>{name}</title>
      </Helmet>
      {
        <Segment>
          <Header size="huge">{name}</Header>
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
                      {first_air_date}
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
                    Created by
                    <List.Header>
                      <Icon name="user circle outline"></Icon>
                      {created_by.length
                        ? created_by.map((creator) => creator.name).join(', ')
                        : 'N/A'}
                    </List.Header>
                  </List.Item>
                  <List.Item className="list-item">
                    Original language
                    <List.Header>
                      <Icon name="globe"></Icon>
                      {ContentHelper.getLanguageName(original_language)}
                    </List.Header>
                  </List.Item>
                  <List.Item className="list-item">
                    Average episode runtime
                    <List.Header>
                      <Icon name="clock outline"></Icon>
                      {episode_run_time
                        .map((runtime) => runtime)
                        .join(', ')}{' '}
                      minutes
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
                    Production status
                    <List.Header>
                      <Icon name={productionIconName}></Icon>
                      {in_production ? 'In production' : 'Finished'}
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
                    Number of episodes
                    <List.Header>
                      <Icon name="file video outline"></Icon>
                      {number_of_episodes}
                    </List.Header>
                  </List.Item>
                  <List.Item className="list-item">
                    Seasons
                    <List.Header>
                      <List.Description
                        style={{ height: '200px', overflow: 'scroll' }}
                      >
                        <Accordion
                          defaultActiveIndex={0}
                          panels={seasonPanels}
                          styled
                        ></Accordion>
                      </List.Description>
                    </List.Header>
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
