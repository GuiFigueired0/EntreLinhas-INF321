exports.index = async(req, res) => {
  res.render('index');
};

exports.db_playground = async(req, res) => {
    res.render('db_playground');
};

exports.list = async(req, res) => {
    res.render('list');
};
  
exports.book = async(req, res) => {
  res.render('book');
};

exports.profile = async(req, res) => {
  res.render('profile');
};

exports.list_group = async(req, res) => {
  res.render('list_group');
};