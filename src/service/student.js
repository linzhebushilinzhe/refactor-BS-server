var student = require('../model/student')
var sequelize = require('../../config/sequelize.config')
var Sequelize = require('sequelize')
var Op = Sequelize.Op
class StudentService{
    async findAll(){
        let result
        try {
            result = await student.findAll()
        } catch(error){
            console.log('error-->',error)
            return error
        }
        return result
    }

    async create({stuID,stuName,stuAge,stuGender, classgradeId}){
        if(stuID && stuName && stuAge && stuGender　&& classgradeId){
            let result
            try { 
                result = await student.create({stuID,stuName,stuAge,stuGender, classgradeId})
            } catch(error){
                return error
            }
            return result
        }
    }

    async find({id,stuID,stuName,stuAge,stuGender,userId, classgradeId}){
        let result
        if(id || stuID || stuName || stuAge || stuGender || userId || classgradeId){
            id = id || ''
            stuID = stuID || ''
            stuName = stuName || ''
            stuAge = stuAge || ''
            stuGender = stuGender || ''
            userId = userId || ''
            try {
                const params = {
                    id: {[Op.like]: `%${id}%`},
                    stuID: {[Op.like]: `%${stuID}%`},
                    stuName: {[Op.like]: `%${stuName}%`},
                    stuAge: {[Op.like]: `%${stuAge}%`},
                    stuGender: {[Op.like]: `%${stuGender}%`},
                    userId: {[Op.like]: `%${userId}%`},
                    classgradeId: {[Op.like]: `%${classgradeId}%`}
                }
                result = await student.findAll({
                    where: params
                })
            } catch (error) {
                return error
            }
            return result
        }
    }

    async update({id,stuID,stuName,stuAge,stuGender, classgradeId}){
        let result
        try {
            result = await student.update({
                stuID,stuName,stuAge,stuGender, classgradeId
            },
            {
                where: {id}
            })
        } catch (error) {   
            return error
        }
        return result
    }

    async deleteById({id}){
        let result 
        try {
            result = await student.destroy({
                where: {
                    id
                }
            })
        } catch (error) {
            console.log('error--',error)
            return error
        }
        return result
    }
}

// 单例模式
let service;
module.exports = async function () {
  if (!service) {
    service = new StudentService();
  }
  return service;
};