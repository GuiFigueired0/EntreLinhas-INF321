const user = '67976b7e78e23443e48e341a';

exports.index = async(req, res) => {
  res.render('index');
};

exports.db_playground = async(req, res) => {
  res.render('db_playground', { user });
};

exports.list = async(req, res) => {
  res.render('list');
};
  
exports.book = async(req, res) => {
  res.render('book');
};

exports.profile = async(req, res) => {
  res.render('profile', { user });
};

exports.list_group = async(req, res) => {
  res.render('list_group');
};