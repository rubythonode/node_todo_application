const Todo = require('../../models/todo');
const date = require('../../utils/date');
const mongoose = require('mongoose');

/*
  [오류처리]

  status: failure
    error: 0, message: '해야할 일이 비어있습니다.'
    error: 1, message: '존재하지 않은 할일이예요!'
    error: '2', message: '마지막 데이터예요!'

  status: success
    message: '추가되었어요!'
    message: '삭제되었어요!'
*/
exports.todo_list = (req, res) => {
  Todo.find().limit(10).sort({"_id": -1}).exec((err, todo) => {
    if(err) return res.status(500).send({error: 'database failure'});
    res.render('todo', {
      todo
    });
  })
}

exports.todo_list_query = (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        res.render('error');
    }

    Todo.findById(id).then((todo) => {
      if(!todo) {
        res.render('notfound');
        return;
      } else {
        res.render('todolist', {
          todo
        });
      }
    })
}

exports.todo_create = (req, res) => {
  const { text } = req.body;

  // 유효성 검사

  if(text == '') {
    return res.status(404).json({
      status: 'failure',
      error: '0',
      message: '해야할 일이 비어있습니다.'
    });
  }

  // 모델
  const todo = new Todo({
    text,
    date: date()
  });


  todo.save()
  .then((result) => {
    return res.status(200).json({
      status: 'success',
      message: '추가되었어요!',
      result
    })
  })


}

exports.todo_remove = (req, res) => {
  const { id } = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)) {
      res.render('error');
  }

  Todo.findByIdAndRemove(id).then((todo) => {
    if(todo) {
      return res.status(200).json({
        status: 'success',
        message: '삭제되었어요!'
      });
    } else {
      return res.status(404).json({
        status: 'failure',
        error: '1',
        message: '존재하지 않은 할일이예요!'
      })
    }
  });
}

exports.todo_update = (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  if(!mongoose.Types.ObjectId.isValid(id)) {
      res.render('error');
  }

  if(text == '') {
    return res.status(404).json({
      status: 'failure',
      error: '0',
      message: '해야할 일이 비어있습니다.'
    });
  }
  //
  // res.json(req.body)
  Todo.findByIdAndUpdate(id, { $set: req.body }, { new: true }).then((todo) => {
    if(!todo) {
      return res.status(404).json({
        status: 'failure',
        error: '1',
        message: '존재하지 않은 할일이예요!'
      })
    }

    return res.status(200).json({
      status: 'success',
      message: '수정되었어요!',
      todo
    });
  });
}

exports.todo_completed = (req, res) => {
  const { id } = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)) {
      res.render('error');
  }


  Todo.findById(id, (err, todo) => {
    if(!todo) {
      return res.status(404).json({
        status: 'failure',
        error: '1',
        message: '존재하지 않은 할일이예요!'
      })
    }

    todo.text = todo.text;
    todo.date = todo.date;
    todo.completed = !todo.completed;

    todo.save((err, todo) => {
      if(err) res.status(500).json(err);
      return res.status(200).json({
        status: 'success',
        message: '변경되었어요!',
        todo
      });
    })
  })
}


exports.todo_more = (req, res) => {
  const { id } = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)) {
      res.render('error');
  }

  Todo.find({ "_id": { $lt: id }}).sort({"_id": -1}).limit(5).then((todo) => {
    if(todo.length < 5) {
      return res.status(404).json({
        status: 'failure',
        error: '2',
        message: '마지막 데이터예요!'
      })
      return;
    }
    res.json({
      status: 'success',
      message: '가져왔어요!',
      todo
    });
  })
}

exports.todo_real = (req, res) => {
  const { id } = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)) {
      res.render('error');
  }
  Todo.find({ "_id": { $gt: id }}).sort({"_id": -1}).limit(3).then((todo) => {
    res.json({
      status: 'success',
      message: '실시간!',
      todo: todo
    });
  })
}
