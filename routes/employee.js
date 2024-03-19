const express = require("express");
const router = express.Router();
const Employee = require("../models/employee.js");
const { isAuthenticated } = require("../middleware.js");

router.route("/new").get((req, res) => {
    res.render("newEmployee.ejs");
});



router
    .route("/")
    .get(isAuthenticated, async (req, res) => {
        try {
            // Fetching only the employees created by the currently logged-in user
            let employeeData = await Employee.find({ owner: req.user._id });
            res.render("employees.ejs", { employeeData });
        } catch (err) {
            console.error("Error fetching employee data:", err);
            req.flash("error", "Error fetching employee data");
            res.redirect("/employee");
        }
    })
    .post(async (req, res) => {
        let { name, email, mobile, designation, image, course, gender } = req.body;

        try {
            const newEmployee = new Employee({ name, email, mobile, designation, image, course, gender });
            newEmployee.owner = req.user._id;
            await newEmployee.save();
            req.flash("success", "Employee created successfully");
            res.redirect("/employee");
        } catch (err) {
            console.error("Error creating Employee:", err);
            req.flash("error", "Error creating Employee");
            res.redirect("/employee");
        }
    });

router.route("/search").get(async (req, res) => {
    let SearchEmployeeData = await Employee.find({ name: req.query.name, owner: req.user._id });
    if (SearchEmployeeData.length > 0) {
        res.render("employees.ejs", { employeeData: SearchEmployeeData });
    } else {
        req.flash("error", "Search value not fond");
        res.redirect("/employee");
    }
});

router
    .route("/:id")
    .get(async (req, res) => {
        let employeeData = await Employee.findById(req.params.id);
        res.render("editEmployee.ejs", { employeeData });
    })
    .put(async (req, res) => {
        await Employee.findByIdAndUpdate(req.params.id, {
            ...req.body,
        });

        req.flash("success", "Edit Successfully");
        res.redirect("/employee");
    })
    .delete(async (req, res) => {
        await Employee.findByIdAndDelete(req.params.id);

        req.flash("success", "Delete Successfully");
        res.redirect("/employee");
    });


    module.exports = router;