$("#btnAdd").click(function () {
    $('#submitTnc').modal('show');
});

$("#btnConfirmSubmit").click(function () {
    $('#submitTnc').modal('hide');
    $('#submitQnA').modal('show');
});


$("#btnQnASubmit").click(function () {

    var sUserid = $("#txtUserid").val();
    var sUsername = $("#txtUsername").val();
    var sGender = $("#cbGender").val();
    var sAddress = $("#txtAddress").val();
    var sTelno = $("#txtTelno").val();
    var sGenderDb = "F";

    if (sGender == "Male") {
        sGenderDb = "M";
    }

    var data = {
        "userid": sUserid,
        "username": sUsername,
        "gender": sGenderDb,
        "address": sAddress,
        "telno": sTelno,
    }

    $.ajax({
        type: "POST",
        data: data,
        url: "/HomeController/insertUser",

        success: function (result) {
            if (result.success) {
                Swal.fire({
                    icon: 'info',
                    text: 'Register Successfully.',
                })
                window.location.href = '/Home/ReportPolis';
            } else {
                Swal.fire({
                    icon: 'error',
                    text: 'Failed Register.',
                })
            }
        }
    });
});

