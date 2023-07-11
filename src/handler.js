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
        response.code(201);
        return response;
    }else{

        // Jika gagal menambahkan buku, kembalikan respons dengan status 500 dan pesan gagal
        const response = h.response({
        status: 'fail',
        message: 'Gagal menambahkan buku',
        })
        response.code(500);
        return response;
    } 
};

module.exports = {
    addBooksHandler,
}




