import { Button, Loader } from 'semantic-ui-react';
import { DisplayType } from '../../enums/display.enum';
import { useState } from 'react';
import { ColumnDisplay } from '../../components/column-display';
import { useQuery } from '@tanstack/react-query';
import { movies, tvshows } from './query';
import { Helmet } from 'react-helmet';
import { StringHelper } from '../../helpers/string.helper';

export const Home = () => {
  const [displayType, setDisplayType] = useState<DisplayType>(() => {
    const storedDisplayType = localStorage.getItem('displayType');
    return storedDisplayType
      ? JSON.parse(storedDisplayType)
      : DisplayType.Movies;
  });

  const handleDisplayTypeChange = (newDisplayType: DisplayType) => {
    setDisplayType(newDisplayType);
    localStorage.setItem('displayType', JSON.stringify(newDisplayType));
  };

  const { data: moviesData, isLoading: isLoadingMovies } = useQuery({
    queryKey: ['movies'],
    queryFn: movies,
  });
  const { data: tvShowsData, isLoading: isLoadingTvShows } = useQuery({
    queryKey: ['tvshows'],
    queryFn: tvshows,
  });

  const titleName = `Home - ${StringHelper.capitalize(displayType)}`;

  return (
    <div style={{ marginTop: 50, height: 'auto' }}>
      <Helmet>
        <title>{titleName}</title>
      </Helmet>
      <Button.Group>
        <Button
          color={displayType === DisplayType.Movies ? 'violet' : undefined}
          onClick={() => handleDisplayTypeChange(DisplayType.Movies)}
        >
          Movies
        </Button>
        <Button
          color={displayType === DisplayType.TvShows ? 'violet' : undefined}
          onClick={() => handleDisplayTypeChange(DisplayType.TvShows)}
        >
          TV Shows
        </Button>
      </Button.Group>

      {isLoadingMovies || isLoadingTvShows ? (
        <Loader active></Loader>
      ) : (
        <div style={{ marginTop: 20 }}>
          {displayType === DisplayType.Movies ? (
            <ColumnDisplay
              data={moviesData!}
              displayType={DisplayType.Movies}
            />
          ) : (
            <ColumnDisplay
              data={tvShowsData!}
              displayType={DisplayType.TvShows}
            />
          )}
        </div>
      )}
    </div>
  );
};
