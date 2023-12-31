const {
  addBooksHandler, getAllBooksHandler, getBooksByIdHandler,
  editBooksByIdHandler, deleteBooksByIdHandler,
} = require('./handler');

const routes = [
  // menyimpan buku
  {
    method: 'POST',
    path: '/books',
    handler: addBooksHandler,
  },
  // menampilkan seluruh buku yang disimpan dengan kriteria yang diinginkan handler
  {
    method: 'GET',
    path: '/books',
    handler: getAllBooksHandler,
  },
  // menampilkan seluruh buku yang disimpan dengan kriteria Id
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: getBooksByIdHandler,
  },
  {
    // mengubah data buku berdasarkan kriteria id
    method: 'PUT',
    path: '/books/{bookId}',
    handler: editBooksByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deleteBooksByIdHandler,
  },

];

module.exports = routes;
