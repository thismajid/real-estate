$(document).ready(() => {
  $("#reply").on("click", (e) => {
    e.preventDefault();
    $("#reply").addClass("d-none");
    $("#replyTextarea").html(`<div class="form-group">
    <label>ارسال پاسخ :</label>
    <textarea class="form-control" rows="6" id="replyText"></textarea>
  </div>
  <div class="contact-btn"><button class="btn btn-success" id="sendReply">ارسال <i
  class="fa fa-arrow-circle-left"
  aria-hidden="true"
></i></button></div>`);
    $("#sendReply").on("click", (e) => {
      e.preventDefault();
      const messageID = $("#messageID").val();
      const userID = $("#userID").val();
      const reply = $("#replyText").val();

      if (reply) {
        $.ajax({
          type: "post",
          url: "/admin/messages/reply",
          data: {
            messageID,
            userID,
            reply,
          },
          success: function (response) {
            Swal.fire({
              icon: "success",
              title: "پاسخ شما با موفقیت ارسال شد.",
            });
            setTimeout(() => {
              window.location.href = "/admin/messages";
            }, 3000);
          },
          error: (err) => {
            console.log(err);
          },
        });
      }
    });
  });
});
