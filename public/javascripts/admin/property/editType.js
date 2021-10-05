$(document).ready(() => {
  $(".editType").click(async (e) => {
    const id = e.target.id.split("-")[1];
    await $.ajax({
      type: "post",
      url: "/admin/properties/category/getOne",
      data: {
        id,
      },
      success: function (response) {
        $("#editTypeByModal").html(`<form>
        <div class="form-group">
          <label for="name" class="col-form-label"
            >عنوان نوع:</label
          >
          <input type="text" class="form-control" id="editTypeName" name="name" value="${response.category.name}" />
        </div>
        <div class="form-group">
          <label for="description" class="col-form-label"
            >توضیحات نوع:</label
          >
          <textarea class="form-control" id="editTypeDescription" name="description" value="">${response.category.description}</textarea>
        </div>
      </form>`);
        $("#submitBTN").click(async () => {
          const name = $("#editTypeName").val();
          const description = $("#editTypeDescription").val();
          if (name) {
            console.log(323232);
            $.ajax({
              type: "put",
              url: "/admin/properties/category",
              data: {
                id,
                name,
                description,
              },
              success: function (response) {
                Swal.fire({
                  icon: "success",
                  title: "نوع مورد نظر با موفقیت ویرایش شد.",
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
