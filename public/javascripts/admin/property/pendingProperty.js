$(document).ready(() => {
  $(".pendingProperty").on("click", (e) => {
    const id = e.target.id.split("-")[1];

    if (id) {
      $.ajax({
        type: "put",
        url: "/admin/properties/pending",
        data: {
          id,
        },
        success: function (response) {
          Swal.fire({
            icon: "success",
            title: "ملک مورد نظر با موفقیت فعال شد.",
            showConfirmButton: false,
            timer: 3000,
          });
          setTimeout(() => {
            window.location.href = "/admin/properties";
          }, 3000);
        },
      });
    }
  });
});
