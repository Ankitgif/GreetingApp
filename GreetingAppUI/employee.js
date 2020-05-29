//jquery ajax() method makes asynchronous communication between the client and server over HTTP
$.ajax({
    url: 'data.json', //URL parameter specifies the url to which the HTTP request should be sent
    dataType: 'json', //the dataType is the expected datatype of the server response
    success: function (data) {  //the success parameter contains the function to be called once the AJAX request is successfully completed
        for (let i = 0; i < data.length; i++) {
            let row = $('<tr><td>' + data[i].firstname + '</td><td>'
                + data[i].lastname + '</td><td>'
                + data[i].email + '</td><td>' + "<button class=" + "addbtn" + ">" + '<img src = ' + data[i].edit + '>'
                + "</button>" + '</td><td>' + "<button class=" + "addbtn" + ">" + '<img src = ' + data[i].delete + '>'
                + "</button>" + '</td></tr>');
            $('.table').append(row);
        }
    },
    error: function (jqXHR, textStatus, errorThrown) { //the error parameter contains the function to be executed when the server request fails
        console.log('Error: ' + textStatus + ' - ' + errorThrown);          //textStatus - contains the status of the call
        //xhr - contains the XMLHttpRequest object
    }
});