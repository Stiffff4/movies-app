import { Card, Grid, Icon } from 'semantic-ui-react';
import { DisplayType } from '../enums/display.enum';
import { MoviesType, TvShowsType } from '../types/content.types';
import { EnvironmentHelper } from '../helpers/environment.helper';
import { Link } from 'react-router-dom';

interface Props {
  data: MoviesType[] | TvShowsType[];
  displayType: DisplayType;
}

export const ColumnDisplay = ({ data, displayType }: Props) => {
  return (
    <Grid
      columns={3}
      stackable
      centered
      verticalAlign="top"
      padded="vertically"
    >
      {data.map((item) => {
        const { id, release_date, overview, vote_average, poster_path } = item;
        const title =
          displayType === DisplayType.Movies
            ? (item as MoviesType).title
            : (item as TvShowsType).name;

        const routePrefix =
          displayType === DisplayType.Movies ? 'movie' : 'tvshow';

        return (
          <Grid.Column key={id} style={{ marginBottom: '2rem' }}>
            <Card.Group>
              <Link to={`${routePrefix}/${id}`}>
                <Card fluid style={{ height: '100%' }}>
                  <div>
                    <img
                      src={`${EnvironmentHelper.getVariableValue(
                        'VITE_MOVIE_DB_POSTER_PATH',
                      )}/${poster_path}`}
                      alt={title}
                      style={{
                        width: '100%',
                        height: 'auto',
                        aspectRatio: '4/6',
                      }}
                    />
                  </div>
                  <Card.Content>
                    <Card.Header>{title}</Card.Header>
                    <Card.Meta>{release_date}</Card.Meta>
                    <Card.Description
                      style={{
                        height: '10rem',
                        overflow: 'hidden',
                      }}
                    >
                      {overview}
                    </Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <Icon name="star" />
                    {Number(vote_average).toFixed(1)}/10
                  </Card.Content>
                </Card>
              </Link>
            </Card.Group>
          </Grid.Column>
        );
      })}
    </Grid>
  );
};
