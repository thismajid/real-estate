$(document).ready(() => {
  let status;

  $(".settingsStatus li").click(function () {
    status = $(this)[0].id.split("-")[1];
  });

  $("#mainSettingBTN").on("click", () => {
    let formData = new FormData();
    formData.append("headerLogo", $("#headerLogo")[0].files[0]);
    formData.append("footerLogo", $("#footerLogo")[0].files[0]);
    formData.append("title", $("#titleInput").val());
    formData.append("topTitle", $("#topTitleInput").val());
    formData.append("middleTitle", $("#middleTitleInput").val());
    formData.append("middleDesc", $("#middleDescInput").val());
    formData.append("bottomTitle", $("#bottomTitleInput").val());
    formData.append("bottomDesc", $("#bottomDescInput").val());
    formData.append("status", status);
    formData.append("footerText", $("#footerText").val());
    if (formData) {
      $.ajax({
        type: "post",
        url: "/admin/settings/main",
        data: formData,
        enctype: "multipart/form-data",
        processData: false,
        contentType: false,
        success: function (response) {
          Swal.fire({
            icon: "success",
            title: "تغییرات با موفقیت اعمال شد.",
          });
          setTimeout(() => {
            location.reload();
          }, 3000);
        },
      });
    }
  });
});
