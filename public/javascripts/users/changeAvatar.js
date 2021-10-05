$(document).ready(() => {
  $("#submitBTN").click(() => {
    console.log(23222);
    let formData = new FormData();
    formData.append("id", $(".userID")[0].id.split("-")[1]);
    formData.append("avatar", $("#avatar")[0].files[0]);

    $.ajax({
      type: "put",
      url: "/users/avatar",
      data: formData,
      enctype: "multipart/form-data",
      processData: false,
      contentType: false,
      success: function () {
        Swal.fire({
          icon: "success",
          title: "عکس حساب کاربری شما با موفقیت تغییر کرد.",
        });
        setTimeout(() => {
          window.location.href = "/";
        }, 3000);
      },
    });
  });
});
