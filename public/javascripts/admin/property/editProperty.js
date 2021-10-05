$(document).ready(() => {
  const removedOtherPictures = new Set();
  $(".galleryPics").on("click", (e) => {
    const id = `gallery-${e.target.id}`;
    document.getElementById(id).classList.add("fadeout");
    setTimeout(() => {
      document.getElementById(id).classList.add("d-none");
    }, 2500);
    removedOtherPictures.add(e.target.id);
  });
  $("#editProperty").on("click", (event) => {
    event.preventDefault();
    let formData = new FormData();
    let facilityIDs = "";
    $("input[type='checkbox']:checked").each(function () {
      let id = $(this).attr("id").split("-")[1];
      facilityIDs += `${id}-`;
    });
    if ($("#mainPictureNew")[0].files[0]) {
      removedOtherPictures.add($(".mainPicture")[0].id);
      formData.append("mainPicture", $("#mainPictureNew")[0].files[0]);
    }
    const totalfiles = document.getElementById("otherPictures").files.length;
    if (totalfiles > 0) {
      for (let index = 0; index < totalfiles; index++) {
        formData.append(
          "otherPictures",
          document.getElementById("otherPictures").files[index]
        );
      }
    }
    formData.append("id", $("#propertyID").val());
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
    formData.append("status", $("#propertyStatus").val());
    formData.append("category", $("#propertyType").val());
    formData.append("facilityIDs", facilityIDs);
    formData.append("removePictures", [...removedOtherPictures]);
    $.ajax({
      type: "put",
      url: "/admin/properties/edit",
      data: formData,
      enctype: "multipart/form-data",
      processData: false,
      contentType: false,
      success: function (response) {
        Swal.fire({
          icon: "success",
          title: "ملک مورد نظر با موفقیت ویرایش شد.",
          showConfirmButton: false,
          timer: 3000,
        });
        setTimeout(() => {
          window.location.href = "/admin/properties";
        }, 3000);
      },
      error: function (err) {
        console.log(err);
      },
    });
  });
});
