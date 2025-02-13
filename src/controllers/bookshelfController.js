const Bookshelf = require('../models/BookshelfModel');

exports.create = async function (req, res) {
  try {
    const bookshelf = new Bookshelf(req.body);
    const createdBookshelf = await bookshelf.create();
    return res.status(201).json(createdBookshelf);
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
};

exports.findById = async function (req, res) {
  try {
    const { id } = req.params;
    const bookshelf = await Bookshelf.findById(id);
    if (!bookshelf) {
      return res.status(404).json({ message: 'Bookshelf not found.' });
    }
    return res.json(bookshelf);
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
};

exports.searchByName = async function (req, res) {
  const render = req.query.render === "true";
  try {
    const { name } = req.params;
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;

    const bookshelves = await Bookshelf.searchByName(name, page, limit);
    if (render) {
      return res.render('includes/display/shelf_display', { bookshelves });
    }

    return res.json(series); 
  } catch (e) {
    const message = 'Error when searching series by name.';
    if (render) {
      return res.render('404', { number: 400, message });
    }
    return res.status(400).json({ error: e, message: message });
  }
};

exports.addBook = async function (req, res) {
  try {
    const { bookshelf_id, book_id } = req.body;
    const updatedBookshelf = await Bookshelf.addBook(bookshelf_id, book_id);
    return res.json(updatedBookshelf);
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
};

exports.removeBook = async function (req, res) {
  try {
    const { bookshelf_id, book_id } = req.body;
    const updatedBookshelf = await Bookshelf.removeBook(bookshelf_id, book_id);
    return res.json(updatedBookshelf);
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
};

exports.deleteBookshelf = async function (req, res) {
  try {
    const { id } = req.params;
    const deletedBookshelf = await Bookshelf.deleteBookshelf(id);
    return res.json(deletedBookshelf);
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
};

exports.saveBookshelf = async function (req, res) {
  try {
    const { user_id, bookshelf_id } = req.body;
    await Bookshelf.saveBookshelf(user_id, bookshelf_id);
    return res.status(200).json({ message: 'Bookshelf saved successfully.' });
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
};

exports.findByOwner = async function (req, res) {
  const render = req.query.render === "true";
  const ownProfile = req.query.ownProfile === "true";
  try {
    const { owner } = req.params;
    const bookshelves = await Bookshelf.findByOwner(owner);

    if (render) {
      return res.render('includes/display/shelf_display', { bookshelves, ownProfile });
    }

    res.json(bookshelves);
  } catch (e) {
    const message = 'Error when loading bookshelves from owner.';
    if (render) {
      return res.render('404', { number: 400, message });
    }
    return res.status(400).json({ error: e, message: message });
  }
}

exports.getBooks = async function (req, res) {
  try {
    const { id } = req.params;
    const books = await Bookshelf.getBooks(id);
    res.json(books);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}

exports.getBookshelvesInfo = async function (req, res) {
  try {
    const { bookshelf_ids } = req.body;
    const bookshelves = await Bookshelf.getBookshelvesInfo(bookshelf_ids);
    res.json(bookshelves);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}