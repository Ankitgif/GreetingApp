//jquery ajax() method makes asynchronous communication between the client and server over HTTP
$.ajax({
    url: 'data.json', //URL parameter specifies the url to which the HTTP request should be sent
    dataType: 'json', //the dataType is the expected datatype of the server response
    success: function (data) {  //the success parameter contains the function to be called once the AJAX request is successfully completed
        for (let i = 0; i < data.length; i++) {
            let row = $('<tr><td>' + data[i].firstname + '</td><td>'
                + data[i].lastname + '</td><td>'
                + data[i].email + '</td><td>'
                + data[i].edit + '</td><td>'
                + data[i].delete + '</td></tr>');
            $('.table').append(row);
        }
    },
    error: function (jqXHR, textStatus, errorThrown) { //the error parameter contains the function to be executed when the server request fails
        console.log('Error: ' + textStatus + ' - ' + errorThrown);          //textStatus - contains the status of the call
                                                                            //xhr - contains the XMLHttpRequest object
    }
});

// $(document).ready(function () {
//     $.getJSON("data.json", function (data) {
//         let employee_data = '';
//         $.each(data, function (key, value) {
//             employee_data += '<tr>';
//             employee_data += '<td>' + value.firstname + '</td>';
//             employee_data += '<td>' + value.lastname + '</td>';
//             employee_data += '<td>' + value.email + '</td>';
//             employee_data += '<td>' + value.edit + '</td>';
//             employee_data += '<td>' + value.delete + '</td>';
//             employee_data += '</tr>';
//         });
//         $('#employee_table').append(employee_data);
//     });
// });