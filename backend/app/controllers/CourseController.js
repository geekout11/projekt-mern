const CourseModel = require('../models/CourseModel')

module.exports = {

    index: (req, res, next) => {
        CourseModel.find()
          .exec(function (err, result) {
            if (err) {
              return res.status(500).json({
                message: 'Error while fetching Courses',
                error: err,
              })
            }
    
            // console.log(result)
    
            res.json(result);
          })
      },

}