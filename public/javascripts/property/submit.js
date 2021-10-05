$(document).ready(() => {
  let propertyStatus;
  let propertyCategory;
  $(".propertyStatus li").click(function () {
    propertyStatus = $(this)[0].id.split("-")[1];
  });
  $(".propertyType li").click(function () {
    propertyCategory = $(this)[0].id.split("-")[1];
  });
  $("#submitProperty").click((e) => {
    e.preventDefault();
    let facilityIDs = "";
    $("input[type='checkbox']:checked").each(function () {
      console.log($(this).attr("id").split("-")[1]);
      let id = $(this).attr("id").split("-")[1];
      facilityIDs += `${id}-`;
    });
    let formData = new FormData();
    const totalfiles = document.getElementById("otherPictures").files.length;
    formData.append("mainPicture", $("#mainPicture")[0].files[0]);
    for (let index = 0; index < totalfiles; index++) {
      formData.append(
        "otherPictures",
        document.getElementById("otherPictures").files[index]
      );
    }
    formData.append("title", $("#title").val());
    formData.append("description", $("#description").val());
    formData.append("price", $("#price").val());
    formData.append("area", $("#area").val());
    formData.append("bedroom", $("#bedroom").val());
    formData.append("bathroom", $("#bathroom").val());
    formData.append("parking", $("#bathroom").val());
    formData.append("address", $("#parking").val());
    formData.append("city", $("#city").val());
    formData.append("region", $("#region").val());
    formData.append("constructionYear", $("#constructionYear").val());
    formData.append("status", propertyStatus);
    formData.append("category", propertyCategory);
    formData.append("facilityIDs", facilityIDs);

    console.log(formData);

    if (title) {
      $.ajax({
        type: "post",
        url: "/property/submit",
        data: formData,
        enctype: "multipart/form-data",
        processData: false,
        contentType: false,
        success: function (response) {
          Swal.fire({
            icon: "success",
            title: "ملک مورد نظر با موفقیت ثبت شد.",
          });
          setTimeout(() => {
            window.location.href = "/";
          }, 3000);
        },
      });
    }
  });
});
