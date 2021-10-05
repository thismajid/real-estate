$(document).ready(() => {
  $("#socialNetworksBTN").on("click", () => {
    const instagram = `http://instagram.com/${$("#instagram").val()}`;
    const telegram = `http://t.me/${$("#telegram").val()}`;
    const facebook = `http://fb.com/${$("#facebook").val()}`;
    const twitter = `http://twitter.com/${$("#twitter").val()}`;

    $.ajax({
      type: "post",
      url: "/admin/settings/socials",
      data: {
        instagram,
        telegram,
        facebook,
        twitter,
      },
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
  });
});
