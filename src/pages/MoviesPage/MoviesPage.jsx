import { useEffect, useState } from 'react';
import { searchMovieByQuery } from '../../api';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import MovieList from '../../components/MovieList/MovieList';
import * as Yup from 'yup';
import { useId } from 'react';
import Loader from '../../components/Loader/Loader';
import ErrorMsg from '../../components/ErrorMessage/ErrorMessage';
import { useSearchParams } from 'react-router-dom';

const initialValues = {
  query: '',
};

const FormSchema = Yup.object().shape({
  query: Yup.string()
    .min(1, 'Too Short!')
    .max(20, 'Too Long!')
    .required('Required'),
});

export default function MoviesPage() {
  const [movies, setMovies] = useState(null);
  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();



  const nameFieldId = useId();

  useEffect(() => {
    const fetchByQuery = async () => {
      try {
        setError(false);
        setLoading(true);
        const response = await searchMovieByQuery(searchParams);
        setMovies(response);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchByQuery(searchParams);

  }, [searchParams]);

  const handleSubmit = (values, actions) => {
    setSearchParams(values.query);

    actions.resetForm();
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={FormSchema}
      >
        <Form>
          <Field type="text" name="query" id={nameFieldId}></Field>
          <ErrorMessage
            type="text"
            name="query"
            component="p"
            //className={css.error}
          />
          <button type="submit">Search</button>
        </Form>
      </Formik>

      {movies !== null && <MovieList films={movies} />}
      {isLoading && <Loader />}
      {isError && <ErrorMsg />}
    </div>
  );
}
