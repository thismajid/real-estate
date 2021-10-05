$(document).ready(() => {
  $("#sendMessage").on("click", (e) => {
    e.preventDefault();
    const name = $("#form_name").val();
    const email = $("#form_email").val();
    const tell = $("#form_tell").val();
    const subject = $("#form_subject").val();
    const message = $("#form_message").val();

    if (name && email && tell && subject && message) {
      $.ajax({
        type: "post",
        url: "/message",
        data: {
          name,
          email,
          tell,
          subject,
          message,
        },
        success: function (response) {
          Swal.fire({
            icon: "success",
            title: "پیام شما با موفقیت ارسال شد.",
          });
          setTimeout(() => {
            window.location.href = "/";
          }, 3000);
        },
      });
    }
  });
});
