const {nanoid} = require ('nanoid');
const books = require('./books');

// 1
const addBooksHandler = (request, h) => {

    // menghasilkan properti untuk buku baru
    const {name, year, author, summary, publisher, pageCount, readPage,reading,} = request.payload;
    const id = nanoid(16);
    const finished = pageCount == readPage;
    const  insertedAt = new Date().toISOString();
    const updatedAt = new Date().toISOString();


    // Validasi input buku
  if (!name) {
    // Jika properti "name" kosong
    return h
      .response({
        status: 'fail',
        message: 'Gagal menambahkan buku. Mohon isi nama buku',
      })
      .code(400);
  }

  if (readPage > pageCount) {
    // Jika "readPage" lebih besar dari "pageCount"
    return h
      .response({
        status: 'fail',
        message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
      })
      .code(400);
  }
    // waktunya menyimpan kedalam array books
    const newBook = {
        id,name,year,author,summary,publisher,pageCount,
        readPage,finished,reading,insertedAt,updatedAt,
    };
    books.push(newBook);

    const isSuccess = books.filter((book) => book.id === id).length > 0;

    if (isSuccess) {
        // Jika buku berhasil ditambahkan, kembalikan respons dengan status 201 dan pesan sukses
        const response = h.response({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: {
        bookId: id,
        },
        })
        return response.code(201);
    }else{

        // Jika gagal menambahkan buku, kembalikan respons dengan status 500 dan pesan gagal
        const response = h.response({
        status: 'fail',
        message: 'Gagal menambahkan buku',
        })
        return response.code(400);
  
    } 
};

// 2
const getAllBooksHandler = (request, h) => {
  return {
    status: 'success',
    data: {
    books: books.map((book) => ({
      id: book.id,
      name: book.name,
      publisher: book.publisher,
      })),
    },

  };
};

// 3
const getBooksByIdHandler = (request, h) => {

  const { bookId } = request.params;

  const book = books.find((b) => b.id === bookId);

  if (!book) {
    return h
      .response({
        status: 'fail',
        message: 'Buku tidak ditemukan',
      })
      .code(404);
  }

  return {
    status: 'success',
    data: {
      book,
    },
  };
};

// 4
const editBooksByIdHandler = (request, h) => {

  const {bookId} = request.params;

  const {name, year, author, summary, publisher, pageCount, readPage,reading,} = request.payload;
  const index = books.findIndex((book) => book.id === bookId);

  if (index === -1) {
    return h
      .response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan',
      })
      .code(404);
  }
  if(!name){
    return h
      .response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Mohon isi nama buku',
      })
      .code(400);
  }

  if (readPage > pageCount) {
    return h
      .response({
        status: 'fail',
        message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
      })
      .code(400);
  }
  
  // if(readPage > pageCount) {

  //   return h
  //   .response({
  //     status: 'fail',
  //     message: 'Gagal Memperbaharui buku. readPage tidak boleh lebih besar dari pageCount',
      
  //   })
  //   .code(400);
  // }

  const updatedAt = new Date().toISOString();
  books[index] = {
    ...books[index], name, year, author, summary, publisher, pageCount, readPage, reading, updatedAt,
  };

  return h
    .response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    })
    .code(200);
};


module.exports = {
  addBooksHandler, getAllBooksHandler, getBooksByIdHandler, editBooksByIdHandler,
}




