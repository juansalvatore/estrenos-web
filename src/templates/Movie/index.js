import React, { useState, useEffect } from 'react';
import { graphql, Link } from 'gatsby';
import { Table } from 'baseui/table';
import { H2, Label2 } from 'baseui/typography';

// Components
import ScrollableSelect from 'components/ui/ScrollableSelect';

// Styled Components
import { GoBack, Header, TableContainer } from './styled';

// Components
import SEO from 'components/ui/Seo';
import Layout from 'components/ui/Layout';
import ChevronLeft from 'components/ui/Icons/ChevronLeft';

export const query = graphql`
  query($id: String!) {
    estrenos {
      movie(id: $id) {
        id
        title
      }
      cinemas {
        id
        name
        chain
      }
      shows(movieId: $id) {
        cinemaId
        time
        date
        format
        version
      }
    }
  }
`;

const Movie = ({ data: { estrenos } }) => {
  const { movie, cinemas, shows } = estrenos;
  const [showsToFilter, setShowsToFilter] = useState(shows);
  const [selectedCinemaId, setSelectedCinemaId] = useState(null);

  useEffect(() => {
    if (!selectedCinemaId) return;
    setShowsToFilter(shows.filter(({ cinemaId }) => cinemaId === selectedCinemaId[0].id));
  }, [selectedCinemaId, shows]);

  const handleChangeCinema = ({ value }) => setSelectedCinemaId(value);

  const chains = [...new Set(cinemas.map(({ chain }) => chain))];
  const options = chains.reduce(
    (acc, chain) => ({
      ...acc,
      [chain]: cinemas
        .filter(({ chain: cinemaChain }) => chain === cinemaChain)
        .map((cinema) => {
          const enabled = shows.some(({ cinemaId }) => cinemaId === cinema.id);
          return { ...cinema, disabled: !enabled };
        }),
    }),
    {},
  );

  const findCinema = (id) => cinemas.find(({ id: cinemaId }) => cinemaId === id);

  const DATA = showsToFilter.map((show) => {
    const cinema = findCinema(show.cinemaId);
    return [cinema.chain, cinema.name, show.date, show.time, show.format, show.version];
  });

  const COLUMNS = ['Cadena', 'Cine', 'Fecha', 'Hora', 'Formato', 'Version'];

  return (
    <Layout>
      <SEO title={movie.title} />
      <Link to="/">
        <GoBack>
          <ChevronLeft />
          <Label2>Volver a todas las películas</Label2>
        </GoBack>
      </Link>

      <H2>{movie.title}</H2>

      <Header>
        <ScrollableSelect
          labelKey="name"
          options={options}
          placeholder="Selecciona tu cine"
          value={selectedCinemaId}
          valueKey="id"
          onChange={handleChangeCinema}
        />
      </Header>

      <TableContainer>
        <Table columns={COLUMNS} data={DATA} />
      </TableContainer>
    </Layout>
  );
};

export default Movie;
