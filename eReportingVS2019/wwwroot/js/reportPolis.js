$(document).ready(function () {
    var ck = getCookies("userid");
    console.log(ck);
    $("#txtRUserid").val(ck);

    var data = {
        "userid": ck
    }

    var userinfo;

    $.ajax({
        type: "GET",
        data: data,
        url: "/HomeController/retrieveUser",

        success: function (result) {
            console.log(result);
            if (result.success) {
                userinfo = result.data;
                $("#txtRUsername").val(userinfo.username);
                $("#txtRGender").val(userinfo.gender);
                $("#txtRAddress").val(userinfo.address);
                $("#txtRTel").text(userinfo.telno);

                $("#lblKP").html(ck);
                $("#lblName").html(userinfo.username);
                if (userinfo.gender == "M") {
                    $("#lblGender").html("Male");
                } else {
                    $("#lblGender").html("Female");
                }
                
                $("#lblAlamatTempat").html(userinfo.address);
                $("#lblTelNo").text(userinfo.telno);
            
            } else {
                Swal.fire({
                    icon: 'error',
                    text: 'Failed to retrieve user  info.',
                })
            }
        }
    });

});
   

function getCookies(cookieName) {
    let cookie = {};
    document.cookie.split(';').forEach(function (el) {
        let [key, value] = el.split('=');
        cookie[key.trim()] = value;
    })
    return cookie[cookieName];
}

//Date picker
$('#reservationdate').datetimepicker({
    format: 'L'
});

//Date and time picker
$('#reservationdatetime').datetimepicker({ icons: { time: 'far fa-clock' } });

//Date range picker with time picker
$('#reservationtime').daterangepicker({
    timePicker: true,
    timePickerIncrement: 30,
    locale: {
        format: 'MM/DD/YYYY hh:mm A'
    }
})

$("#txtJalan").focusout(function () {
    var value = $(this).val();
    $("#lblAlamat").text(value);
    $("#lblAlamat1").text(value);
});

$("#cbPlace").change(function () {
    var value = $("#cbPlace").val();
    $("#lblPlace").text(value);
    $("#lblPlace1").text(value);
});

$("#reservationtime").change(function () {
    var value = $("#reservationtime").val();
    var sValue = value.split('-');

    var startDateTime = new Date(sValue[0]);
    var startDate = startDateTime.toLocaleDateString("en-GB");
    var startTime = startDateTime.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

    var endDateTime = new Date(sValue[1]);
    var endDate = endDateTime.toLocaleDateString("en-GB");
    var endTime = endDateTime.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

    $("#lblDate").text(startDate + " Hingga " + endDate);
    $("#lblTime").text(startTime + " Hingga " + endTime);
    $("#lblDate1").text(startDate + " Hingga " + endDate);
    $("#lblTime1").text(startTime + " Hingga " + endTime);
});

$("#btnPrintRpt").click(function () {
    window.open('/Home/PrintReport');
});