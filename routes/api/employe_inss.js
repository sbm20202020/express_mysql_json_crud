const express = require("express");
const uuid = require("uuid");
const router = express.Router();
const connection = require("../../middleware/mysql_connection");

// const members = require("../../data_members");
//Get all employees
router.get("/", (req, res) => {
  connection.query("SELECT * FROM employees ", (err, employees, fields) => {
    if (err) throw err;
    res.json(employees);
  });
});

//Get single member
router.get("/:id", (req, res) => {
  connection.query(
    `SELECT * FROM employees where employee_id = ${req.params.id}`,
    (err, employee, fields) => {
      if (err) {
        throw err;
      }
      if (employee.length === 0) {
        return res.status(400).json({
          message: `No employee found with id ${req.params.id}`,
          data: employee,
        });
      }
      return res.json(employee[0]);
    }
  );
});

//Create member
router.post("/", (req, res) => {
  const Employee = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    phone_number: req.body.phone_number,
    hire_date: req.body.hire_date,
    job_id: req.body.job_id,
    salary: req.body.salary,
    manager_id: req.body.manager_id,
    department_id: req.body.department_id,
  };
  connection.query(
    `INSERT INTO employees
    (first_name, last_name, email, phone_number, hire_date, job_id, salary, manager_id, department_id)
    VALUES ('${Employee.first_name}', '${Employee.last_name}', '${Employee.email}', '${Employee.phone_number}', '${Employee.hire_date}', '${Employee.job_id}', '${Employee.salary}', '${Employee.manager_id}', '${Employee.department_id}');`,
    (err, employee, fields) => {
      if (err) {
        return res.status(400).json({
          message: "Un probleme est survenu !",
          error_code: 893342,
        });
      } else {
        return res
          .status(200)
          .json({ message: "Data inserted successfully", code: 1 });
      }
    }
  );
});

//Update member
router.put("/:id", (req, res) => {
  //   const found = members.some((member) => member.id === parseInt(req.params.id));
  connection.query(
    `select * from employees where employee_id=${req.params.id}`,
    (err, employee) => {
      if (err) throw err;
      if (employee.length === 0) {
        return res.status(400).json({ message: "Employe not found" });
      }
      const Employee = {
        first_name: req.body.first_name
          ? req.body.first_name
          : employee[0].first_name,
        last_name: req.body.last_name
          ? req.body.last_name
          : employee[0].last_name,
        email: req.body.email ? req.body.email : employee[0].email,
        phone_number: req.body.phone_number
          ? req.body.phone_number
          : employee[0].phone_number,
        hire_date: req.body.hire_date
          ? req.body.hire_date
          : employee[0].hire_date,
        job_id: req.body.job_id ? req.body.job_id : employee[0].job_id,
        salary: req.body.salary ? req.body.salary : employee[0].salary,
        manager_id: req.body.manager_id
          ? req.body.manager_id
          : employee[0].manager_id,
        department_id: req.body.department_id
          ? req.body.department_id
          : employee[0].department_id,
      };
      console.log(Employee.hire_date);
      console.log("--------------------------");
      console.log(req.body.hire_date);
      connection.query(
        `UPDATE employees SET 
        first_name ='${Employee.first_name}', last_name='${Employee.last_name}', 
        email='${Employee.email}', phone_number='${Employee.phone_number}', 
        hire_date='${Employee.hire_date}', job_id='${Employee.job_id}', 
        salary='${Employee.salary}', manager_id='${Employee.manager_id}', 
        department_id='${Employee.department_id}' where employee_id='${employee[0].employee_id}'`,
        (err, employee, fields) => {
          if (err) {
            throw err;
          }
          if (employee.changedRows !== 0) {
            return res.status(200).json({
              message: "Data updated successfully",
              code_if_change: 1,
            });
          } else {
            return res.status(200).json({
              message: "No change in request",
              code_if_change: 0,
            });
          }
        }
      );
    }
  );
});

//Delete member
router.delete("/:id", (req, res) => {
  connection.query(
    `select employee_id from employees where employee_id=${req.params.id}`,
    (err, result) => {
      if (err) {
        return res.status(400);
      }
      if (result.length === 0) {
        return res.status(400).json({ message: "Employe Not found" });
      }
      connection.query(
        `delete from employees where employee_id=${result[0].employee_id}`,
        (err, data) => {
          if (err) {
            return res.status(400);
          }
          res.status(200).json({ success: "ok", data: data });
        }
      );
    }
  );
  //   const member = members.filter(
  //     (member) => member.id === parseInt(req.params.id)
  //   );
  //   if (member[0]) {
  //     res.json({ msd: "member deleted", members: members });
  //   } else {
  //     res
  //       .status(400)
  //       .json({ message: `No member found with id ${req.params.id}` });
});

module.exports = router;
