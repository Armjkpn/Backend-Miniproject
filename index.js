let express = require('express');
let bodyParser = require('body-parser');
let router = express.Router();
let cors = require('cors');
let app = express();
app.use(cors());

// all of our routes will be prefixed with /api
app.use('/api', bodyParser.json(), router);   //[use json]
app.use('/api', bodyParser.urlencoded({ extended: false }), router);

let employees = [
                    {'no':1,'name': 'Jakkapan' ,'surname':'Pandang' ,'age':'24' , 'position':'Network Architecture' ,'tel':'095-220-6692'},
                    {'no':2,'name': 'Sarawut','surname':'Janpan'  ,'age':'25' ,'position':'IT Support' ,'tel':'064-028-0547'}
                ];
router.route('/employees')
    // get all employees
    .get((req, res) => res.json(employees))
    // insert a new employee
    .post((req, res) => {
    var employee = {};
    employee.no = employees.length > 0 ? employees[employees.length - 1].no + 1 : 0;
    employee.name = req.body.name
    employee.surname = req.body.surname
    employee.age = req.body.age
    employee.position = req.body.position
    employee.tel = req.body.tel
    employees.push(employee);
    res.json({ message: 'employees created!' })
    })
router.route('/employees/:employee_no')
    .get((req, res) => {
        let no = req.params.employee_no
        let index = employees.findIndex(employee => (employee.no === +no))
        res.json(employees[index])                
    })
    .put((req, res) => {                           
        let no = req.params.employee_no
        let index = employees.findIndex(employee => (employee.no === +no))
        employees[index].name = req.body.name;
        employees[index].surname = req.body.surname;
        employees[index].age = req.body.age;
        employees[index].position = req.body.position;
        employees[index].tel = req.body.tel;
        res.json({ message: 'employee updated!' + req.params.employee_no });
    })
    .delete((req, res) => {                  
        let no = req.params.employee_no
        let index = employees.findIndex(employee => employee.no === +no)
        employees.splice(index, 1)
        res.json({ message: 'employee deleted: ' + req.params.employee_no });
    })


app.use("*", (req, res) => res.status(404).send('404 Not found'));
app.listen(80, () => console.log("Server is running"));
