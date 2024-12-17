import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { Container, Col, Form, Button, Card, Row } from 'react-bootstrap';
import Auth from '../utils/auth';
import { saveBookIds, getSavedBookIds } from '../utils/localStorage';

const SEARCH_BOOKS = gql`
  query searchBooks($query: String!) {
    searchBooks(query: $query) {
      bookId
      title
      authors
      description
      image
    }
  }
`;

type Book = {
  bookId: string;
  title: string;
  authors: string[];
  description: string;
  image?: string;
};

const SAVE_BOOK = gql`
  mutation saveBook($book: BookInput!) {
    saveBook(book: $book) {
      bookId
    }
  }
`;

const SearchBooks = () => {
  const [searchedBooks, setSearchedBooks] = useState<Book[]>([]);
  const [searchInput, setSearchInput] = useState('');
  const [savedBookIds, setSavedBookIds] = useState(getSavedBookIds());

  const { data, refetch } = useQuery(SEARCH_BOOKS, {
    skip: !searchInput,
    variables: { query: searchInput },
  });

  const [saveBook] = useMutation(SAVE_BOOK);

  useEffect(() => {
    return () => saveBookIds(savedBookIds);
  }, [savedBookIds]);

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!searchInput) return;
    try {
      const result = await refetch();
      setSearchedBooks(result.data?.searchBooks || []);
    } catch (err) {
      console.error('Error fetching books:', err);
    }
  };

  const handleSaveBook = async (bookId: string) => {
    const bookToSave = searchedBooks.find((book) => book.bookId === bookId);
    if (!bookToSave || !Auth.loggedIn()) return;

    try {
      await saveBook({ variables: { book: bookToSave } });
      setSavedBookIds([...savedBookIds, bookId]);
    } catch (err) {
      console.error('Error saving book:', err);
    }
  };

  return (
    <>
      <div className='text-light bg-dark p-5'>
        <Container>
          <h1>Search for Books!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name='searchInput'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='Search for a book'
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type='submit' variant='success' size='lg'>
                  Submit Search
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>

      <Container>
        <h2 className='pt-5'>
          {searchedBooks.length
            ? `Viewing ${searchedBooks.length} results:`
            : 'Search for a book to begin'}
        </h2>
        <Row>
          {searchedBooks.map((book) => (
            <Col md='4' key={book.bookId}>
              <Card border='dark'>
                {book.image && (
                  <Card.Img
                    src={book.image}
                    alt={`The cover for ${book.title}`}
                    variant='top'
                  />
                )}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className='small'>Authors: {book.authors.join(', ')}</p>
                  <Card.Text>{book.description}</Card.Text>
                  {Auth.loggedIn() && (
                    <Button
                      disabled={savedBookIds.includes(book.bookId)}
                      className='btn-block btn-info'
                      onClick={() => handleSaveBook(book.bookId)}
                    >
                      {savedBookIds.includes(book.bookId)
                        ? 'This book has already been saved!'
                        : 'Save this Book!'}
                    </Button>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default SearchBooks;
