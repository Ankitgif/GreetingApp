$(document).ready(function () {
    $("#newForm").hide();
    $("#updateEmployee").hide();
    getEmployee();

    $("#addemp").on("click", function (e) {
        $("#newForm").toggle();
    });

    function getEmployee() {
        $('#employeeBody').html('');
        $.ajax({
            url: 'http://localhost:3000/employees',
            method: 'GET',
            dataType: 'json',
            data: {
                test: 'test data'
            },
            success: function (data) {
                $(data).each(function (key, value) {
                    let tabledata = "<tr><td>" + value.id + "</td>"
                        + "<td>" + value.firstname + "</td>"
                        + "<td>" + value.lastname + "</td>"
                        + "<td>" + value.email + "</td>"
                        + "<td>" + `<button class="editbtn"  data-id="` + value.id + `"><img class="img-png" src="assets/edit.png"></button>` + "</td>"
                        + "<td>" + `<button class="deletebtn" data-id="` + value.id + `"><img class="img-png" src="assets/delete.png"></button>` + "</td></tr>";
                    $(tabledata).appendTo("#employeeBody");
                });

                loadButtons();
            }
        });
    }

    function getOneEmployee(id) {
        $.ajax({
            method: 'GET',
            url: 'http://localhost:3000/employees/' + id,
            dataType: 'json',
            success: function (data) {

                $($("#newForm")[0].id).val(data.id);
                $($("#newForm")[0].fname).val(data.firstname);
                $($("#newForm")[0].lname).val(data.lastname);
                $($("#newForm")[0].email).val(data.email);
                getEmployee();

            }
        });
    }

    $("#submitData").on("click", function (e) {
        if (validate() == true) {
            let data = {
                id: $($("#newForm")[0].id).val(),
                firstname: $($("#newForm")[0].fname).val(),
                lastname: $($("#newForm")[0].lname).val(),
                email: $($("#newForm")[0].email).val(),
            }

            postEmployee(data);
            $("#newForm").trigger("reset");
            $("#newForm").toggle();
            e.preventDefault();
        } else {
            alert("Data cannot be submitted")
            e.preventDefault();
        }

    });

    function postEmployee(data) {
        $.ajax({
            url: 'http://localhost:3000/employees/',
            method: 'POST',
            dataType: 'json',
            data: data,
            success: function (data) {
                console.log(data);
                getEmployee();
                alert("Employee Added Successfully")
            }
        });
    }

    function loadButtons() {

        $(document).on('click', '.editbtn', function () {
            getOneEmployee($($(this)[0]).data("id"));
            $("#newForm").show();
            $("#updateEmployee").show();
            $("#submitData").hide();
        });

        $(".deletebtn").click(function (e) {
            deleteEmployee($($(this)[0]).data("id"));
            e.preventDefault();
        });
    }

    function putEmployee(id, data) {
        $.ajax({
            url: 'http://localhost:3000/employees/' + id,
            method: 'PUT',
            dataType: 'json',
            data: data,
            success: function (data) {
                console.log(data);
                getEmployee();
            }
        });
    }

    $("#updateEmployee").on("click", function (e) {
        if (validate() == true) {
            let data = {
                id: $("#id").val(),
                firstname: $("#fname").val(),
                lastname: $("#lname").val(),
                email: $("#email").val(),
            }
            putEmployee($("#id").val(), data);
            $("#newForm").trigger("reset");
            $("#newForm").toggle();
            e.preventDefault();
        }
        else {
            alert("Data cannot be updated");
            e.preventDefault();
        }

    });

    function deleteEmployee(id) {
        $.ajax({
            url: 'http://localhost:3000/employees/' + id,
            method: 'DELETE',
            dataType: 'json',
            success: function (data) {
                console.log(data);
                alert("Employee Deleted Successfully");
                getEmployee();
            }

        });
    }

    function validate() {
        let firstName = document.getElementById("fname").value;
        let firstNameREGEX = /^[A-Z]{1}[a-z]{3,}$/;
        let firstNameResult = firstNameREGEX.test(firstName);

        let lastName = document.getElementById("lname").value;
        let lastNameREGEX = /^[A-Z]{1}[a-z]{3,}$/;
        let lastNameResult = lastNameREGEX.test(lastName);

        let Email = document.getElementById("email").value;
        let emailREGEX = /^[a-z]{3,}(|[.]?[0-9a-zA-Z]+)([@])([a-z0-9]+)([.|+|_][a-z]{2,4})(|[.][a-zA-Z]{2})$/;
        let emailResult = emailREGEX.test(Email);


        if (document.myForm.id.value == "") {
            alert("Please provide your id!");
            document.myForm.id.focus();
            return false;
        }
        if (firstNameResult == false) {
            alert("Please provide your first name should be starting with capital letter and maximum character should be more than 3!");
            document.myForm.fname.focus();
            return false;
        }
        if (lastNameResult == false) {
            alert("Please provide your last name should be starting with capital letter and maximum character should be more than 3!");
            document.myForm.lname.focus();
            return false;
        }
        if (emailResult == false) {
            alert("Please provide your Email!");
            document.myForm.email.focus();
            return false;
        }
        return (true);
    }
});
