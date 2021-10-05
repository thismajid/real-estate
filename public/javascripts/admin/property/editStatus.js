$(document).ready(() => {
  $(".editStatus").click(async (e) => {
    const id = e.target.id.split("-")[1];
    await $.ajax({
      type: "post",
      url: "/admin/properties/status/getOne",
      data: {
        id,
      },
      success: function (response) {
        $("#editStatusByModal").html(`<form>
        <div class="form-group">
          <label for="name" class="col-form-label"
            >عنوان وضعیت:</label
          >
          <input type="text" class="form-control" id="editStatusName" name="name" value="${response.status.name}" />
        </div>
        <div class="form-group">
          <label for="description" class="col-form-label"
            >توضیحات وضعیت:</label
          >
          <textarea class="form-control" id="editStatusDescription" name="description" value="">${response.status.description}</textarea>
        </div>
      </form>`);
        $("#submitBTN").click(async () => {
          const name = $("#editStatusName").val();
          const description = $("#editStatusDescription").val();
          if (name) {
            $.ajax({
              type: "put",
              url: "/admin/properties/status",
              data: {
                id,
                name,
                description,
              },
              success: function () {
                Swal.fire({
                  icon: "success",
                  title: "وضعیت مورد نظر با موفقیت ویرایش شد.",
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
      err: (err) => {
        console.log(err);
      },
    });
  });
});
