let express = require('express');
let bodyParser = require('body-parser');
let cors = require('cors');
let app = express();
let router = express.Router();
app.use(cors());

// all of our routes will be prefixed with /api
app.use('/api',bodyParser.json(), router)   //[Use json]
app.use('/api',bodyParser.urlencoded({ extended: false}),router);

let staffs = [
                  {'id':1,'name': 'Jakkapan' ,'surname':'Pandang' ,'age':'24' , 'position':'Network Architecture' ,'tel':'095-220-6692'},
                  {'id':2,'name': 'Sarawut','surname':'Janpan'  ,'age':'25' ,'position':'IT Support' ,'tel':'064-028-0547'}
               ];

//router.route('/staffs').get((req, res) =>  res.json(staffs) );               
router.route('/staffs')     
               .get((req,res) => res.json(staffs))

               .post((req,res)=>{
                   let staff = {}
                   staff.id = staffs[staffs.length-1].no+1
                   staff.name = req.body.name
                   staff.surname = req.body.surname
                   staff.age = req.body.age
                   staff.position = req.body.position
                   staff.tel = req.body.tel
                   staffs.push(staff)
                   res.json({message: 'Staff Created!'})
               });
router.route('/staffs/:staff_id')
               .get((req,res)=>{
                   let id = req.params.staff_id
                   let index = staffs.findIndex(staff =>(staff.id === +id))
                   res.json(staffs[index])
               })
               //update a staff
               .put((req,res)=>{
                   let id = req.params.staff_id
                   let index = staffs.findIndex(staff =>(staff.id === +id))
                   staffs[index].id = req.body.id;
                   staffs[index].name = req.body.name;
                   staffs[index].surname = req.body.surname;
                   staffs[index].Major = req.body.Major;
                   staffs[index].GPA = req.body.GPA;
                   res.json({message: 'Staff updated!'+ req.params.staff_id});
               })
               //delete a staffs
               .delete((req,res)=>{
                   // delete     staffs[req.params.staff_id]
                   let id = req.params.staff_id
                   let index = staffs.findIndex(staff =>(staff.id === +id))
                   staffs.splice(index,1)
                   res.json({message: 'Staff deleted!'+ req.params.staff_id});
               })

app.use("*", (req, res) => res.status(404).send('404 Not found'));
app.listen(80, ()=>{console.log('Server is runing!!!')})