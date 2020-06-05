$(document).ready(function () {
    
    getEmployee();

    $("#addemp").on("click", function (e) {
        $("#newForm").toggle();
    });

    function getEmployee() {
        $('#employeeBody').html('');
        $.ajax({
            url: 'http://localhost:3000/employees',             //onclick="window.location.href='updateform.html/';"
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

    function getOneEmployee(id){
        $.ajax({
            method: 'GET',
            url: 'http://localhost:3000/employees/' + id,
            dataType:'json',
            success: function(data){
                
                // $($("#updateForm")[0].updateid).val(data.id);              
                // $($("#updateForm")[0].updatefname).val(data.fname);
                // $($("#updateForm")[0].updatelname).val(data.lname);
                // $($("#updateForm")[0].updateemail).val(data.email);
            // var tr = $(this).closest('tr');
            // var id = $(tr).find('td:eq(0)').text();
            // var fname = $(tr).find('td:eq(1)').text();
            // var lname = $(tr).find('td:eq(2)').text();
            // var email = $(tr).find('td:eq(3)').text();

            // $('input[name="upid"]').val(id);
            // $('input[name="upfname"]').val(fname);
            // $('input[name="uplname"]').val(lname);
            // $('input[name="upemail"]').val(email);
                $("#updateid").val(data.id);              
                $("#updatefname").val(data.fname);
                $("#updatelname").val(data.lname);
                $("#updateemail").val(data.email);
                getEmployee();
            
            }
        }); 
    }



    $("#submitData").on("click", function (e) {
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

        $(document).on('click','.editbtn',function(){
          //  $("#newForm").toggle();
           // var tr = $(this).closest('tr');
           getOneEmployee($($(this)[0]).data("id"));
           window.location.href="updateform.html";
            // var id = $(tr).find('td:eq(0)').text();
            // var fname = $(tr).find('td:eq(1)').text();
            // var lname = $(tr).find('td:eq(2)').text();
            // var email = $(tr).find('td:eq(3)').text();

            // $('input[name="Id"]').val(id);
            // $('input[name="Fname"]').val(fname);
            // $('input[name="Lname"]').val(lname);
            // $('input[name="Email"]').val(email);
            
        });

        $(".deletebtn").click(function (e) {
            //    console.log("ankit");
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
                alert("Employee Updated Successfully");
            }
        });
    }


    $("#updateEmployee").on("click", function (e) {
        let data = {
            id: $("#updateid").val(),
            firstname: $("#updatefname").val(),
            lastname: $("#updatelname").val(),
            email: $("#updateemail").val(),
        }
        putEmployee($("#updateid").val(),data);
      //  $("#updateForm").trigger("reset");
        e.preventDefault();
        document.forms[0].reset();

    
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


});
