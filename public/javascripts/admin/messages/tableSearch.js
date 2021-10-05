$(document).ready(function () {
  // Activate tooltips
  $('[data-toggle="tooltip"]').tooltip();

  // Filter table rows based on searched term
  $("#search").on("keyup", function () {
    let term = $(this).val().toLowerCase();
    $("table tbody tr").each(function () {
      $row = $(this);
      let name = $row.find("td:nth-child(2)").text();
      let email = $row.find("td:nth-child(3)").text();
      let tell = $row.find("td:nth-child(4)").text();
      let subject = $row.find("td:nth-child(5)").text();
      let message = $row.find("td:nth-child(6)").text();
      if (
        name.search(term) < 0 &&
        email.search(term) < 0 &&
        tell.search(term) < 0 &&
        subject.search(term) < 0 &&
        message.search(term) < 0
      ) {
        $row.hide();
      } else {
        $row.show();
      }
    });
  });
});
