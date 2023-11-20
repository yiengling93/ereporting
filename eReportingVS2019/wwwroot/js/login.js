$("#btnLogin").click(function () {
    var sUserid = $("#txtLoginUser").val();

    var data = {
        "userid": sUserid
    }

    $.ajax({
        type: "GET",
        data: data,
        url: "/HomeController/retrieveUser",

        success: function (result) {
            console.log(result);
            if (result.success) {
                document.cookie = "userid=" + sUserid + "; max-age=3600; path=/";
                window.location.href = '/Home/ReportPolis';
            } else {
                Swal.fire({
                    icon: 'error',
                    text: 'Failed to retrieve user  info.',
                })
            }
        }
    });
});