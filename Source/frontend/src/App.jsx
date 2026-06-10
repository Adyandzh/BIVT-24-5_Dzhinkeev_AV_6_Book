import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);

  const [newBook, setNewBook] = useState({
    title: '',
    author_id: 1,
    genre_id: 1,
    publisher_id: 1,
    publication_year: 2024,
    price: 500,
    quantity: 1,
  });

  async function loadBooks() {
    const response = await fetch('http://localhost:3000/books');
    const data = await response.json();
    setBooks(data);
  }

  async function loadAuthors() {
    const response = await fetch('http://localhost:3000/authors');
    const data = await response.json();
    setAuthors(data);
  }

  async function addBook(event) {
    event.preventDefault();

    await fetch('http://localhost:3000/books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newBook),
    });

    setNewBook({
      title: '',
      author_id: 1,
      genre_id: 1,
      publisher_id: 1,
      publication_year: 2024,
      price: 500,
      quantity: 1,
    });

    loadBooks();
  }

  async function deleteBook(id) {
    await fetch(`http://localhost:3000/books/${id}`, {
      method: 'DELETE',
    });

    loadBooks();
  }

  async function increaseQuantity(id, currentQuantity) {
    await fetch(`http://localhost:3000/books/${id}/quantity`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        quantity: currentQuantity + 1,
      }),
    });

    loadBooks();
  }

  useEffect(() => {
    loadBooks();
    loadAuthors();
  }, []);

  return (
    <div className="container">
      <h1>Информационная система «Книга»</h1>

      <section className="card">
        <h2>Добавление книги</h2>

        <form onSubmit={addBook} className="form">
          <input
            type="text"
            placeholder="Название книги"
            value={newBook.title}
            onChange={(event) =>
              setNewBook({ ...newBook, title: event.target.value })
            }
            required
          />

          <select
            value={newBook.author_id}
            onChange={(event) =>
              setNewBook({ ...newBook, author_id: Number(event.target.value) })
            }
          >
            {authors.map((author) => (
              <option key={author.id} value={author.id}>
                {author.full_name}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Год издания"
            value={newBook.publication_year}
            onChange={(event) =>
              setNewBook({
                ...newBook,
                publication_year: Number(event.target.value),
              })
            }
          />

          <input
            type="number"
            placeholder="Цена"
            value={newBook.price}
            onChange={(event) =>
              setNewBook({ ...newBook, price: Number(event.target.value) })
            }
          />

          <input
            type="number"
            placeholder="Количество"
            value={newBook.quantity}
            onChange={(event) =>
              setNewBook({ ...newBook, quantity: Number(event.target.value) })
            }
          />

          <button type="submit">Добавить книгу</button>
        </form>
      </section>

      <section className="card">
        <h2>Список книг</h2>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Название</th>
              <th>Автор</th>
              <th>Жанр</th>
              <th>Издательство</th>
              <th>Год</th>
              <th>Цена</th>
              <th>Кол-во</th>
              <th>Действия</th>
            </tr>
          </thead>

          <tbody>
            {books.map((book) => (
              <tr key={book.book_id}>
                <td>{book.book_id}</td>
                <td>{book.book_title}</td>
                <td>{book.author_name}</td>
                <td>{book.genre_name}</td>
                <td>{book.publisher_name}</td>
                <td>{book.publication_year}</td>
                <td>{book.price}</td>
                <td>{book.quantity}</td>
                <td>
                  <button
                    onClick={() =>
                      increaseQuantity(book.book_id, book.quantity)
                    }
                  >
                    +1
                  </button>

                  <button
                    className="delete"
                    onClick={() => deleteBook(book.book_id)}
                  >
                    Удалить
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default App;