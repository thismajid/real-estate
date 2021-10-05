$(document).ready(() => {
  $(".editFacility").click(async (e) => {
    const id = e.target.id.split("-")[1];
    await $.ajax({
      type: "post",
      url: "/admin/properties/facility/getOne",
      data: {
        id,
      },
      success: function (response) {
        console.log(response);
        $("#editFacilityByModal").html(`<form>
        <div class="form-group">
          <label for="name" class="col-form-label"
            >عنوان امکانات:</label
          >
          <input type="text" class="form-control" id="editFacilityName" name="name" value="${response.facility.name}" />
        </div>
        <div class="form-group">
          <label for="description" class="col-form-label"
            >توضیحات امکانات:</label
          >
          <textarea class="form-control" id="editFacilityDescription" name="description" value="">${response.facility.description}</textarea>
        </div>
      </form>`);
        $("#submitBTN").click(async () => {
          const name = $("#editFacilityName").val();
          const description = $("#editFacilityDescription").val();
          if (name) {
            $.ajax({
              type: "put",
              url: "/admin/properties/facility",
              data: {
                id,
                name,
                description,
              },
              success: function (response) {
                Swal.fire({
                  icon: "success",
                  title: "امکان مورد نظر با موفقیت ویرایش شد.",
                  showConfirmButton: false,
                  timer: 3000,
                });
                setTimeout(() => {
                  location.reload();
                }, 3000);
              },
              error: (err) => {
                console.log(err);
              },
            });
          }
        });
      },
    });
  });
});
